import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import proxy from "express-http-proxy";
import morgan from 'morgan';
import next from 'next';
import { resolve } from 'path';
import { parse } from 'url';
import { log } from './utils/log';

// setInterval(function() {
// 	Axios.get('https://yuni-q.herokuapp.com/')
// }, 300000);

const port = process.env.PORT || 8080;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
	const server = express();
	// next에서 자동으로 실행
	server.use(express.static('./static'));
	// server.use(handle);
	server.use(morgan('dev'));
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	server.use(cookieParser());
	server.get('/service-worker.js', (req: any, res: any) => {
		app.serveStatic(req, res, resolve('./static/service-worker.js'));
	});
	server.use("/api", proxy('https://moti.company'))
	server.get('*', (req: any, res: any) => {
		const parsedUrl = parse(req.url as string, true);
		return handle(req, res, parsedUrl);
	})
	server.listen(port, () => {
		log(`> Ready on http://localhost:${port}`);
	});
});
