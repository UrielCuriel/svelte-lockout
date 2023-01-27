/**
 * function to mean a array of numbers
 * @param {number[]} arr
 * @returns number
 */
export const mean = (arr: number[]): number => {
	return Math.floor(arr.reduce((a, b) => a + b, 0) / arr.length);
};

/**
 * function to throttle a function
 * @param {number} ms
 */
export const delay = (ms: number, fn: any) => {
	let lastTime = 0;
	let lastResult: any;
	return (...args: any[]) => {
		const now = Date.now();
		if (now - lastTime < ms) {
			return lastResult;
		}
		lastTime = now;
		lastResult = fn(...args);
		return lastResult;
	};
};

/**
 * function to get last item in an array
 * @param {any[]} arr
 * @returns any
 */
export const last = (arr: any[]): any => {
	return arr[arr.length - 1];
};

/**
 * function to calc difference on items of an array from last to first
 * @param {any[]} arr
 */
export const diff = (arr: any[]): any => {
	const newArr = [...arr];
	return newArr.reverse().reduce((a, b) => a - b);
};

/**
 * function to check if is running on browser
 */
export const browser = () => {
	try {
		return !import.meta.env.SSR ?? typeof window !== 'undefined';
	} catch (e) {
		return typeof window !== 'undefined';
	}
};
