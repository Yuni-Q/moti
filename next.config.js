/* eslint-disable */
const Dotenv = require('dotenv-webpack');
/* eslint-enable */

module.exports = {
	compress: true,
	distDir: 'build',
	webpack(config, { webpack }) {
		const prod = process.env.NODE_ENV === 'production';
		const { module = {}, plugins = [] } = config;
		const newConfig = {
			...config,
			mode: prod ? 'production' : 'development',
			output: {
				...config.output,
				publicPath: '/_next/',
			},
			module: {
				...module,
				rules: [
					...(module.rules || []),
					{
						loader: 'webpack-ant-icon-loader',
						enforce: 'pre',
						include: [],
					},
					{
						test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
						loader: 'url-loader',
						options: {
							name: '[hash].[ext]',
						},
					},
					{
						test: /.*?.css$/,
						loader: ['style-loader', 'css-loader'],
					},
				],
			},
			plugins: [
				...plugins,
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				}),
				new Dotenv({ silent: true }),
			],
		}
		if (prod) {
			newConfig.devtool = 'hidden-source-map';
		}
		return newConfig;
	},
};
