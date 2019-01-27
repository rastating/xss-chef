import { cook, render, validate, init } from './LinkHijacker'

export default {
  title: 'Link Hijacker',
  description: 'Change the href attribute of all links on the page to point to a different URL',
  cook: cook,
  render: render,
  validate: validate,
  init: init
}
