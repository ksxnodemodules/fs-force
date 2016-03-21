
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var justTry = require('just-try');
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');
	var _donothing = require('./utils/do-nothing.js');

	var mkdirSync = fs.mkdirSync;
	var statSync = fs.statSync;
	var unlinkSync = fs.unlinkSync;
	var resolvePath = path.resolve;
	var getParent = path.dirname;

	var _mkdirSync = (dirname, onaction) => {
		var callOnAction = (action) =>
			justTry(() => onaction(action), (error) => console.error(error));
		var createInfo = (...action) =>
			new Info('mkdir', dirname, action);
		try {
			let info = statSync(dirname);
			if (info.isFile()) {
				unlinkSync(dirname);
				let action = new Action('delete', dirname, 'file');
				callOnAction(action);
				let nextact = _mkdirSync(dirname, onaction).action;
				return createInfo(action, ...nextact);
			}
			if (info.isDirectory()) {
				return createInfo();
			}
			throw new Error(`Invalid format of "${dirname}"`);
		} catch (error) {
			let parent = getParent(dirname);
			if (parent === dirname) {
				throw {
					message: `Root directory "${parent}" doesn't exist`,
					__proto__: error
				};
			}
			var prevact = _mkdirSync(parent, onaction).action;
			mkdirSync(dirname);
			let action = new Action('create', dirname, 'dir');
			callOnAction(action);
			return createInfo(...prevact, action);
		}
	};

	module.exports = (dirname, onaction) =>
		_mkdirSync(resolvePath(dirname), _getfunc(onaction, _donothing));

})(module);
