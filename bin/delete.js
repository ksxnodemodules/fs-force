#! /usr/bin/env node --es-staging

(() => {
    'use strict';

    var resolvePath = require('path').resolve;
    var argv = require('process').argv;
    var rm = require('../delete.js');

    if (argv.length === 2) {
        return console.error(`force-delete <list-of-path>`);
    }

    var prmseq = argv.slice(2)
        .map((fname) => resolvePath(fname))
        .map((fname) => (_, resolve) => {
            rm(fname, require('./onfinish.js')('Deleting'), require('./onaction.js'));
            resolve();
        })
    ;



})();
