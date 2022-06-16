export default function urlEncodeValues (data = {}) {
	return Object.entries(data)
		.filter(function isDefined ([, value]) {
			return value !== undefined;
		})
		.map(function ([key, value]) {
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		})
		.join('&');
}