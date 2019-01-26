import React from 'react'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'

import CookBookItem from '~/components/CookBookItem'

import './style.scss'

const SortableItem = SortableElement(({ recipeId, props, isDisabled }) => (
  <CookBookItem
    id={recipeId}
    cookBook={props.cookBook}
    disableRecipe={props.disableRecipe}
    setRecipeProperty={props.setRecipeProperty}
    deleteRecipe={props.deleteRecipe}
    disabled={isDisabled}
  />
))

const SortableList = SortableContainer(({ items, props }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          recipeId={item.id}
          props={props}
          isDisabled={item.disabled}
        />
      ))}
    </ul>
  )
})

class CookBook extends React.Component {
  constructor (props) {
    super(props)
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  onSortEnd ({ oldIndex, newIndex }) {
    if (this.props.updateCookBook) {
      this.props.updateCookBook(arrayMove(
        this.props.cookBook,
        oldIndex,
        newIndex
      ))
    }
  }

  render () {
    return (
      <SortableList
        props={this.props}
        items={this.props.cookBook}
        onSortEnd={this.onSortEnd}
        useDragHandle={true}
      />
    )
  }
}

export default CookBook
