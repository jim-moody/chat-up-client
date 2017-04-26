'use strict'

import getFormFields from '../../../lib/get-form-fields'
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

const addEventHandlers = () => {
  // make the api call once a user clicks submit and send the text down
  $('#submit-line').on('submit', onSubmitLine)
}

module.exports = {
  addEventHandlers
}
