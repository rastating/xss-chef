import { cook, init, render, validate } from './BodyReplacer'

export default {
  title: 'Body Replacer',
  description: 'Replace the inner HTML of the document body with custom markup',
  cook: cook,
  validate: validate,
  init: init,
  render: render
}
