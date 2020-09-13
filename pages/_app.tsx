import { IncomingMessage, ServerResponse } from 'http';
import { NextPageContext, NextComponentType } from 'next';
import App from 'next/app';
import Router from 'next/router';
import React from 'react';
import Helmet from 'react-helmet';
import GlobalStyle from '../components/GlobalStyle';
import { log } from '../utils/log';

Router.events.on('routeChangeStart', () => {
	log('routeChangeStart');
});
Router.events.on('routeChangeComplete', () => {
	log('routeChangeComplete');
});

class MyApp extends App<Props> {
	componentDidMount(): void {
		if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/service-worker.js')
				.then((result) => {
					log('service worker registration successful', result);
				})
				.catch((err) => {
					log('service worker registration failed', err.message);
				});
		}
	}

	render(): JSX.Element {
		const { Component, pageProps = {} } = this.props;
		return (
			<>
				<Helmet
					title="yuni-q"
					htmlAttributes={{ lang: 'ko-KO' }}
					meta={[
						{
							name: 'viewport',
							content:
								'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
						},
						// {
						//   'http-equiv': 'X-UA-Compatible',
						//   content: 'IE=edge',
						// },
						{
							name: 'description',
							content: 'yuni-q',
						},
						{
							property: 'og:type',
							content: 'website',
						},
					]}
					link={[
						{
							rel: 'shortcut icon',
							href: '',
						},
					]}
				/>
				<GlobalStyle />
				<Component {...pageProps} />
			</>
		);
	}
}

MyApp.getInitialProps = async (context) => {
	const { res } = context.ctx;
	const isServer = !!context.ctx.req;
	if (isServer) {
		log(isServer);
	} else {
		log(isServer);
	}
	let pageProps = {} as PageContext;
	if (context.Component.getInitialProps) {
		const { ctx } = context;
		const obj: { ctx: NextPageContext; res: ServerResponse | undefined } = {
			ctx,
			res,
		};
		pageProps = await context.Component.getInitialProps(obj as unknown as NextPageContext) as PageContext;
	}
	return { pageProps, isServer };
};

interface Props {
	Component: NextComponentType<NextPageContext>;
	pageProps: PageContext;
}



export interface PageContext {
	req: IncomingMessage;
	res: ServerResponse;
	params: {
		id?: string
	};
}

export default MyApp;
