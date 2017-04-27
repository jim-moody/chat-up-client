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

const listLinesSuccess = ({lines}) => {
  renderLinesList(lines)
}

const listLinesFailure = (data) => {
  console.log(data)
}

const deleteLineSuccess = (callback) => {
  callback()
}

const deleteLineFailure = (data) => {
  console.log(data)
}

const updateLineSuccess = (data) => {
  console.log(data)
}

const updateLineFailure = (data) => {
  console.log(data)
}

const renderLinesList = (lines) => {
  // get the list html element
  const list = $('#lines-list')

  // build the template using handlebars and data passed in
  const html = linesListTemplate({lines: lines})

  // empty the list and then append the template
  list.empty().append(html)
}

module.exports = {
  submitLineSuccess,
  submitLineFailure,
  listLinesSuccess,
  listLinesFailure,
  deleteLineSuccess,
  deleteLineFailure,
  updateLineSuccess,
  updateLineFailure
}
