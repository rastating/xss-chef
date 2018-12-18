import React from 'react'

let DummyRecipe = {
  title: 'Dummy Recipe',
  cook: (instance, vars) => {
    if (global.cookCallback) {
      global.cookCallback(instance, vars)
    }

    return Object.assign({}, instance.exports, {
      payload: `${vars.payload.replace('__XSS_CHEF_ENTRY_POINT__', 'Cooked')} ${instance.id}`.trim()
    })
  },
  render: (instance) => {
    return (
      <div className="recipe-content">
        Rendered {instance.id}
      </div>
    )
  },
  validate: (instance) => {
    return instance.valid !== false
  }
}

export { DummyRecipe }
