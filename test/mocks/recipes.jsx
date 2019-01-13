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
  init: () => {
    return { defaultValue: true }
  },
  render: (instance, setRecipeProperty) => {
    if (setRecipeProperty) {
      setRecipeProperty(instance.id, 'foo', 'bar')
    }

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

let DummyRecipe2 = {
  title: 'Dummy Recipe 2',
  cook: (instance, vars) => { return { payload: vars.payload } },
  init: () => { return { someVar: 'var' } },
  render: () => (<div />),
  validate: () => true,
  dependencies: ['AjaxRequest']
}

export { DummyRecipe }
export { DummyRecipe2 }
