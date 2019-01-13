import './style.scss'
import React from 'react'
import * as Recipes from '~/recipes'
import * as Scripts from '~/scripts'

class PayloadPanel extends React.Component {
  constructor (props) {
    super(props)
    this.compile = this.compile.bind(this)
  }

  compile () {
    if (!this.props.cookBook) {
      return
    }

    let items = []
    let dependencies = []

    for (let i = 0; i < this.props.cookBook.length; i++) {
      let instance = this.props.cookBook[i]
      let recipe = Recipes[instance.className]

      if (!recipe.validate(instance)) {
        return
      }

      if (recipe.dependencies) {
        for (let dependency of recipe.dependencies) {
          if (!dependencies.includes(dependency)) {
            dependencies.push(dependency)
          }
        }
      }

      items.push({
        instance: instance,
        recipe: recipe
      })
    }

    let dependenciesBlock = ''
    for (let i = 0; i < dependencies.length; i++) {
      let source = Scripts[dependencies[i]].implementation
      dependenciesBlock = `${dependenciesBlock}${source}\n`
    }

    let exports = {
      payload: `${dependenciesBlock}__XSS_CHEF_ENTRY_POINT__`
    }

    for (let i = 0; i < items.length; i++) {
      let instance = items[i].instance
      let recipe = items[i].recipe
      exports = recipe.cook(instance, exports)
    }

    return exports.payload.replace(/__XSS_CHEF_.+?__/g, '')
  }

  render () {
    let payload = this.compile()
    return (
      <div className="payload-panel">
        <textarea readOnly={true} value={payload}></textarea>
      </div>
    )
  }
}

export default PayloadPanel
