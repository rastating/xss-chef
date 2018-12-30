import React from 'react'

export function cook (instance, vars) {
  let payload = vars.payload.replace(/__XSS_CHEF_.+?__/g, '')
  let encoded = ''

  for (var i = 0; i < payload.length; i++) {
    if (i === 0) {
      encoded = payload.charCodeAt(i).toString()
    } else {
      encoded = `${encoded},${payload.charCodeAt(i)}`
    }
  }

  if (instance.useEval) {
    return {
      payload: `eval(String.fromCharCode(${encoded}))\n__XSS_CHEF_ENTRY_POINT__`
    }
  } else {
    return {
      payload: `String.fromCharCode(${encoded})\n__XSS_CHEF_ENTRY_POINT__`
    }
  }
}

export function init () {
  return {
    useEval: true
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div className="form-group form-check">
      <input
        id={`${instance.id}-useEval`}
        type="checkbox"
        checked={instance.useEval}
        className="form-check-input"
        onChange={e => setRecipeProperty(
          instance.id,
          'useEval',
          e.target.checked
        )}
      />
      <label
        className="form-check-label"
        htmlFor={`${instance.id}-useEval`}>
        Execute with eval
      </label>
    </div>
  )
}

export function validate (instance) {
  return true
}
