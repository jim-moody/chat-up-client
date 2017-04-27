'use strict'

const config = require('../config')
import store from '../store'

const submitLine = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/lines',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const listLines = () => {
  const token = store.user && store.user.token || ''
  return $.ajax({
    url: config.apiOrigin + '/lines',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const deleteLine = (id) => {
  return $.ajax({
    url: config.apiOrigin + `/lines/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateLine = ({id, data}) => {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + `/lines/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  submitLine,
  listLines,
  deleteLine,
  updateLine
}
