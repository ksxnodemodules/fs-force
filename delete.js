
((module) => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var justTry = require('try-promise').try;
	var _getfunc = require('./utils/get-val.js').function;
	var Info = require('./utils/info.js');
	var Action = require('./utils/action.js');

	var rmdir = fs.rmdir;
	var unlink = fs.unlink;
	var stat = fs.stat;
	var resolvePath = path.resolve;
	var getParent = path.dirname;

	const THROWIF = (error) => {
		if (error) throw error;
	};

	const DONOTHING = () => {};

	var _rm = (entry, onfinish, onaction) => {};

	module.exports = (entry, onfinish, onaction) =>
		_rm(resolvePath(entry), _getfunc(onfinish, THROWIF), _getfunc(onaction, DONOTHING));

})(module);
