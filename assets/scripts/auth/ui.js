'use strict'
import store from '../store'
import api from './api'
import {resetForm, showAlert, hideLoader} from '../helpers'
import {onListLines} from '../lines/events'
import {toggleMenuLinks} from '../nav/ui'

const signUpSuccess = (data) => {
  hideLoader()

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
  hideLoader()

  // show an alert to the user letting them know that the sign up failed
  const parent = $('#sign-up')
  const text = 'There was an issue creating your account'
  showAlert(parent, text, 'error')
}

const signInSuccess = ({user}) => {
  hideLoader()
  // add the user object to session storage for persistent login
  sessionStorage.setItem('user', JSON.stringify(user))

  // get rid of the sign in form
  $('#auth-content').empty()

  // show the logged in links
  toggleMenuLinks(true)

  // clear/reset the sign in form in case the user gets back there somehow
  resetForm($('#sign-in-container')).hide()
  $('.alert-anchor').empty()

  // show the user the button to add conversation starters because they are logged in
  $('#show-submit-line').show()

  // put the user info in the store
  store.user = user

  // re render the list of lines because they might be editable now
  onListLines()
}

const signInFailure = (data) => {
  hideLoader()
  // show an error to the user
  const parent = $('#sign-in')
  const text = 'There was an issue signing you in'
  showAlert(parent, text, 'error')
}

const signOutSuccess = (data) => {
  hideLoader()

  // change the menu so that the user has the "logged out" options
  toggleMenuLinks()

  // hide change pw just in case it was shown
  resetForm($('#change-pw-container'))
  $('#auth-content').empty()

  // hide and reset the submit line container and button in case it is
  // on the screen when the user signs out because you cant submit
  // a new line when you arent logged in!
  resetForm($('#submit-line-container')).hide()
  $('#show-submit-line').hide()

  // clear the user info from memory so a new user can log in
  store.user = undefined
  sessionStorage.removeItem('user')

  // re render the conversation starters
  onListLines()
}

const signOutFailure = (data) => {
  hideLoader()

  // show an error the user
  Materialize.toast('There was an issue signing out', 3000)
}

const changePasswordSuccess = (data) => {
  hideLoader()

  // just hide the form, no alert necessary
  resetForm($('#change-pw-container')).hide()
}

const changePasswordFailure = (data) => {
  hideLoader()

  // show an error to the user
  Materialize.toast('There was an issue changing your password', 3000)
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
