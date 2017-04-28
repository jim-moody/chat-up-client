'use strict'
import { resetForm } from '../helpers'
import linesListTemplate from '../templates/lines-list.handlebars'
import lineTemplate from '../templates/line.handlebars'

const submitLineSuccess = ({line}) => {
  // reset the form so another line can be added
  resetForm($('#submit-line'))
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
  $('.edit-container').remove()
}

const updateLineFailure = (data) => {
  console.log(data)
}

const renderLinesList = (lines) => {
  // get the list html element
  const list = $('#lines-list')

  // order the lines by id, oldest to newest
  lines = lines.sort(({id: id1}, {id: id2}) => id1 - id2)

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
