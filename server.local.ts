import nextServer from "./server";
import { log } from "./utils/log";

const port = process.env.PORT || 8080;

const localServer = async () => {
	const server = await nextServer()
	server.listen(port, () => {
		log(`> Ready on http://localhost:${port}`);
	});
}

localServer();
