#! /usr/bin/env node --es-staging

(() => {
    'use strict';

    var resolvePath = require('path').resolve;
    var process = require('process');
    var stract = require('fs-force-action-as-string');
    var mkdir = require('../mkdir.js');

    const EXIT_SUCCESS = 0;
    const EXIT_FAILURE = 1;

    process.argv.slice(2)
        .map((dirname) => resolvePath(dirname))
        .forEach((dirname) => mkdir(dirname, onfinish, onaction))
    ;

    function onfinish(error, info) {
        if (error) {
            console.error(error);
            process.exit(EXIT_FAILURE);
        } else {
            console.log(`Created directory ${info.path}`);
            process.exit(EXIT_SUCCESS);
        }
    }

    function onaction(action) {
        console.log(stract(action));
    }

})();
