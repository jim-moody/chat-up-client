'use strict'

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


module.exports = {
  resetForm
}
