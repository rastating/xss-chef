import React from 'react'

class RecipeTextField extends React.Component {
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
        <input id={`${inputId}`}
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          value={this.props.instance[this.props.bindTo]}
          onChange={this.setRecipeProperty}
        />
      </div>
    )
  }
}

export default RecipeTextField
