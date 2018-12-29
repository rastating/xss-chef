import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

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
      <div className="d-flex recipe-list-item" onClick={this.handleClick}>
        <div className="flex-grow-1 meta">
          <div className="recipe-title">{this.props.title}</div>
          <div className="recipe-desc">{this.props.description}</div>
        </div>
        <div>
          <FontAwesomeIcon
            className="btn-add-recipe"
            icon={faPlusCircle}
          />
        </div>
      </div>
    )
  }
}

export default RecipeListItem
