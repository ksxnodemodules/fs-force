
((module) => {
	'use strict';

	var {statSync, writeFileSync} = require('fs');
	var path = require('path');
	var justTry = require('just-try');
	var _mkdirSync = require('./mkdir-sync.js');
	var _rmSync = require('./delete-sync.js');
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');
	var _donothing = require('./utils/do-nothing.js');
	var flatArray = require('./utils/flat-array.js');
	var _getdesc = require('./utils/write-file-desc.js');

	var resolvePath = path.resolve;
	var getParent = path.dirname;

	var _writeFileSync = (filename, descriptor, onaction) => {
		var callOnAction = (action) =>
			justTry(() => onaction(action), (error) => console.error(error));
		var createInfo = (...action) =>
			new Info('mkfile', filename, action);
		var data = descriptor.data;
		var options = descriptor.options;
		var mkdiract = _mkdirSync(getParent(filename), onaction).action;
		return justTry(() => statSync(filename), () => write('create'), handleExist);
		function handleExist(statinfo) {
			if (statinfo.isDirectory()) {
				let rmact = _rmSync(filename, onaction).action;
				return write('create', ...flatArray(rmact));
			}
			if (statinfo.isFile()) {
				return write('edit');
			}
			throw new Error(`Can't write "${filename}" as a file`);
		}
		function write(type, ...nextact) {
			writeFileSync(filename, data, options);
			var action = new Action(type, filename, 'file');
			justTry(onaction, [action]);
			return createInfo(...flatArray(mkdiract), ...nextact, action);
		}
	};

	module.exports = (filename, descriptor, onaction) =>
		_writeFileSync(resolvePath(filename), _getdesc(descriptor), _getfunc(onaction, _donothing));

})(module);
