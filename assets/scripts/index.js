'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import lines from './lines/events'
import nav from './nav/events'
import ui from './nav/ui'
import store from '../scripts/store'
import {showLoader} from '../scripts/helpers'
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'

// this is for persistent login
const setUser = () => {
  // attempt to get the user from session storage
  const user = sessionStorage.getItem('user')
  // if the user is in session storage, put the user in the store and rollll
  if (user && user !== 'undefined') {
    store.user = JSON.parse(user)
    ui.toggleMenuLinks(true)
    $('#show-submit-line').show()
  }
  // then start the app
  showLoader()
  lines.onListLines()
}

$(() => {
  setAPIOrigin(location, config)
  nav.addEventHandlers()
  lines.addEventHandlers()
  setUser()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
