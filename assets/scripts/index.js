'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import lines from './lines/events'
import nav from './nav/events'
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'

$(() => {
  setAPIOrigin(location, config)
  // auth.onShowSignIn()
  nav.addEventHandlers()
  lines.addEventHandlers()
  lines.onListLines()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
