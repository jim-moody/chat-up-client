'use strict'

import auth from '../auth/events'

const onScroll = () => {
  const navContentOffset = $('.nav-content').offset().top - $(window).scrollTop()
  if (scrollY > navContentOffset) {
    $('.nav-wrapper').fadeOut('slow')
  }
  if (scrollY <= navContentOffset) {
    $('.nav-wrapper').fadeIn('slow')
  }
}

const onShowUserContent = () => {
  // show the dropdown and hide whenever user clicks somewhere else
  const dropdown = $('#user-dropdown-content')
  dropdown.show('fast', () => {
    $('body').on('click', (e) => {
      dropdown.hide()
      $('body').off()
    })
  })
}
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
