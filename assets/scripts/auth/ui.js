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
  console.error(data)
  // clear alerts (like success alerts)
  // hideAllAlerts()

  // hide the form loader and show the button
  // hideFormLoader(authSelectors.signUp)

  // let the user know the sign up failed
  // showAlert(authSelectors.alerts.signUpFailure)
}

const signInSuccess = ({user}) => {
  $('#sign-up-container').hide()
  $('#sign-in-container').hide()
  toggleMenuLinks(true)

  // clear/reset the sign in form in case the user gets back there somehow
  resetForm($('#sign-in-container')).hide()
  $('.alert-anchor').empty()

  $('#show-submit-line').show()

  // clear the alerts
  // hideAllAlerts()

  // clear containers
  // hideAllContainersExcept()

  // hide the loader and put the button back for if the user signs out again
  // hideFormLoader(authSelectors.signIn)

  // show the user's email in the header
  // menuSelectors.menu.email.text(user.email)

  // show the header now that the user is signed in
  // menuSelectors.menu.container.slideDown('fast')

  // put the user info in the store
  store.user = user

  // re render the list of lines because they might be editable now
  onListLines()

  console.log(store)
}

const signInFailure = (data) => {
  const parent = $('#sign-in')
  showAlert(parent, alertError)
  console.error(data)
  // make sure sign in is shown, just in case the user came from sign up
  // authSelectors.signIn.container.show()

  // hide the loader and put the button back after we know it failed
  // hideFormLoader(authSelectors.signIn)

  // show a message to the user that sign in didnt work
  // showAlert(authSelectors.alerts.signInFailure)
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
