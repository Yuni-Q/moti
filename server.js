const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
// const proxy = require("express-http-proxy");
const morgan = require('morgan');
const next = require('next');
const { resolve } = require('path');
const { parse } = require('url');

// setInterval(function() {
// 	Axios.get('https://yuni-q.herokuapp.com/')
// }, 300000);

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();

const nextServer = async () => {
	await app.prepare();	
	const server = express();
	// next에서 자동으로 실행
	server.use(express.static('./static'));
	// server.use(handle);
	server.use(morgan('dev'));
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	server.use(cookieParser());
	server.get('/service-worker.js', (req, res) => {
		app.serveStatic(req, res, resolve('./static/service-worker.js'));
	});
	// server.use("/api", proxy('https://moti.company'))
	server.get('*', (req, res) => {
		const parsedUrl = parse(req.url, true);
		return handle(req, res, parsedUrl);
	})

	return server;
}

module.exports = nextServer