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

const onSignIn = (event) => {
  // prevent a page refresh
  event.preventDefault()

  // get the data from the form
  const data = getFormFields(event.target)

  // check to make sure theres data, otherwise show a message to the user
  if (data.credentials.email && data.credentials.password) {
    // show loader
    // showFormLoader(authSelectors.signIn)

    // send the data to the backend and handle success/fail
    api.signIn(data).then(ui.signInSuccess).catch(ui.signInFailure)
  } else {
    console.error('gotta enter some stuff')
    // show a message to the user to tell them to enter credentials
    // showAlert(authSelectors.alerts.signInEmpty)
  }
}

const addEventHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
}

module.exports = {
  addEventHandlers
}
