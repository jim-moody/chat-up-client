'use strict'
import { resetForm } from '../helpers'

const submitLineSuccess = (data) => {
  resetForm($('#submit-line'))
  console.log(data)
}

const submitLineFailure = (data) => {
  console.log(data)
}

module.exports = {
  submitLineSuccess,
  submitLineFailure
}
