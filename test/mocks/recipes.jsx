import React from 'react'

let DummyRecipe = {
  title: 'Dummy Recipe',
  cook: (instance, vars) => {

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
