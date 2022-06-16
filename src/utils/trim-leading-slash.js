export default function trimLeadingSlash (urlString) {
	const LEADING_SLAHS_REGEXP = /^\/+/;

	return urlString.replace(LEADING_SLAHS_REGEXP, '');
}