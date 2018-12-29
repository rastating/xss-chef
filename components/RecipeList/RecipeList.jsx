import React from 'react'
import RecipeListItem from '~/components/RecipeListItem'
import * as Recipes from '~/recipes'

class RecipeList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      recipes: []
    }

    for (let name in Recipes) {
      this.state.recipes.push({
        title: Recipes[name].title,
        description: Recipes[name].description,
        className: name
      })
    }
  }

  render () {
    return (
      <div className="recipe-list">
        {
          this.state.recipes.map(r => (
            <RecipeListItem
              key={r.className}
              title={r.title}
              description={r.description}
              className={r.className}
              onClick={this.props.addRecipe}
            />
          ))
        }
      </div>
    )
  }
}

export default RecipeList
