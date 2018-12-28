import React from 'react'
import CookBookPanel from '~/components/CookBookPanel'
import RecipeList from '~/containers/RecipeList'
import PayloadPanel from '~/containers/PayloadPanel'
import './style.scss'

class Application extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      recipeListOpen: false
    }

    this.openRecipeList = this.openRecipeList.bind(this)
    this.renderRecipeList = this.renderRecipeList.bind(this)
  }

  openRecipeList () {
    this.setState({
      recipeListOpen: true
    })
  }

  renderRecipeList () {
    if (this.state.recipeListOpen) {
      return (<RecipeList />)
    }
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <CookBookPanel
              onAddClick={this.openRecipeList}
            />
          </div>
          <div className="col-md-4">
            <div className="title-pane">
              Output
            </div>
            <PayloadPanel />
          </div>
        </div>

        { this.renderRecipeList() }
      </div>
    )
  }
}

export default Application
