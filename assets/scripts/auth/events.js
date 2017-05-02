'use strict'
import ui from './ui'
import api from './api'
import getFormFields from '../../../lib/get-form-fields'
import signUpTemplate from '../templates/sign-up.handlebars'
import signInTemplate from '../templates/sign-in.handlebars'
import changePasswordTemplate from '../templates/change-password.handlebars'
import store from '../store'
import {showAlert, showLoader} from '../helpers'

const onSignUp = (event) => {
  // prevent a page refresh
  event.preventDefault()

  // get the credentials from the form
  const tempData = getFormFields(event.target)
  const {credentials} = tempData

  // wrap the credentials with an object because that is how the API expects it
  const data = {
    credentials
  }

  // set the gender programatically since its in a radio button and
  // getFormFields doesn't know how to deal with it
  if ($('#gender-male').is(':checked')) {
    data.credentials.gender = 'm'
  }
  if ($('#gender-female').is(':checked')) {
    data.credentials.gender = 'f'
  }
  // destructure the data and check that we have data, otherwiser the user
  // must not have filled in the information
  const {email, password, password_confirmation: passwordConfirmation, gender} = data.credentials
  if (email && password && passwordConfirmation && gender) {
    // hide any alert messages
    $('.alert-anchor').empty()

    showLoader()

    // send the data to the backend and handle success/fail
    api.signUp(data).then(ui.signUpSuccess).catch(ui.signUpFailure)
  } else {
    // let the user know that they need to fill out the form, because they must
    // have missed a field
    const form = $(event.target)
    const errorText = 'Please fill in all fields'
    showAlert(form, errorText, 'error')
  }
}

const onSignIn = (event) => {
  // prevent a page refresh
  event.preventDefault()

  // get the data from the form
  const data = getFormFields(event.target)

  // check to make sure theres data, otherwise show a message to the user
  if (data.credentials.email && data.credentials.password) {
    $('.alert-anchor').empty()

    showLoader()

    // send the data to the backend and handle success/fail
    api.signIn(data).then(ui.signInSuccess).catch(ui.signInFailure)
  } else {
    // show a message to the user to tell them to enter credentials
    const form = $(event.target)
    const errorText = 'Please fill in all fields'
    showAlert(form, errorText, 'error')
  }
}

const onShowSignUp = () => {
  // check to make sure the sign up form is not already on the screen
  // we dont want 100 sign-up forms!
  if (!$('#sign-up-container').is('visible')) {
    // get the sign up template and show it
    $('#auth-content').empty().append(signUpTemplate)

    // add necessary event handlers
    $('#sign-up').on('submit', onSignUp)
  }
}
const onSignOut = () => {
  showLoader()

  // sign out the user and handle success/fail
  api.signOut(store.user).then(ui.signOutSuccess).catch(ui.signOutFailure)
}

const onChangePassword = (event) => {
  // keep page from refreshing
  event.preventDefault()

  // get the data from the form
  const data = getFormFields(event.target)

  // destructure the data
  const { old, new: newPassword } = data.passwords

  // check to make sure the fields were filled in
  if (old && newPassword) {
    showLoader()

    api.changePassword(data).then(ui.changePasswordSuccess).catch(ui.changePasswordFailure)
  } else {
    // show an alert letting the user know they need to fill in all the fields
    // because they must have missed a field
    const form = $(event.target)
    const errorText = 'Please fill in all fields'
    showAlert(form, errorText, 'error')
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
  }
}

const onShowChangePassword = () => {
  // if the change password is not already on screen
  // we dont want 100 change-password forms!
  if (!$('#change-pw-container').is('visible')) {
    // get the sign in template and show it
    $('#auth-content').empty().append(changePasswordTemplate)

    // add necessary event handlers
    $('#change-pw').on('submit', onChangePassword)
  }
}

module.exports = {
  onShowSignIn,
  onShowSignUp,
  onSignOut,
  onShowChangePassword
}
