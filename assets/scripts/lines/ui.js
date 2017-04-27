'use strict'
import { resetForm } from '../helpers'
import linesListTemplate from '../templates/lines-list.handlebars'
import lineTemplate from '../templates/line.handlebars'

const submitLineSuccess = ({line}) => {
  console.log(line)

  resetForm($('#submit-line'))
  const html = lineTemplate({line})
  $('#lines-list').append(html)
}

const submitLineFailure = (data) => {
  console.log(data)
}

const listLinesSuccess = ({lines}) => {
  console.log(lines)
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

const updateLineSuccess = ({line}) => {
  const container = $(`div[data-id=${line.id}]`).find('.line-text-container')
  container.find('.line-text').text(line.text)

  container.show()
  $('.line-edit-container').remove()
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
