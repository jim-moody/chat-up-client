'use strict'
import store from '../store'
import api from './api'
import {resetForm, showAlert} from '../helpers'
import {onListLines} from '../lines/events'
import alertError from '../templates/alert-error.handlebars'

const signUpSuccess = (data) => {
  // clear any alerts
  // hideAllAlerts()

  // hide the loader and show the button again
  // hideFormLoader(authSelectors.signUp)

  // get the credentials the user entered when signing up
  // so we can sign the user in automatically
  const credentials = {
    email: $('#sign-up-email').val(),
    password: $('#sign-up-password').val()
  }
  // sign user in and handle success/fail
  api.signIn({credentials}).then(signInSuccess).catch(signInFailure)

  // clear/reset the sign in form in case the user gets back there somehow
  // and then hide it
  resetForm($('#sign-up-container')).hide()
}

const signUpFailure = (data) => {
  const parent = $('#sign-up')
  const text = {text: 'There was an issue creating your account'}
  showAlert(parent, alertError(text))
}

const signInSuccess = ({user}) => {
  $('#auth-content').empty()
  toggleMenuLinks(true)

  // clear/reset the sign in form in case the user gets back there somehow
  resetForm($('#sign-in-container')).hide()
  $('.alert-anchor').empty()

  $('#show-submit-line').show()

  // put the user info in the store
  store.user = user

  // re render the list of lines because they might be editable now
  onListLines()

  console.log(store)
}

const signInFailure = (data) => {
  const parent = $('#sign-in')
  const text = {text: 'There was an issue signing you in'}
  showAlert(parent, alertError(text))
}

const signOutSuccess = (data) => {
  toggleMenuLinks()

  // hide change pw just in case it was shown
  resetForm($('#change-pw-container'))
  $('#auth-content').empty()

  // hide and reset the submit line container in case it is
  // on the screen when the user signs out because you cant submit
  // a new line when you arent logged in!
  resetForm($('#submit-line-container')).hide()

  // see above
  $('#show-submit-line').hide()

  store.user = {}
  onListLines()

}

const signOutFailure = (data) => {
  console.error(data)
}

const changePasswordSuccess = (data) => {
  resetForm($('#change-pw-container')).hide()
}

const changePasswordFailure = (data) => {
  console.log(data)
}

const toggleMenuLinks = (isLoggedIn) => {
  if (isLoggedIn) {
    $('a.signed-in').show()
    $('a.signed-out').hide()
  } else {
    $('a.signed-in').hide()
    $('a.signed-out').show()
  }
}
module.exports = {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
