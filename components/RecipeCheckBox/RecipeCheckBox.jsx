import React from 'react'

class RecipeCheckBox extends React.Component {
  constructor (props) {
    super(props)

    this.setRecipeProperty = this.setRecipeProperty.bind(this)
  }

  setRecipeProperty (e) {
    this.props.setRecipeProperty(
      this.props.instance.id,
      this.props.bindTo,
      e.target.checked
    )
  }

  render () {
    const inputId = `${this.props.instance.id}-${this.props.bindTo}`
    return (
      <div className="float-left mr-3 form-group form-check">
        <input id={`${inputId}`}
          type="checkbox"
          checked={this.props.instance[this.props.bindTo]}
          className="form-check-input"
          onChange={this.setRecipeProperty}
        />
        <label
          className="form-check-label"
          htmlFor={`${inputId}`}>
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default RecipeCheckBox
