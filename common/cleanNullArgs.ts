export const cleanNullArgs = (args: any) => {
	const notNull: { [key: string]: any } = {};
	Object.keys(args).forEach((key) => {
		if (args[key] !== null && args[key] !== '') {
			notNull[key] = args[key];
		}
	});
	return notNull;
};

export default cleanNullArgs;
