'use strict'
import {resetForm, hideLoader} from '../helpers'
import linesListTemplate from '../templates/lines-list.handlebars'
import {getVoteSummary, totalPoints} from './helpers'
import store from '../store'

const submitLineSuccess = ({line}) => {
  hideLoader()
  // reset the form so another line can be added
  resetForm($('#submit-line-container')).slideUp()
}

const submitLineFailure = (data) => {
  hideLoader()
  Materialize.toast('There was an issue adding your message', 3000)
}

const listLinesSuccess = ({lines}) => {
  hideLoader()
  // render each of the groupings.
  // ORDER MATTERS because we are doing sorting on an array of objects
  renderNewestList(lines)
  renderMostPopularList(lines)
  renderMaleFavoriteList(lines)
  renderFemaleFavoriteList(lines)
}

const listLinesFailure = (data) => {
  hideLoader()
  Materialize.toast('Something went wrong', 3000)
}

const deleteLineSuccess = (callback) => {
  hideLoader()
  callback()
}

const deleteLineFailure = (data) => {
  hideLoader()
  Materialize.toast('There was an issue deleting your message', 3000)
}

const updateLineSuccess = ({line}) => {
  hideLoader()
  const lineParent = $(`div[data-id=${line.id}]`)
  const lineDisplay = lineParent.find('.display-line-container')
  const lineContainer = lineParent.find('.line-text-container')
  lineContainer.find('.line-text > p').text(line.text)

  lineDisplay.fadeIn('slow')
  $('.edit-container').remove()
}

const updateLineFailure = (data) => {
  hideLoader()
  Materialize.toast('There was an issue updating your message', 3000)
}

const addVoteFailure = (data) => {
  Materialize.toast('There was an issue adding your vote', 3000)
}

const renderList = (anchor, lines) => {
  // add a summary to each line
  lines.forEach((line) => {
    line.text = line.text.trim()
    line.voteSummary = getVoteSummary(line.votes)
    // if user is logged in, highlight the button that they clicked to vote on
    // each line.  i.e. if they upvoted it, highlight the up button
    if (store.user) {
      line = setVoteActionHighlight(line, store.user.id)
    }
  })
  // build the template using handlebars and data passed in
  const html = linesListTemplate({lines: lines})

  // empty the list and then append the template
  anchor.empty().append(html)
}

// this figures out which vote action should be highlighted (if it all)
// for example, if the user has upvoted a particular conversation starter, then
// the up arrow should be highlighted
const setVoteActionHighlight = (line, userId) => {
  // get the value of the user's vote.  If they have no vote,
  // set the value to = 0
  const { value = 0 } = line.votes.find((vote) =>
    vote.user_id === userId) || {}

  const highlightClass = 'blue lighten-5 blue-text text-darken-3'
  const notHighlightedClass = ''

  line.userUpVotedClass = value === 1
    ? highlightClass
    : notHighlightedClass
  line.userDownVotedClass = value === -1
    ? highlightClass
    : notHighlightedClass

  return line
}

const renderMostPopularList = (linesList) => {
  // get the list html element
  const list = $('#lines-list-most-popular')

  // order the lines by total points
  const popularList = linesList.sort(sortMostPopular)

  // render the list
  renderList(list, popularList)
}
const renderMaleFavoriteList = (linesList) => {
  const list = $('#lines-list-male-favorite')

  // create a new list so that we dont alter it for other renderings
  let maleList = linesList.map((line) => {
    return JSON.parse(JSON.stringify(line))
  })

  // get only the male votes
  maleList = maleList.map((line) => {
    line.votes = line.votes.filter((vote) => vote.gender === 'm')
    return line
  })

  // sort by most popular and render
  maleList.sort(sortMostPopular)
  renderList(list, maleList)
}
const renderFemaleFavoriteList = (linesList) => {
  const list = $('#lines-list-female-favorite')

  // create a new list so we dont alter it for other renderings
  let femaleList = linesList.map((line) => {
    return JSON.parse(JSON.stringify(line))
  })

  // get only the female votes
  femaleList = femaleList.map((line) => {
    line.votes = line.votes.filter((vote) => vote.gender === 'f')
    return line
  })

  // sort by most popular and render
  femaleList.sort(sortMostPopular)
  renderList(list, femaleList)
}
const renderNewestList = (linesList) => {
  // get the list html element
  const list = $('#lines-list-newest')

  // order the lines by id, oldest to newest
  const newestList = linesList
  newestList.sort((line1, line2) => line2.id - line1.id)

  // render the list
  renderList(list, newestList)
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
