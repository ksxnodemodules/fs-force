#! /usr/bin/env node --es-staging

(() => {
    'use strict';

    var resolvePath = require('path').resolve;
    var mkdir = require('../mkdir.js');

    const EXIT_SUCCESS = 0;
    const EXIT_FAILURE = 1;

    require('process').argv.slice(2)
        .map((dirname) => resolvePath(dirname))
        .forEach((dirname) => mkdir(dirname, require('./onfinish.js')('Created Directory'), require('./onaction.js')))
    ;

})();
