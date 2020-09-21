import { ServerResponse } from 'http';
import { NextComponentType, NextPageContext } from 'next';
import App from 'next/app';
import Router from 'next/router';
import React from 'react';
import GlobalStyle from '../components/GlobalStyle';
import { log } from '../utils/log';

Router.events.on('routeChangeStart', () => {
	log('routeChangeStart');
});

Router.events.on('routeChangeComplete', () => {
	log('routeChangeComplete');
});

interface Props {
	Component: NextComponentType<NextPageContext>;
	pageProps: PageContext;
}

class MyApp extends App<Props> {
	render(): JSX.Element {
		const { Component, pageProps = {} } = this.props;

		return (
			<>
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
		log('isServer', isServer);
	} else {
		log('isNotServer', isServer);
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

export interface PageContext extends NextPageContext {
	params: {
		id?: string
	};
}

export default MyApp;
