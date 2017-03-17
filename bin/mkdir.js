#! /usr/bin/env node --es-staging

(() => {
  'use strict'

  var resolvePath = require('path').resolve
  var argv = require('process').argv
  var mkdir = require('../mkdir.js')

  if (argv.length === 2) {
    return console.error(`force-mkdir <dirname-list>`)
  }

  argv.slice(2)
        .map((dirname) => resolvePath(dirname))
        .forEach((dirname) => mkdir(dirname, require('./onfinish.js')('Creating Directory'), require('./onaction.js')))
})()
