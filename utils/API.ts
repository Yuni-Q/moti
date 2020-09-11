/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
import axios, { AxiosError, AxiosResponse } from 'axios';
import moment from 'moment';
import QueryString from 'querystring';
import { LocalCacheWithTTL } from './LocalCache';
import QueueRunner from './QueueRunner';

export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface APIOption<EXTRA = {}> {
	timeout?: number;
	headers?: { [key: string]: string } | { 'Content-Type': string };
	raw?: boolean;
	extra?: EXTRA;
}

export interface APIOptionWithCache<EXTRA = {}> extends APIOption<EXTRA> {
	cacheId?: string;
	// 캐시 시간
	cacheTTL?: number;
	cacheType?: 'DB' | 'MEMORY';
	cacheInvalidate?: boolean;
}

class MemoryCache {
	private _cache: { [key: string]: { ttl: number; data: any } } = {};

	public get(cacheKey: string) {
		if (!cacheKey) return null;
		if ((this._cache[cacheKey]?.ttl || 0) > Date.now()) return this._cache[cacheKey].data;
		delete this._cache[cacheKey];
	}

	public set(cacheKey: string, data: any, ttl?: number) {
		this._cache[cacheKey] = { data, ttl: Date.now() + (ttl || 60 * 1000) };
	}
}

export interface APIGatewayResponse<T> {
	data?: T;
	result?: T;
	code: string;
	statusCode: string;
	statusMessage: string;
	message: string;
	error: string;
	errorMessage: string;
	timestamp: number;
}

export default class API<EXTRA = {}> {
	public static SERVER_TIME_GAP = 0;

	public static HOSTNAME = 'https://moti.company/api';

	public static HEADERS: { [key: string]: any } = {};

	private headers: { [key: string]: any } = {};

	private axiosInstance = axios.create();

	constructor(
		public prefix: string = '',
		private options?: {
			header?: { [key: string]: any };
			onRequest?: (method: APIMethod, url: string, data: any, opt: APIOptionWithCache<EXTRA>) => Promise<boolean>;
			onResponse?: <T>(result: AxiosResponse<APIGatewayResponse<T>>) => Promise<any>;
			onError?: <T>(result: AxiosError<APIGatewayResponse<T>> | string) => Promise<any>;
		},
	) {
		this.headers = options?.header || {};
	}

	public setHeaders(headers: { [key: string]: any }): this {
		this.headers = { ...this.headers, ...headers };
		return this;
	}

	// 메모리 캐시 저장소
	private _cache: MemoryCache = new MemoryCache();

	private async call<T>(method: APIMethod, url: string, data?: any, opt?: APIOptionWithCache<EXTRA>): Promise<T> {
		opt = opt || {};
		let cacheKey: string | undefined;
		if (method === 'GET' && opt.cacheId) {
			// API.getCache()를 통해 요청되었다면
			cacheKey = `API.Cache:${  url}`;
			// QueryString
			if (data && typeof data !== 'string') cacheKey += (url.match(/\?/) ? '&' : '?') + QueryString.stringify(data);

			return QueueRunner(opt.cacheId, async (resolved, rejected) => {
				// 메모리 캐시에서 찾아봄
				if (!opt?.cacheInvalidate) {
					const cached = this._cache.get(cacheKey!);
					if (cached) return resolved(cached);

					if (opt?.cacheType !== 'MEMORY') {
						// 브라우저 IndexedDB에서 찾아봄
						const cached = await LocalCacheWithTTL.get(cacheKey!);
						if (cached) {
							this._cache.set(cacheKey!, cached, opt?.cacheTTL);
							return resolved(cached);
						}
					}
				}

				return this.request<T>(method, url, data, opt!, cacheKey).then(resolved).catch(rejected);
			});
		}

		return this.request<T>(method, url, data, opt, cacheKey);
	}

	private async request<T>(
		method: APIMethod,
		url: string,
		data: any,
		opt: APIOptionWithCache<EXTRA>,
		cacheKey?: string,
	): Promise<T> {
		opt.headers = { ...API.HEADERS, ...this.headers, ...opt.headers || {}};

		const tsType = url.includes('?') ? '&' : '?';

		if ((await this.options?.onRequest?.(method, url, data, opt)) === false) return Promise.reject();

		return this.axiosInstance({
			url: `${API.HOSTNAME + this.prefix + url  }${tsType}__ts=${new Date().getTime()}`,
			method,
			headers: opt.headers,
			data: method !== 'GET' ? data : undefined,
			params: method === 'GET' ? data : undefined,
			timeout: opt.timeout,
			responseType: 'json',
		})
			.then(async (result: AxiosResponse<APIGatewayResponse<T>>) => {
				await this.options?.onResponse?.(result);
				if (result) {
					const timestamp = result?.data?.timestamp;
					// SERVER_TIME_GAP 설정
					if (timestamp)
						API.SERVER_TIME_GAP =
							(moment(parseInt(timestamp.toString(), 10)).toDate().getTime() - new Date().getTime()) / 1000 ||
							API.SERVER_TIME_GAP ||
							0;

					if (result.status === 200 || result.status === 201) {
						const data: T =
							(typeof result?.data?.data !== 'undefined' ? result.data.data : undefined) ||
							result?.data?.data ||
							result?.data?.result ||
							(result.data as any); // 응답이 바로 내려오는 케이스 추가  (profile.. 등등)

						// 캐시키가 있다면
						if (cacheKey) {
							this._cache.set(cacheKey, data, opt?.cacheTTL);
							// 캐시 시간 설정
							if (opt.cacheType !== 'MEMORY') LocalCacheWithTTL.set(cacheKey, data, opt.cacheTTL);
						}
						return Promise.resolve(data);
					} if (result.status === 401 || result.status === 403) {
						API.redirectToLoginPage();
						return Promise.reject(result);
					}
				}
				// 성공에 걸리지 못하면 실패
				return Promise.reject(
					result && result.data
						? result.data.statusMessage || result.data.message || result.data.error || result.data.errorMessage
						: null,
				);
			})
			.catch(async (result: AxiosError<APIGatewayResponse<T>> | string) => {
				await this.options?.onError?.(result);

				if (typeof result === 'string') {
					return Promise.reject(result);
				}

				if (result.response?.status === 401 || result.response?.status === 403) {
					API.redirectToLoginPage();
				}
				const data = result && result.response ? result.response.data : null;
				return Promise.reject(data ? data.statusMessage || data.message || data.error || data.errorMessage : null);
			});
	}

	public async get<T = any>(url: string, data?: any, opt?: APIOption<EXTRA>): Promise<T> {
		return this.call('GET', url, data, opt);
	}

	public async getCache<T = any>(
		cacheId: string,
		url: string,
		data?: any,
		opt?: APIOptionWithCache<EXTRA>,
	): Promise<T> {
		opt = opt || {};
		opt.cacheId = `API:${  cacheId}`;
		return this.call('GET', url, data, opt);
	}

	public async post<T = any>(url: string, data?: any, opt?: APIOption<EXTRA>): Promise<T> {
		return this.call('POST', url, data, opt);
	}

	public async put<T = any>(url: string, data?: any, opt?: APIOption<EXTRA>): Promise<T> {
		return this.call('PUT', url, data, opt);
	}

	public async delete<T = any>(url: string, data?: any, opt?: APIOption<EXTRA>): Promise<T> {
		return this.call('DELETE', url, data, opt);
	}

	public static notSupported(): any {
		throw new Error('지원하지 않는 기능입니다');
	}

	public static redirectToLoginPage() {
		window.location.href = `/web/login?returnUrl=${encodeURIComponent(
			window.location.href,
		)}&__ts=${new Date().getTime()}`;
	}
}
