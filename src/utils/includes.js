export function arrayIncludes (array, subArray) {
	return subArray.every(function (subArrayValue, index) {
		let arrayValue = array[index];

		// eslint-disable-next-line no-use-before-define
		return includes(arrayValue, subArrayValue);
	});
}

export function objectIncludes (object, subObject) {
	return Object.keys(subObject).every(function (key) {
		let objectValue = object[key];
		let subObjectValue = subObject[key];

		// eslint-disable-next-line no-use-before-define
		return includes(objectValue, subObjectValue);
	});
}

export function includes (subject, includedSubject) {
	if (Object.is(subject, includedSubject)) return true;

	let subjectType = Object.prototype.toString.call(subject);
	let includedSubjectType = Object.prototype.toString.call(includedSubject);

	if (subjectType !== includedSubjectType) return false;

	switch (subjectType) {
		case '[object Object]': return objectIncludes(subject, includedSubject);
		case '[object Array]': return arrayIncludes(subject, includedSubject);
		default: return false;
	}
}