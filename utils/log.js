const colors = [
	{ name: 'cyan', value: '\x1b[36m' },
	{ name: 'yellow', value: '\x1b[33m' },
	{ name: 'red', value: '\x1b[31m' },
	{ name: 'green', value: '\x1b[32m' },
	{ name: 'magenta', value: '\x1b[35m' },
];
const resetColor = '\x1b[0m';

const prefix = () => {
	const randIdx = Math.floor(Math.random() * colors.length) % colors.length;
	const color = colors[randIdx];
	return `${color.value}[${process.env.NODE_ENV}]${resetColor}`;
};

/* eslint-disable */
exports.log =  (...arg) => {
  
  console.log(prefix(), ...arg);
};

exports.consoleError = (alt, error) => {
	if (typeof e === 'string') return e;

	let msg = [];
	if (e) {
		if (e.text) msg.push(e.text.toString());
		if (e.message) msg.push(e.message.toString());
		if (e.resultMsg) msg.push(e.resultMsg.toString());
		if (e.errorMessage) msg.push(e.errorMessage.toString());
		if (e.errMsg) msg.push(e.errMsg.toString());
	}

	if (msg.length > 0) return msg.join('\n');

	// return alt || '';
	console.error(prefix(), alt, msg);
};

/* eslint-enable */

// export default log;
