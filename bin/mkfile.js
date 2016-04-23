#! /usr/bin/env node --es-staging

(() => {
    'use strict';

    var resolvePath = require('path').resolve;
    var argv = require('process').argv;
    var writeFile = require('../write-file.js');

    const EXIT_SUCCESS = 0;
    const EXIT_FAILURE = 1;

    writeFile(argv[2], {'data': argv[3]}, require('./onfinish.js')('Created File'), require('./onaction.js'));

})();
