import React from 'react'
import RecipeList from '~/containers/RecipeList'

class RecipeListPanel extends React.Component {
  render () {
    return (
      <div>
        <div className="title-pane">
          <span className="title">Recipes</span>
        </div>
        <RecipeList />
      </div>
    )
  }
}

export default RecipeListPanel
