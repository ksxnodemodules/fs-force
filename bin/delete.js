#! /usr/bin/env node --es-staging

(() => {
  'use strict'

  const resolvePath = require('path').resolve
  const argv = require('process').argv
  const rm = require('../delete.js')

  if (argv.length === 2) {
    return console.error(`force-delete <list-of-path>`)
  }

  const onfinish = require('./onfinish.js')('Deleting')
  const onaction = require('./onaction.js')

  argv.slice(2)
    .map((fname) => resolvePath(fname))
    .forEach((fname) => rm(fname, onfinish, onaction))
})()
