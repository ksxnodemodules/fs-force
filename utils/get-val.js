
((module) => {
	'use strict';

	var _getval = (type, val, ...rest) =>
		typeof val === type ? val : _getval(type, ...rest);

	var _create = (type) =>
		(...args) => _getval(type, ...args);

	var result = Object.create(null);
	
	['function', 'number', 'object', 'string', 'symbol', 'undefined']
		.forEach((type) => result[type] = _create(type));

	module.exports = Object.freeze(result);

})(module);
