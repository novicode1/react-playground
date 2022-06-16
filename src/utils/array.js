export function concat (arrayA = [], arrayB = []) {
	return arrayA.concat(arrayB);
}

export function arrify (value) {
	if (Array.isArray(value)) return value;
	return [value];
}

export default {
	concat,
	arrify
};