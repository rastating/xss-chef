import React from 'react'
import RecipeTextField from '~/components/RecipeTextField'

export function cook (instance, vars) {
  const message = instance.message
    .replace(/\\/g, '\\\\')
    .replace(/'/g, `\\'`)

  const payload = [
    `alert('${message}');`,
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
    message: ''
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div>
      <RecipeTextField
        bindTo="message"
        instance={instance}
        label="Message"
        placeholder=""
        setRecipeProperty={setRecipeProperty}
      />
    </div>
  )
}

export function validate (instance) {
  return true
}
