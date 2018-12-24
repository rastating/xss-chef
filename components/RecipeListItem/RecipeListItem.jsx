import React from 'react'

class RecipeListItem extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (this.props.onClick) {
      this.props.onClick(this.props.className)
    }
  }

  render () {
    return (
      <div className="recipe-list-item" onClick={this.handleClick}>
        <span className="recipe-title">{this.props.title}</span>
      </div>
    )
  }
}

export default RecipeListItem
