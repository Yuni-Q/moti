import { useState, useCallback } from 'react';

const useInput = (initValue = null): (((e: any) => void) | null)[] => {
	const [value, setter] = useState(initValue);
	const handler = useCallback((e) => {
		setter(e.target.value);
	}, []);
	return [value, handler];
};

export default useInput;
