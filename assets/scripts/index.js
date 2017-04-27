'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import auth from './auth/events'
import lines from './lines/events'

$(() => {
  setAPIOrigin(location, config)
  auth.addEventHandlers()
  lines.addEventHandlers()
  lines.onListLines()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
