import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import * as Recipes from '~/recipes'
import './style.scss'

const DragHandle = SortableHandle(() => (<span className="handler"></span>))

class CookBookItem extends React.Component {
  constructor (props) {
    super(props)

    this.loadItem = this.loadItem.bind(this)
    this.getStateClassName = this.getStateClassName.bind(this)
    this.disableRecipe = this.disableRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  loadItem () {
    if (!this.props.cookBook || !this.props.id) {
      return {}
    }

    let item = this.props.cookBook.find(i => i.id === this.props.id)

    return {
      recipe: Recipes[item.className],
      instance: item
    }
  }

  getStateClassName (isValid) {
    if (this.props.disabled) {
      return 'disabled'
    } else if (!isValid) {
      return 'has-error'
    } else {
      return 'enabled'
    }
  }

  disableRecipe () {
    if (this.props.disableRecipe) {
      this.props.disableRecipe(this.props.id)
    }
  }

  deleteRecipe () {
    if (this.props.deleteRecipe) {
      this.props.deleteRecipe(this.props.id)
    }
  }

  render () {
    let item = this.loadItem()
    let recipe = item.recipe
    let instance = item.instance
    let isValid = recipe && recipe.validate(instance)

    return (
      <li className={`cook-book-item ${this.getStateClassName(isValid)}`}>
        <DragHandle />
        <div className="recipe-item">
          <div className="recipe-title">
            <span className="float-left">
              { recipe.title }
            </span>
            <FontAwesomeIcon
              id="delete"
              icon={faTrashAlt}
              className="float-right"
              onClick={this.deleteRecipe}
            />
            <FontAwesomeIcon
              id="disable"
              icon={faBan}
              className="float-right"
              onClick={this.disableRecipe}
            />
          </div>

          { recipe.render(instance, this.props.setRecipeProperty) }
        </div>
      </li>
    )
  }
}

export default CookBookItem
