'use strict'
import store from '../store'
const signInSuccess = ({user}) => {
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

  // clear/reset the sign in form in case the user gets back there somehow
  const $email = $('#sign-in-email')
  const $password = $('#sign-in-password')
  $email.val('')
  $password.val('')
  $email.parent('div').toggleClass('is-dirty')
  $password.parent('div').toggleClass('is-dirty')

  // put the user info in the store
  store.user = user
  console.log(store)
}
const signInFailure = (data) => {
  console.error(data)
  // make sure sign in is shown, just in case the user came from sign up
  // authSelectors.signIn.container.show()

  // hide the loader and put the button back after we know it failed
  // hideFormLoader(authSelectors.signIn)

  // show a message to the user that sign in didnt work
  // showAlert(authSelectors.alerts.signInFailure)
}
module.exports = {
  signInSuccess,
  signInFailure
}
