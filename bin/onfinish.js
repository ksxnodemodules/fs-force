
((module) => {
  'use strict'

  module.exports = (action) => (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log(`${action} ${info.path} successfully`)
    }
  }
})(module)
