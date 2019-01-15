import { cook, init, render, validate } from './CookieExfiltrator'

export default {
  title: 'Cookie Exfiltrator',
  description: 'Exfiltrate one or more cookies to an external web server',
  cook: cook,
  validate: validate,
  init: init,
  render: render,
  dependencies: ['AjaxRequest']
}
