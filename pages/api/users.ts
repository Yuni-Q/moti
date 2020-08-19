export default (req: any, res: any) => {
	if (req.method === 'POST') {
		// Process a POST request
	}
	// Handle any other HTTP method
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ name: 'Yuni-Q' }));
};
