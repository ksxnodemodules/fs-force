#! /usr/bin/env node --es-staging

(() => {
  'use strict'

  var resolvePath = require('path').resolve
  var argv = require('process').argv
  var rm = require('../delete.js')

  if (argv.length === 2) {
    return console.error(`force-delete <list-of-path>`)
  }

  var onfinish = require('./onfinish.js')('Deleting')
  var onaction = require('./onaction.js')

  argv.slice(2)
        .map((fname) => resolvePath(fname))
        .forEach((fname) => rm(fname, onfinish, onaction))
})()
