
((module) => {
	'use strict';

	const DEFAULT_OPTIONS = freeze({
		'encoding': 'utf8',
		'__proto__': null
	});

	const DEFAULT_DESCRIPTOR = freeze({
		'data': '',
		'options': DEFAULT_OPTIONS,
		'__proto__': null
	});

	var _getdesc = (descriptor) => {
		if (!descriptor) {
			return DEFAULT_DESCRIPTOR;
		}
		switch (typeof descriptor) {
			case 'object':
				return {
					'data': descriptor.data || '',
					'options': descriptor.options || DEFAULT_OPTIONS,
					'__proto__': null
				};
			case 'string':
			case 'number':
				return {
					'data': descriptor,
					'options': DEFAULT_OPTIONS,
					'__proto__': null
				};
		}
		throw new TypeError(`Not supported descriptor format`);
	};

	module.exports = _getdesc;

})(module);
