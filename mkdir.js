
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var rm = require('./delete.js');
	var _getfunc = require('./utils/get-val.js').function;

	var mkdir = fs.mkdir;
	var stat = fs.stat;
	var resolvePath = path.resolve;
	var getParent = path.dirname;

	const THROWIF = (error) => {
		if (error) throw error;
	};

	const DONOTHING = () => {};

	var _mkdir = (dirname, onfinish, onaction) => {
		if (!dirname) {
			return;
		}
		stat(dirname, (error, info) => {
			if (error) {
				_mkdir(getParent(dirname), (...args) => {}, onaction);
			}
		});
	};

	module.exports = (dirname, onfinish, onaction) =>
		_mkdir(resolvePath(dirname), _getfunc(onfinish, THROWIF), _getfunc(onaction, DONOTHING));

})(module);
