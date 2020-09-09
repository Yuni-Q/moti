// localStorage 사용
export class LocalCache {
	static get(k: string): any {
		return window.localStorage?.getItem(k);
	}

	static set(k: string, v: any): any {
		return window.localStorage?.setItem(k, v);
	}

	static del(k: string): any {
		return window.localStorage?.removeItem(k);
	}
}

export class LocalCacheWithTTL {
	private static _db?: LocalDB;

	// 싱글톤
	private static DB() {
		if (!this._db) this._db = new LocalDB('localCache', { ver: 6, tables: [{ name: 'entities', keyPath: 'key' }] });
		return this._db;
	}

	static async get(key: string): Promise<any> {
		try {
			const val = await this.DB().get('entities', key);
			// val이 있고 캐시 만료 기간 전이여야 함
			if (val && val.ttl > new Date().getTime()) {
				return val.value;
			}
		} catch (e) {}
		return undefined;
	}

	static async set(key: string, value: any, ttl: number = 60 * 1000): Promise<any> {
		try {
			// 현재 시간에 캐시 시간 더하기
			ttl += new Date().getTime();
			return await this.DB().put('entities', { key, value, ttl });
		} catch (e) {}
	}
}

export type LocalDBRow = { [key: string]: any };

export interface LocalDBTable {
	name: string;
	keyPath: string;
	index?: {
		name: string;
		field: string;
		unique?: boolean;
	}[];
	autoIncrement?: boolean;
}

export interface LocalDBOptions {
	tables: LocalDBTable[];
	ver?: number;
}

// indexedDB 사용
export class LocalDB<T = LocalDBRow> {
	config: LocalDBOptions;
	db?: IDBDatabase;
	ready = false;

	queue: (() => void)[] = [];

	constructor(name: string, config: LocalDBOptions) {
		this.config = config;
		if (window.indexedDB) {
			const request: IDBOpenDBRequest = window.indexedDB.open(name, config.ver);
			// 이벤트가 성공적으로 끝나면, 데이터베이스 열기 요청의 onsuccess 핸들러가 트리거 됩니다
			request.onupgradeneeded = (e: any) => {
				this.db = e.target.result;
				config.tables.forEach((table) => {
					try {
						const param: IDBObjectStoreParameters = { keyPath: table.keyPath, autoIncrement: table.autoIncrement };
						const tb: IDBObjectStore = this.db!.createObjectStore(table.name, param);
						if (table.index) table.index.map((idx) => tb.createIndex(idx.name, idx.field, { unique: idx.unique }));
					} catch (e) {}
				});
			};

			// 첫번째 함수 실행
			request.onsuccess = (e: any) => {
				this.db = e.target.result;
				this.ready = true;
				this.drainQueue();
			};

			// 첫번째 함수 실행
			request.onerror = (e: any) => {
				this.db = undefined;
				this.ready = true;
				this.drainQueue();
			};
		}
	}

	private drainQueue() {
		while (this.queue.length > 0) {
			this.queue.splice(0, 1).forEach((f) => {
				try {
					f();
				} catch (e) {}
			});
		}
	}

	private conn(): Promise<IDBDatabase> {
		return new Promise((resolved, rejected) => {
			// this.db 유무 파악
			const f = () => {
				if (this.db) resolved(this.db);
				else rejected();
			};
			// 준비 중이라면 실행 아니라면 queue에 추가
			if (this.ready) f();
			else this.queue.push(f);
		});
	}

	async put(table: string, row: T): Promise<T> {
		// indexedDB 없으면 reject
		if (!window.indexedDB) return Promise.reject();
		return new Promise<T>((resolved, rejected) => {
			this.conn().then((db) => {
				const tx = db.transaction(table, 'readwrite').objectStore(table).put(row);
				tx.onsuccess = (e: any) => {
					resolved(e.target.result);
				};
				tx.onerror = rejected;
			});
		});
	}

	async get(table: string, key: any): Promise<T> {
		// indexedDB 없으면 reject
		if (!window.indexedDB) return Promise.reject();
		return new Promise<T>((resolved, rejected) => {
			this.conn().then((db) => {
				const tx = db.transaction(table, 'readonly').objectStore(table).get(key);
				tx.onsuccess = (e: any) => {
					resolved(e.target.result);
				};
				tx.onerror = rejected;
			});
		});
	}

	async del(table: string, key: any): Promise<any> {
		// indexedDB 없으면 reject
		if (!window.indexedDB) return Promise.reject();
		return new Promise((resolved, rejected) => {
			this.conn().then((db) => {
				const tx = db.transaction(table, 'readwrite').objectStore(table).delete(key);
				tx.onsuccess = () => resolved();
				tx.onerror = rejected;
			});
		});
	}

	// getAll
	async list(table: string, opt?: { page: number; size: number }): Promise<T[]> {
		// indexedDB 없으면 reject
		if (!window.indexedDB) return Promise.reject();
		return new Promise<T[]>((resolved, rejected) => {
			this.conn().then((db) => {
				const tx = db.transaction(table, 'readwrite').objectStore(table).getAll();
				tx.onsuccess = (e) => {
					const target: IDBRequest<T[]> = e.target as any;
					resolved(target.result);
				};
				tx.onerror = rejected;
			});
		});
	}
}
