import { useState, useEffect } from "react";

export function useSetLocalStorage(value: any | null = null, key: string | null = null) {
	// const getValue = () => {
	// 	const storage = localStorage.getItem(key);

	// 	if (storage) {
	// 		return JSON.parse(storage);
	// 	}

	// 	return initValue;
	// };

	console.log(value);
	console.log(key);

	const [valueState, setValueState] = useState(value);

	useEffect(() => {
		if (value != null && key != null) {
			localStorage.setItem(key, JSON.stringify(valueState));
			setValueState(valueState);
		}
	}, [valueState]);

	return [valueState, setValueState];
}
