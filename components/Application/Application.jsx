import React from 'react'
import CookBookPanel from '~/containers/CookBookPanel'
import RecipeListPanel from '~/components/RecipeListPanel'
import PayloadPanel from '~/containers/PayloadPanel'
import './style.scss'

class Application extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 panel-container">
            <RecipeListPanel />
          </div>
          <div className="col-md-4 panel-container">
            <CookBookPanel
              onAddClick={this.openRecipeList}
            />
          </div>
          <div className="col-md-4 panel-container">
            <div className="title-pane">
              Output
            </div>
            <PayloadPanel />
          </div>
        </div>
      </div>
    )
  }
}

export default Application
