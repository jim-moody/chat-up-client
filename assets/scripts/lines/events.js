'use strict'

import api from './api'
import ui from './ui'
import store from '../store'
import lineEditTemplate from '../templates/line-edit.handlebars'
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
    $('.edit').on('click', onShowEditLine)
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
const onShowEditLine = (e) => {
  // this basically makes sure all other text containers are NOT in edit mode
  // if they are in edit mode, this will remove that
  // we do this because we dont want the user editing multiple lines at the
  // same time
  $('.line-edit-container').remove()
  $('.line-text-container').show()

  const id = $(e.target).data('id')
  const lineParent = $(`div[data-id=${id}]`)
  const lineContainer = lineParent.find('.line-text-container')
  // get the text from the container
  const text = lineContainer.find('.line-text').text().trim()
  // show the edit template with text from parent
  // build the handlebar template for editing with the text
  const html = lineEditTemplate({id})

  lineContainer.hide()
  lineParent.append(html)
  $('#line-textarea-edit').focus().val(text)

  $('#line-edit-cancel').on('click', onCancelEditLine)
  $('#line-edit-save').on('click', onUpdateLine)
}
const onCancelEditLine = (e) => {
  $('.line-edit-container').remove()
  $('.line-text-container').show()

  // $('.line-edit-container').slideUp(function () {
  //  this.remove()
  //  $('.line-text-container').slideDown()
  // })
}

const onUpdateLine = (e) => {
  const id = $(e.target).data('id')
  const text = $('#line-textarea-edit').val()
  const data = {
    id: id,
    data: {
      line: {
        text: text
      }
    }
  }
  // make the call to the API
  api.updateLine(data).then(ui.updateLineSuccess).catch(ui.updateLineFailure)
}

const addEventHandlers = () => {
  // make the api call once a user clicks submit and send the text down
  $('#submit-line').on('submit', onSubmitLine)
}

module.exports = {
  addEventHandlers,
  onListLines,
  onDeleteLine,
  onUpdateLine
}
