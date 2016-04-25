#! /usr/bin/env node --es-staging

(() => {
    'use strict';

    var resolvePath = require('path').resolve;
    var argv = require('process').argv;
    var rm = require('../delete.js');

    const EXIT_SUCCESS = 0;
    const EXIT_FAILURE = 1;

    if (argv.length === 2) {
        return console.error(`force-delete <list-of-path>`);
    }

    argv.slice(2)
        .map((fname) => resolvePath(fname))
        .forEach((fname) => rm(fname, require('./onfinish.js')('Deleted'), require('./onaction.js')))
    ;

})();
