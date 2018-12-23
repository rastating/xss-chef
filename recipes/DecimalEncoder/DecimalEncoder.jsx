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
    return `eval(String.fromCharCode(${encoded}))\n__XSS_CHEF_ENTRY_POINT__`
  } else {
    return `String.fromCharCode(${encoded})\n__XSS_CHEF_ENTRY_POINT__`
  }
}

export function render (instance, setRecipeProperty) {
  if (instance.useEval === undefined) {
    setRecipeProperty(instance.id, 'useEval', true)
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={instance.useEval}
        onChange={e => setRecipeProperty(
          instance.id,
          'useEval',
          e.target.checked
        )}
      />
    </div>
  )
}

export function validate (instance) {
  return true
}
