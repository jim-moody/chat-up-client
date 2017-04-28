'use strict'
import ui from './ui'
import api from './api'
import getFormFields from '../../../lib/get-form-fields'
import signUpTemplate from '../templates/sign-up.handlebars'
import signInTemplate from '../templates/sign-in.handlebars'

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

const onShowSignUp = () => {
  // if the sign up is not already on screen
  // we dont want 100 sign-up forms!
  if (!$('#sign-up-container').is('visible')) {
    // get the sign up template and show it
    $('#auth-content').empty().append(signUpTemplate)

    // add necessary event handlers
    $('#sign-up').on('submit', onSignUp)
    $('#sign-in-show').on('click', onShowSignIn)
  }
}

const onShowSignIn = () => {
  // if the sign in is not already on screen
  // we dont want 100 sign-in forms!
  if (!$('#sign-in-container').is('visible')) {
    // get the sign in template and show it
    $('#auth-content').empty().append(signInTemplate)

    // add necessary event handlers
    $('#sign-in').on('submit', onSignIn)
    $('#sign-up-show').on('click', onShowSignUp)
  }
}

module.exports = {
  onShowSignIn,
  onShowSignUp
}
