import React from 'react'

class RecipeTextArea extends React.Component {
  constructor (props) {
    super(props)

    this.setRecipeProperty = this.setRecipeProperty.bind(this)
  }

  setRecipeProperty (e) {
    this.props.setRecipeProperty(
      this.props.instance.id,
      this.props.bindTo,
      e.target.value
    )
  }

  render () {
    const inputId = `${this.props.instance.id}-${this.props.bindTo}`
    return (
      <div className="form-group">
        <label htmlFor={`${inputId}`}>{this.props.label}</label>
        <textarea id={`${inputId}`}
          rows={this.props.rows}
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.setRecipeProperty}
          value={this.props.instance[this.props.bindTo]}
        />
      </div>
    )
  }
}

export default RecipeTextArea
