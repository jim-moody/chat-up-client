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

const deleteLine = (id) => {
  return $.ajax({
    url: config.apiOrigin + `/lines/${id}`,
    method: 'DELETE'
  })
}

const updateLine = ({id, data}) => {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + `/lines/${id}`,
    method: 'PATCH',
    data
  })
}

module.exports = {
  submitLine,
  listLines,
  deleteLine,
  updateLine
}
