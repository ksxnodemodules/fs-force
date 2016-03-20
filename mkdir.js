
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	// var rm = require('./delete.js');
	var tryCatch = require('try-promise').try;
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
		if (!dirname) {
			return;
		}
		stat(dirname, (error, info) => {
			if (error) {
				return _mkdir(getParent(dirname), (error, info) => {
					if (error) {
						return onfinish(error, null);
					}
					mkdir(dirname, (error) => {
						if (error) {
							return onfinish(error, null);
						}
						onfinish(new Info('mkdir', dirname, [new Action('create', dirname, 'dir'), ...info.action]));
					});
				}, onaction);
			}
			if (info.isFile()) {
				unlink(dirname, (error) => {
					if (error) {
						return onfinish(error, null);
					}
					var action = new Action('delete', dirname, 'file');
					try {
						onaction(action);
					} catch (error) {
						console.error(error);
					}
					onfinish(/* <-- Continue from here... --> */);
				});
			}
		});
	};

	module.exports = (dirname, onfinish, onaction) =>
		_mkdir(resolvePath(dirname), _getfunc(onfinish, THROWIF), _getfunc(onaction, DONOTHING));

})(module);
