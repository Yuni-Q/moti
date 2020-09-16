/* eslint-disable */
const cookieParser = require('cookie-parser');
const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const { parse } = require('url');
const { resolve } = require('path');
const { log } = require('./utils/log');
const router = require('./routes');

// setInterval(function() {
//   http.get('http://study-watson.herokuapp.com');
// }, 300000);

const port = process.env.PORT || 8080;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = router.getRequestHandler(app);

dotenv.config();

app.prepare().then(() => {
	const server = express();
	// next에서 자동으로 실행
	// server.use('static ', express.static('./static'));
	server.use(handle);
	server.use(morgan('dev'));
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	server.use(cookieParser());
	server.get('/service-worker.js', function (req, res) {
		app.serveStatic(req, res, resolve('./static/service-worker.js'));
	});
	server.get('*', (req, res) => {
		const parsedUrl = parse(req.url, true);
		return handle(req, res, parsedUrl);
	})
	server.listen(port, (err) => {
		if (err) throw err;
		log(`> Ready on http://localhost:${port}`);
	});
});
