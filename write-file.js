
((module) => {
	'use strict';

	var {stat, writeFile} = require('fs');
	var path = require('path');
	var justTry = require('try-promise').try;
	var {addPromise} = require('./utils/promise.js');
	var _mkdir = require('./mkdir.js');
	var _rm = require('./delete.js');
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');
	var _throwif = require('./utils/throw-if.js');
	var _donothing = require('./utils/do-nothing.js');
	var flatArray = require('./utils/flat-array.js');
	var _getdesc = require('./utils/write-file-desc.js');

	var resolvePath = path.resolve;
	var getParent = path.dirname;

	var __writeFile = (filename, descriptor, onfinish, onaction) => {
		var callOnFinish = (...action) =>
			onfinish(null, new Info('mkfile', filename, action));
		var data = descriptor.data;
		var options = descriptor.options;
		_mkdir(getParent(filename), (error, mkdirinfo) => {
			if (error) {
				return onfinish(error, null);
			}
			stat(filename, (error, statinfo) => {
				if (error) {
					return write('create');
				}
				if (statinfo.isDirectory()) {
					return _rm(filename, (error, rminfo) => {
						if (error) {
							return onfinish(error, null);
						}
						write('create', ...flatArray(rminfo.action));
					}, onaction);
				}
				if (statinfo.isFile()) {
					return write('edit');
				}
				onfinish(new Error(`Can't write "${filename}" as a file`));
				function write(type, ...nextact) {
					writeFile(filename, data, options, (error) => {
						if (error) {
							return onfinish(error, null);
						}
						var action = new Action(type, filename, 'file');
						justTry(onaction, [action]);
						callOnFinish(...flatArray(mkdirinfo.action), ...nextact, action);
					});
				}
			})
		}, onaction);
	}

	var _writeFile = (file, descriptor, onfinish, onaction) =>
		addPromise((resolve) => __writeFile(file, descriptor, (...errinf) => resolve(errinf), onaction))
			.onfinish((errinf) => onfinish(...errinf));

	module.exports = (filename, descriptor, onfinish, onaction) =>
		_writeFile(resolvePath(filename), _getdesc(descriptor), _getfunc(onfinish, _throwif), _getfunc(onaction, _donothing));

})(module);
