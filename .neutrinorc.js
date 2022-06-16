let eslint = require('@atomspace/eslint');
let react = require('@atomspace/react');

module.exports = {
	use: [
		eslint(),
		react()
	]
};