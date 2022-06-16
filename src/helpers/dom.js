function getStyle (node, prop) {
	return getComputedStyle(node, null).getPropertyValue(prop);
}

export function setNonStaticPosition (elem) {
	const position = getStyle(elem, 'position');

	if (position === 'static') {
		elem.style.position = 'relative';
	}
}

function getParentElems (node, parents = []) {
	const parent = node.parentNode;
	const noMoreParents = !node.parentNode || node.parentNode === document;

	if (noMoreParents) {
		return parents;
	}
	return getParentElems(parent, parents.concat([parent]));
}

function getOverflowStyle (node) {
	return [
		getStyle(node, 'overflow'),
		getStyle(node, 'overflow-y'),
		getStyle(node, 'overflow-x')
	].join('-');
}

function isScrollable (node) {
	const SCROLLABLE_VALUE_EXPR = /(\bauto\b|\bscroll\b)/;

	return SCROLLABLE_VALUE_EXPR.test(getOverflowStyle(node));
}

export function findScrollParent (node) {
	const parents = getParentElems(node);
	const scrollableParent = parents.find(isScrollable);

	return scrollableParent || document.documentElement;
}

export function getClientRectInParent (elem, parent) {
	const elemRect = elem.getBoundingClientRect();
	const parentRect = parent.getBoundingClientRect();

	return {
		bottom: elemRect.bottom - parentRect.top + parent.scrollTop,
		left: elemRect.left - parentRect.left + parent.scrollLeft,
		right: elemRect.right - parentRect.left + parent.scrollLeft,
		top: elemRect.top - parentRect.top + parent.scrollTop,
		height: elemRect.height,
		width: elemRect.width
	};
}

export function getVisibleClientRectInParent (elem, parent) {
	const scrollParent = findScrollParent(elem);
	const elemBox = getClientRectInParent(elem, parent);
	const scrollParentBox = scrollParent.getBoundingClientRect();
	const elemBoxInscrollParent = getClientRectInParent(elem, scrollParent);

	const shiftLeft = Math.abs(
		Math.min(0, elemBoxInscrollParent.left - scrollParent.scrollLeft)
	);
	const reduceWidth = Math.max(
		0,
		elemBoxInscrollParent.right
      - scrollParent.scrollLeft
      - scrollParentBox.width
	);

	return {
		...elemBox,
		left: elemBox.left + shiftLeft,
		width: elemBox.width - reduceWidth - shiftLeft,
		right: elemBox.right - reduceWidth
	};
}