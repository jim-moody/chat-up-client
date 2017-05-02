'use strict'

// helper function to show different links in the menu
// based on whether the user is logged in or logged out
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
  toggleMenuLinks
}
