module.exports = {
	apps: [
		{
			name: 'yuni-q',
			script: './server.js',
			exec_mode: 'cluster',
			instances: '0',
			instance_var: 'INSTANCE_ID',
			env: {
				NODE_ENV: 'development',
				NODE_CONFIG_DIR: './config/',
			},
			env_staging: {
				NODE_ENV: 'staging',
				NODE_CONFIG_DIR: './config/',
			},
			env_production: {
				NODE_ENV: 'production',
				NODE_CONFIG_DIR: './config/',
			},
		},
	],
};
