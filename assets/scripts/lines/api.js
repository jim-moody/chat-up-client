'use strict'

const config = require('../config')

const submitLine = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/lines',
    method: 'POST',
    data
  })
}

module.exports = {
  submitLine
}
