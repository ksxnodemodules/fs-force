
((module) => {
	'use strict';

	var tryCatch = (fn, args) =>
		new Promise(handlePromise(fn, args));

	var handlePromise = (fn, args) => (resolve, reject) => {
		try {
			resolve(fn(...args));
		} catch (error) {
			reject(error);
		}
	};

	module.exports = tryCatch;

})(module);
