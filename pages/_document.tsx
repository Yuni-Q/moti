import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { consoleError } from '../utils/log';

export default class CustomDocument extends Document<any> {
	static async getInitialProps(context: any): Promise<any> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = context.renderPage;
		try {
			context.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
				});
			const initialProps = await Document.getInitialProps(context);
			const page = context.renderPage((App: any) => (props: any) => sheet.collectStyles(<App {...props} />));
			const styles = (
				<>
					<link href="/static/reset.css" rel="stylesheet" />
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			);
			return {
				...initialProps,
				...page,
				styles,
				helmet: Helmet.renderStatic(),
			};
		} catch (error) {
			consoleError(error);
			return null;
		} finally {
			sheet.seal();
		}
	}

	render(): JSX.Element {
		// const { publicRuntimeConfig } = getConfig();
		const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
		const htmlAttrs = htmlAttributes.toComponent();
		const bodyAttrs = bodyAttributes.toComponent();
		return (
			<Html lang="en" dir="ltr" {...htmlAttrs}>
				<Head>
					{this.props.styles}
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta name="description" content="yuni-q" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="http://localhost:8080/" />
					<meta property="og:title" content="yuni-q" />
					<meta property="og:image" content="/static/favicon.png" />
					<meta property="og:description" content="yuni-q" />
					<meta property="og:site_name" content="yuni-q" />
					<meta property="og:locale" content="ko-KO" />
					{Object.values(helmet).map((el: any) => el.toComponent())}
					<link rel="manifest" href="/static/manifest.json" />
					<link rel="shorcut icon" href="/static/favicon.png" />
					<meta name="theme-color" content="black" />
				</Head>
				<body {...bodyAttrs}>
					<Main />
					{process.env.NODE_ENV === 'production' && (
						<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
					)}
					<NextScript />
				</body>
			</Html>
		);
	}
}
