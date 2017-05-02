'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import lines from './lines/events'
import nav from './nav/events'
import ui from '../scripts/auth/ui'
import store from '../scripts/store'
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'

const setUser = () => {
  const user = sessionStorage.getItem('user')
  if (user && user !== 'undefined') {
    store.user = JSON.parse(user)
    ui.toggleMenuLinks(true)
    $('#show-submit-line').show()
  }
    lines.onListLines()
}

$(() => {
  setAPIOrigin(location, config)
  nav.addEventHandlers()
  lines.addEventHandlers()
  setUser()

  // lines.onListLines()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
