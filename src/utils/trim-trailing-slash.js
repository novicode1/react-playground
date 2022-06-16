export default function trimTrailingSlash (urlString) {
	const TRAILING_SLAHS_REGEXP = /\/+$/;

	return urlString.replace(TRAILING_SLAHS_REGEXP, '');
}