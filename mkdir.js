
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var justTry = require('try-promise').try;
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');
	var _throwif = require('./utils/throw-if.js');
	var _donothing = require('./utils/do-nothing.js');

	var mkdir = fs.mkdir;
	var stat = fs.stat;
	var unlink = fs.unlink;
	var resolvePath = path.resolve;
	var getParent = path.dirname;

	var _mkdir = (dirname, onfinish, onaction) => {
		var callOnFinish = (...action) =>
			onfinish(null, new Info('mkdir', dirname, action));
		stat(dirname, (error, info) => {
			if (error) {
				let parent = getParent(dirname);
				return parent !== dirname ? _mkdir(parent, (error, info) => {
					if (error) {
						return onfinish(error, null);
					}
					mkdir(dirname, (error) => {
						if (error) {
							return onfinish(error, null);
						}
						var action = new Action('create', dirname, 'dir');
						justTry(onaction, [action]);
						callOnFinish(action, ...info.action);
					});
				}, onaction) : onfinish({
					message: `Root directory "${parent}" doesn't exist`,
					__proto__: error
				}, null);
			}
			if (info.isFile()) {
				return unlink(dirname, (error) => {
					if (error) {
						return onfinish(error, null);
					}
					var action = new Action('delete', dirname, 'file');
					justTry(onaction, [action]);
					_mkdir(dirname, (error, info) => {
						if (error) {
							return onfinish(error, null);
						}
						callOnFinish(action, ...info.action);
					}, onaction);
				});
			}
			callOnFinish();
		});
	};

	module.exports = (dirname, onfinish, onaction) =>
		_mkdir(resolvePath(dirname), _getfunc(onfinish, _throwif), _getfunc(onaction, _donothing));

})(module);
