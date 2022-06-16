function getStyle (node, prop) {
	return getComputedStyle(node, null).getPropertyValue(prop);
}

export default function setNonStaticPosition (elem) {
	let position = getStyle(elem, 'position');

	if (position === 'static') {
		elem.style.position = 'relative';
	}
}