'use strict'
import {resetForm} from '../helpers'
import linesListTemplate from '../templates/lines-list.handlebars'
import {getVoteSummary} from './helpers'

const submitLineSuccess = ({line}) => {
  // reset the form so another line can be added
  resetForm($('#submit-line-container')).slideUp()
}

const submitLineFailure = (data) => {
  console.log(data)
}

const listLinesSuccess = ({lines}) => {
  renderNewestList(lines)
  renderMostPopularList(lines)
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
  const lineContainer = $(`div[data-id=${line.id}]`).find('.line-text-container')
  const votingContainer = $('.voting-container')
  lineContainer.find('.line-text').text(line.text)

  lineContainer.show()
  votingContainer.show()
  $('.edit-container').remove()
}

const updateLineFailure = (data) => {
  console.log(data)
}

const addVoteFailure = (data) => {
  console.log(data)
}

const renderList = (anchor, lines) => {
  // add a summary to each line
  lines.forEach((line) => {
    line.voteSummary = getVoteSummary(line.votes)
  })
  // build the template using handlebars and data passed in
  const html = linesListTemplate({lines: lines})

  // empty the list and then append the template
  anchor.empty().append(html)
}
const renderMostPopularList = (linesList) => {
  // get the list html element
  const list = $('#lines-list-most-popular')

  // order the lines by total points
  linesList = linesList.sort(sortMostPopular)

  renderList(list, linesList)
}
const renderNewestList = (linesList) => {
  // get the list html element
  const list = $('#lines-list-newest')
  // order the lines by id, oldest to newest
  linesList.sort((line1, line2) => line2.id - line1.id)
  console.log(linesList)
  renderList(list, linesList)
}
const totalPoints = (line) => {
  const {up, down} = getVoteSummary(line.votes)
  return up - down
}

const sortMostPopular = (line1, line2) => {
  const sum = totalPoints(line2) - totalPoints(line1)
  if (sum === 0) {
    return line2.votes.length - line1.votes.length
  }
  return sum
}

module.exports = {
  submitLineSuccess,
  submitLineFailure,
  listLinesSuccess,
  listLinesFailure,
  deleteLineSuccess,
  deleteLineFailure,
  updateLineSuccess,
  updateLineFailure,
  addVoteFailure
}
