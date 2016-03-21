
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var justTry = require('try-promise').try;
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');

	var mkdir = fs.mkdir;
	var stat = fs.stat;
	var unlink = fs.unlink;
	var resolvePath = path.resolve;
	var getParent = path.dirname;

	const THROWIF = (error) => {
		if (error) throw error;
	};

	const DONOTHING = () => {};

	var _mkdir = (dirname, onfinish, onaction) => {
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
						onfinish(null, new Info('mkdir', dirname, [action, ...info.action]));
					});
				}, onaction) : onfinish(null, new Info('', dirname, []));
			}
			if (info.isFile()) {
				return unlink(dirname, (error) => {
					if (error) {
						return onfinish(error, null);
					}
					var action = [new Action('delete', dirname, 'file')];
					justTry(onaction, action);
					onfinish(null, new Info('mkdir', dirname, action));
				});
			}
			onfinish(null, new Info('mkdir', dirname, []));
		});
	};

	module.exports = (dirname, onfinish, onaction) =>
		_mkdir(resolvePath(dirname), _getfunc(onfinish, THROWIF), _getfunc(onaction, DONOTHING));

})(module);
