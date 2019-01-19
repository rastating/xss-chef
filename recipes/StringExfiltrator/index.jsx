import { cook, render, validate, init } from './StringExfiltrator'

export default {
  title: 'String Exfiltrator',
  description: 'Request a resource from the target\'s browser and exfiltrate the data',
  cook: cook,
  render: render,
  validate: validate,
  init: init,
  dependencies: ['AjaxRequest']
}
