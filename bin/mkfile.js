#! /usr/bin/env node --es-staging

(() => {
  'use strict'

  var argv = require('process').argv
  var writeFile = require('../write-file.js')

  if (argv.length === 2) {
    return console.error(`force-mkfile <file-path> [<file-text-content>]`)
  }

  writeFile(argv[2], {'data': argv[3] || ''}, require('./onfinish.js')('Creating File'), require('./onaction.js'))
})()
