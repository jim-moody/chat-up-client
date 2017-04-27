'use strict'

import api from './api'
import ui from './ui'
import store from '../store'

const onSubmitLine = (e) => {
  // prevent page from refreshing
  e.preventDefault()

  const text = $('#line-textarea').val()
  const userId = store.user.id
  const data = {
    line: {
      text: text,
      user_id: userId
    }
  }
  // make the call to the API
  api.submitLine(data).then(ui.submitLineSuccess).catch(ui.submitLineFailure)
}

const onListLines = (e) => {
  // create callback function because we want to render the list
  // and add the delete function but we cant import it in the ui file
  // because of circular dependencies
  const successCallback = (data) => {
    ui.listLinesSuccess(data)
    $('.delete').on('click', onDeleteLine)
  }

  // call the api with our success callback function
  api.listLines().then(successCallback).catch(ui.listLinesFailure)
}

const onDeleteLine = (e) => {
  // get the id from the delete button
  const id = $(e.target).data('id')

  // call the api with the id, then re-render the list of lines
  api.deleteLine(id).then(onListLines).catch(ui.deleteLineFailure)
}

const addEventHandlers = () => {
  // make the api call once a user clicks submit and send the text down
  $('#submit-line').on('submit', onSubmitLine)
}

module.exports = {
  addEventHandlers,
  onListLines,
  onDeleteLine
}
