#! /usr/bin/env node

(() => {
  'use strict'

  const resolvePath = require('path').resolve
  const argv = require('process').argv
  const mkdir = require('../mkdir.js')

  if (argv.length === 2) {
    return console.error(`force-mkdir <dirname-list>`)
  }

  argv.slice(2)
    .map((dirname) => resolvePath(dirname))
    .forEach((dirname) => mkdir(dirname, require('./onfinish.js')('Creating Directory'), require('./onaction.js')))
})()
