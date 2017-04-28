'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import auth from './auth/events'
import lines from './lines/events'
import signInTemplate from '../scripts/templates/sign-in.handlebars'
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'

$(() => {
  console.log()
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
