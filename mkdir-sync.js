
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var justTry = require('just-try');
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');

	var mkdirSync = fs.mkdirSync;
	var statSync = fs.statSync;
	var unlinkSync = fs.unlinkSync;
	var resolvePath = path.resolve;
	var getParent = path.dirname;

	const DONOTHING = () => {};

	var _mkdirSync = (dirname, onaction) => {
		try {
			let info = statSync(dirname);
			if (info.isFile()) {
				unlinkSync(dirname);
				let action = new Action('delete', dirname, 'file');
			}
		} catch (_) {
			let parent = getParent(dirname);
			if (parent === dirname) {
				return new Info('', dirname, []);
			}
			_mkdirSync(dirname, onaction);
			mkdirSync(dirname);
			let action = new Action('create', dirname, 'dir');
			justTry(() => onaction(action), (error) => console.error(error));
			return [action];
		}
	};

	module.exports = (dirname, onaction) =>
		_mkdirSync(resolvePath(dirname), _getfunc(onaction, DONOTHING));

})(module);
