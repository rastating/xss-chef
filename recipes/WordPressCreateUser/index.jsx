import { cook, render, validate, init } from './WordPressCreateUser'

export default {
  title: 'WordPress: Create User',
  description: 'Create a new WordPress user account on the target system',
  cook: cook,
  render: render,
  validate: validate,
  init: init,
  dependencies: ['AjaxRequest']
}
