import React from 'react'
import RecipeList from '~/containers/RecipeList'

class RecipeListPanel extends React.Component {
  render () {
    return (
      <div>
        <div className="title-pane">
          <span className="title">Recipes</span>
        </div>
        <div className="panel-content">
          <RecipeList />
        </div>
      </div>
    )
  }
}

export default RecipeListPanel
