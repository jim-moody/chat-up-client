'use strict'
import errorAlert from '../scripts/templates/alert-error.handlebars'
import successAlert from '../scripts/templates/alert-error.handlebars'

// resets a typical materialize form by finding inputs and clearing them
const resetForm = ($form) => {
  const elements = $form.find('input, textarea, label')

  // empty the value of inputs and text area
  elements.val('')

  // 'active' takes away the underline and the label float
  // 'valid' takes away the green line saying the input was valid
  elements.removeClass('valid active')

  // return for method chaining
  return $form
}

const showAlert = (parent, text, type) => {
  // clear any existing alerts
  $('.alert-anchor').empty()

  // set the correct template
  const template = type === 'error' ? errorAlert : successAlert

  // build template
  const html = template({text: text})

  // show the html
  parent.find('.alert-anchor').append(html)
}
module.exports = {
  resetForm,
  showAlert
}
