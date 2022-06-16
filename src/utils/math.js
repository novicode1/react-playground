function toNumber (value) {
	return Number(value) || 0;
}

export function add (numberA = 0, numberB = 0) {
	return numberA + numberB;
}
export function substract (numberA = 0, numberB = 0) {
	return numberA - numberB;
}
export function max (numbers) {
	return Math.max.apply(null, numbers.map(toNumber));
}
export function min (numbers) {
	return Math.min.apply(null, numbers.map(toNumber));
}
export function sum (numbers) {
	return numbers.map(toNumber).reduce(add, 0);
}
export function average (numbers) {
	return sum(numbers) / numbers.length;
}

export function half (number = 0) {
	const DEVIDER = 2;

	return number / DEVIDER;
}


export function toOptimalCeilingNumber (number) {
	const DEVISION = 10;
	let integerNumber = parseInt(number, 10);
	let digits = String(integerNumber).length;
	let unit = Math.pow(DEVISION, digits - 1);

	return unit - (integerNumber % unit) + integerNumber;
}

export default {
	max, min, add, substract, sum, average, toOptimalCeilingNumber, half
};