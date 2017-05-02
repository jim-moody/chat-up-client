'use strict'

import api from './api'
import ui from './ui'
import store from '../store'
import lineEditTemplate from '../templates/line-edit.handlebars'
import {resetForm, textAreaAutoResize, showAlert, showLoader} from '../helpers'
import loaderTemplate from '../templates/loader.handlebars'

const onSubmitLine = (e) => {
  // prevent page from refreshing
  e.preventDefault()

  // get the text from the form
  const text = $('#line-textarea').val()

  // check to make sure the user actually entered some text
  if (text) {
    // hide any error messages
    $('.alert-anchor').empty()

    // build up the data object
    const userId = store.user.id
    const data = {
      line: {
        text: text,
        user_id: userId
      }
    }

    // customize the callback for a successful response
    const successCallback = (data) => {
      ui.submitLineSuccess(data)

      // re-render the list after the line is added to the database
      onListLines()
    }
    // make the call to the API
    showLoader()
    api.submitLine(data).then(successCallback).catch(ui.submitLineFailure)
  } else {
    // if there is no text in the form, show an error
    const parent = $(e.target)

    // refocus on the textarea because they will need to correct the error
    parent.find('textarea').focus()

    // show an error to user
    const text = 'Please enter text before submitting'
    showAlert(parent, text, 'error')
  }
}

const onListLines = () => {
  // create callback function because we want to render the list
  // and add the delete function but we cant import it in the ui file
  // because of circular dependencies
  const successCallback = (data) => {
    ui.listLinesSuccess(data)
    $('.edit-options').on('click', onShowEditOptions)
    $('.delete').on('click', onDeleteLine)
    $('.edit').on('click', onShowEditLine)
    $('.vote').on('click', onAddVote)
  }

  // call the api with our success callback function
  api.listLines().then(successCallback).catch(ui.listLinesFailure)
}

const onDeleteLine = (e) => {
  // hide the delete
  const container = $(e.target).closest('.form-card')
  container.fadeOut('slow', function () {
    // get the id from the delete button
    const id = $(e.target).data('id')

    const failHandler = (data) => {
      container.fadeIn()
      ui.deleteLineFailure(data)
    }
    showLoader()
    // call the api with the id, then re-render the list of lines
    api.deleteLine(id).then(onListLines).catch(failHandler)
  })
}
const onShowEditLine = (e) => {
  // this basically makes sure all other text containers are NOT in edit mode
  // if they are in edit mode, this will remove that
  // we do this because we dont want the user editing multiple lines at the
  // same time
  $('.edit-container').remove()
  $('.line-text-container').show()

  // get the current target in jquery
  const target = $(e.target)

  // get id of current line
  const id = target.data('id')

  // find the parent only IN THIS TAB
  const lineParent = target.closest('.line-parent')
  const lineDisplayContainer = lineParent.find('.display-line-container')
  const lineContainer = lineParent.find('.line-text-container')

  // get the text from the container and trim it so we dont have trailing
  // whitespace
  const text = lineContainer.find('.line-text').text().trim()

  // show the edit template with text from parent
  // build the handlebar template for editing with the text
  const html = lineEditTemplate({id})
  lineParent.append(html)

  // add event handlers to the handlebars template
  $('#line-edit-cancel').on('click', onCancelEditLine)
  $('#line-edit-save').on('click', onUpdateLine)

  // fade out the text container and fade in the edit container
  lineDisplayContainer.fadeOut('slow', function () {
    $('.edit-container').fadeIn()
    $('#line-textarea-edit').focus().val(text)

    // make sure we resize the textarea as the user types
    textAreaAutoResize()
    $('textarea').on('keyup keydown', function () {
      textAreaAutoResize()
    })
  })
}
const onCancelEditLine = (e) => {
  const lineContainer = $(e.target).closest('.line-parent').find('.display-line-container')
  // get rid of the editing textfield
  $('.edit-container').fadeOut(function () {
    this.remove()
    // show the line again and the voting options
    lineContainer.fadeIn()
  })
}
const onShowEditOptions = (e) => {
  // show the dropdown content
  const ul = $(e.target).siblings('ul')

  // turn a click handler onto the body so anywhere that a user clicks
  // the dropdown will be hidden, then immediately turn that handler // off
  ul.show('fast', () => {
    $('body').on('click focus', (e) => {
      ul.hide()
      $('body').off()
    })
  })
}
const onUpdateLine = (e) => {
  // get the current line id and new text
  const id = $(e.target).data('id')
  const text = $('#line-textarea-edit').val()
  // build the data object
  const data = {
    id: id,
    data: {
      line: {
        text: text
      }
    }
  }
  // make the call to the API
  showLoader()
  api.updateLine(data).then(ui.updateLineSuccess).catch(ui.updateLineFailure)
}
const onShowSubmitLine = (e) => {
  // show the add line textarea
  $('#submit-line-container').slideDown(() => {
    // focus on the input so the user can start typing
    $('#submit-line-container textarea').focus()

    // add a handler to resize the textarea when a user types
    $('textarea').on('keyup keydown', function () {
      textAreaAutoResize()
    })
  })
}

const onCancelSubmitLine = (e) => {
  // hide the add line textarea
  resetForm($('#submit-line-container')).slideUp()
  // resize the textarea so if the user wants to add again
  // it isnt this big textarea, its just the normal size
  textAreaAutoResize()
  $('.alert-anchor').empty()
}

const onAddVote = (e) => {
  // TODO add error message if user is not logged in
  // make sure user is logged in

  if (store.user) {
    // get the jquery element
    const target = $(e.target)
    const tabGender = target.closest('.tab-content').data('gender')
    const userGender = store.user.gender

    if (tabGender && tabGender !== userGender) {
      Materialize.toast('Your votes will not display in this view', 3000)
    } else {
      // get the id of the line the user just voted on
      const lineId = target.data('id')

      // get the value of what the user clicked on, i.e. up vote or down
      // vote
      const value = target.data('value')

      // build the data object, then send it to the API
      const data = {
        vote: {
          line_id: lineId,
          value: value
        }
      }

      api.addVote(data).then(onListLines).catch(ui.addVoteFailure)
    }
  } else {
    // if user isnt logged in, show an error message
    Materialize.toast('You must be logged in to vote', 3000)
  }
}

const addEventHandlers = () => {
  $('#show-submit-line').on('click', onShowSubmitLine)
  $('#submit-line').on('submit', onSubmitLine)
  $('#line-submit-cancel').on('click', onCancelSubmitLine)
}

module.exports = {
  addEventHandlers,
  onListLines,
  onDeleteLine,
  onUpdateLine,
  onAddVote
}
