'use strict'
import ui from './ui'
import api from './api'
import getFormFields from '../../../lib/get-form-fields'

const onSignUp = (event) => {
  // prevent a page refresh
  event.preventDefault()

  // get the data from the form
  const data = getFormFields(event.target)

  // destructure the data
  const {email, password, password_confirmation: passwordConfirmation} = data.credentials

  // check to make sure theres data, otherwise show a message to the user
  if (email && password && passwordConfirmation) {
    // show loader
    // showFormLoader(authSelectors.signUp)

    // send the data to the backend and handle success/fail
    api.signUp(data).then(ui.signUpSuccess).catch(ui.signUpFailure)
  } else {
    // let the user know that they need to fill out the form
    // showAlert(authSelectors.alerts.signUpEmpty)
  }
}

const addEventHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addEventHandlers
}
