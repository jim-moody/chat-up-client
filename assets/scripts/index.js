'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import auth from './auth/events'
import lines from './lines/events'
import signInTemplate from '../scripts/templates/sign-in.handlebars'

$(() => {
  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js')
  setAPIOrigin(location, config)
  $('#auth-content').append(signInTemplate)
  auth.onShowSignIn()
  lines.addEventHandlers()
  lines.onListLines()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
