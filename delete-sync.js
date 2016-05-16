
((module) => {
	'use strict';

	var {rmdirSync, unlinkSync, statSync, readdirSync} = require('fs');
	var path = require('path');
	var justTry = require('just-try');
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');
	var _donothing = require('./utils/do-nothing.js');
	var flatArray = require('./utils/flat-array.js');

	var resolvePath = path.resolve;
	var getParent = path.dirname;
	var joinPath = path.join;

	var _rmSync = (entry, onaction) => {
		var callOnAction = (action) =>
			justTry(() => onaction(action), (error) => console.error(error));
		var createInfo = (...action) =>
			new Info('delete', entry, action);
		return justTry(() => statSync(entry), () => createInfo(), handleExist);
		function handleExist(stat) {
			if (stat.isFile()) {
				unlinkSync(entry);
				let action = new Action('delete', entry, 'file');
				callOnAction(action);
				return createInfo(action);
			}
			if (stat.isDirectory()) {
				let prevact = readdirSync(entry)
					.map((item) => _rmSync(joinPath(entry, item), onaction).action);
				rmdirSync(entry);
				let action = new Action('delete', entry, 'dir');
				callOnAction(action);
				return createInfo(...flatArray(prevact), action);
			}
			throw new Error(`Can't delete entry "${entry}"`);
		}
	};

	module.exports = (entry, onaction) =>
		_rmSync(resolvePath(entry), _getfunc(onaction, _donothing));

})(module);
