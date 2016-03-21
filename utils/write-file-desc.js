
((module) => {
	'use strict';

	var freeze = Object.freeze;

	const EMPTY_OBJECT = freeze(Object.create(null));

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
				if (descriptor instanceof Buffer) {
					return {
						'data': descriptor,
						'options': EMPTY_OBJECT,
						'__proto__': null
					};
				}
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
