const nextServer = require("./server");
// const { log } = require("./utils/log");

const port = process.env.PORT || 8080;

const localServer = async () => {
	const server = await nextServer()
	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
}

localServer();
