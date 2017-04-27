'use strict'

const config = require('../config')

const submitLine = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/lines',
    method: 'POST',
    data
  })
}

const listLines = () => {
  return $.ajax({
    url: config.apiOrigin + '/lines',
    method: 'GET'
  })
}

module.exports = {
  submitLine,
  listLines
}
