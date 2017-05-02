'use strict'

import auth from '../auth/events'

const onScroll = () => {
  // Hide the main part of the navigation bar if a user scrolls down
  // so we put more emphasis on the grouping tabs
  const navContentOffset = $('.nav-content').offset().top - $(window).scrollTop()
  if (scrollY > navContentOffset) {
    $('.nav-wrapper').fadeOut('slow')
  }
  if (scrollY <= navContentOffset) {
    $('.nav-wrapper').fadeIn('slow')
  }
}

const onShowUserContent = () => {
  // show the dropdown and  add event handler to hide it
  // whenever user clicks somewhere else
  const dropdown = $('#user-dropdown-content')
  dropdown.show(100, '', function () {
    $('body').on('click focus', () => {
      dropdown.hide()
      $('body').off()
    })
  })
}

// add event handlers
const addEventHandlers = () => {
  $('#nav-sign-in-link').on('click', auth.onShowSignIn)
  $('#nav-sign-up-link').on('click', auth.onShowSignUp)
  $('#nav-sign-out-link').on('click', auth.onSignOut)
  $('#nav-change-password-link').on('click', auth.onShowChangePassword)
  $('#nav-user-link').on('click', onShowUserContent)
  $(window).scroll(onScroll)
}

module.exports = {
  addEventHandlers
}
