import App from 'next/app';
import React from 'react';
import Helmet from 'react-helmet';
import wrapper from '../store/configureStore';
import { log } from '../utils/log';

class MyApp extends App<Props, any> {
	componentDidMount() {
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

	render() {
		const { Component, pageProps = {} } = this.props;
		return (
			<>
				<Helmet
					title="yuni-q"
					htmlAttributes={{ lang: 'ko' }}
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
	let pageProps: any = {};
	if (context.Component.getInitialProps) {
		const { ctx } = context;
		const obj: any = {
			ctx,
			res,
		};
		pageProps = await context.Component.getInitialProps(obj);
	}
	return { pageProps, isServer };
};

interface Props {
	Component: any;
	pageProps: any;
}

export default wrapper.withRedux(MyApp);
