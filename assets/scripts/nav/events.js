'use strict'

import auth from '../auth/events'

const onScroll = () => {
  const navContentOffset = $('.nav-content').offset().top - $(window).scrollTop()
  if (scrollY >= navContentOffset) {
    $('.nav-wrapper').fadeOut('slow')
  }
  if (scrollY <= navContentOffset) {
    $('.nav-wrapper').fadeIn('slow')
  }
}
const addEventHandlers = () => {
  $('#nav-sign-in-link').on('click', auth.onShowSignIn)
  $('#nav-sign-up-link').on('click', auth.onShowSignUp)
  $(window).scroll(onScroll)
}

module.exports = {
  addEventHandlers
}
