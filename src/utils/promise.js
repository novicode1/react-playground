import pSinglton from 'p-singleton';

/**
 * Ensures that async functino returns the same promise instance for same arguments while it is in pending state.
 * @param {Function} func - Async function that returns a promise.
 * @param {Function} serializer - Optional serializer function, defaults to JSON.stringify.
 * @returns {Function} - Another async function that returns a wrapped promise.
 */
export function pendingSinglton (func, serializer) {
	return pSinglton(func, serializer);
}