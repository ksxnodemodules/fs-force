#! /usr/bin/env node --es-staging

(() => {
    'use strict';

    var resolvePath = require('path').resolve;
    var argv = require('process').argv;
    var writeFile = require('../write-file.js');

    const EXIT_SUCCESS = 0;
    const EXIT_FAILURE = 1;

    if (argv.length === 2) {
        return console.error(`force-mkfile <file-path> [<file-text-content>]`);
    }

    writeFile(argv[2], {'data': argv[3] || ''}, require('./onfinish.js')('Created File'), require('./onaction.js'));

})();
