'use strict'
import { resetForm } from '../helpers'
import linesListTemplate from '../templates/lines-list.handlebars'

const submitLineSuccess = (data) => {
  resetForm($('#submit-line'))
  console.log(data)
}

const submitLineFailure = (data) => {
  console.log(data)
}

const listLinesSuccess = (data) => {
  const html = linesListTemplate({lines: data.lines})
  $('#lines-list').append(html)
  console.log(data)
}

const listLinesFailure = (data) => {
  console.log(data)
}

module.exports = {
  submitLineSuccess,
  submitLineFailure,
  listLinesSuccess,
  listLinesFailure
}
