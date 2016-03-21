
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var justTry = require('try-promise').try;
	var _mkdir = require('./mkdir.js');
	var _rm = require('./delete.js');
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');
	var _throwif = require('./utils/throw-if.js');
	var _donothing = require('./utils/do-nothing.js');
	var flatArray = require('./utils/flat-array.js');
	var _getdesc = require('./utils/write-file-desc.js');

	var stat = fs.stat;
	var writeFile = fs.writeFile;
	var resolvePath = path.resolve;
	var getParent = path.dirname;

	var _writeFile = (filename, descriptor, onfinish, onaction) => {
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
					return write();
				}
				if (statinfo.isDirectory()) {
					return _rm(filename, (error, rminfo) => {
						if (error) {
							return onfinish(error, null);
						}
						write(...flatArray(rminfo.action));
					}, onaction);
				}
				if (statinfo.isFile()) {
					return write();
				}
				onfinish(new Error(`Can't write "${filename}" as a file`));
				function write(...nextact) {
					writeFile(filename, data, options, (error) => {
						if (error) {
							return onfinish(error, null);
						}
						var action = new Action('create', filename, 'file');
						justTry(onaction, [action]);
						callOnFinish(...flatArray(mkdirinfo.action), ...nextact, action);
					});
				}
			})
		}, onaction);
	}

	module.exports = (filename, descriptor, onfinish, onaction) =>
		_writeFile(resolvePath(filename), _getdesc(descriptor), _getfunc(onfinish, _throwif), _getfunc(onaction, _donothing));

})(module);
