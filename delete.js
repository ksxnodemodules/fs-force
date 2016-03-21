
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var justTry = require('try-promise').try;
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');
	var flatArray = require('./utils/flat-array.js');

	var rmdir = fs.rmdir;
	var unlink = fs.unlink;
	var stat = fs.stat;
	var readdir = fs.readdir;
	var resolvePath = path.resolve;
	var getParent = path.dirname;
	var joinPath = path.join;

	const THROWIF = (error) => {
		if (error) throw error;
	};

	const DONOTHING = () => {};

	var _rm = (entry, onfinish, onaction) => {
		var callOnFinish = (...action) =>
			onfinish(null, new Info('delete', entry, action));
		stat(entry, (error, info) => {
			if (error) {
				return callOnFinish();
			}
			if (info.isFile()) {
				return unlink(entry, (error) => {
					if (error) {
						return onfinish(error, null);
					}
					var action = new Action('delete', entry, 'file');
					justTry(onaction, [action]);
					callOnFinish(action);
				});
			}
			if (info.isDirectory()) {
				return readdir(entry, (error, list) => {
					if (error) {
						return onfinish(error, null);
					}
					var childpromises = new Set();
					for (let item of list) {
						let callback = (resolve, reject) =>
							_rm(joinPath(entry, item), (error, info) => error ? reject(error) : resolve(info), onaction);
						childpromises.add(new Promise(callback));
					}
					Promise.all(childpromises).then((info) => {
						rmdir(entry, (error) => {
							if (error) {
								onfinish(error, null);
							}
							var action = new Action('delete', entry, 'dir');
							justTry(onaction, [action]);
							callOnFinish(...flatArray(info.map((info) => info.action)), action);
						});
					}).catch((error) => onfinish(error, null));
				});
			}
			onfinish(new Error(`Can't delete entry "${entry}"`), null);
		});
	};

	module.exports = (entry, onfinish, onaction) =>
		_rm(resolvePath(entry), _getfunc(onfinish, THROWIF), _getfunc(onaction, DONOTHING));

})(module);
