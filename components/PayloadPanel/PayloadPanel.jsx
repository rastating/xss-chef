import './style.scss'
import React from 'react'
import * as Recipes from '~/recipes'

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
    for (let i = 0; i < this.props.cookBook.length; i++) {
      let instance = this.props.cookBook[i]
      let recipe = Recipes[instance.className]

      if (!recipe.validate(instance)) {
        return
      }

      items.push({
        instance: instance,
        recipe: recipe
      })
    }

    let exports = {
      payload: '__XSS_CHEF_ENTRY_POINT__'
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
