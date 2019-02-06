import React from 'react'
import CookBookPanel from '~/containers/CookBookPanel'
import RecipeListPanel from '~/components/RecipeListPanel'
import PayloadPanel from '~/containers/PayloadPanel'
import './style.scss'

class Application extends React.Component {
  constructor(props, context) {
  super(props, context);
  this.onClick = () => { this.child.copyToClipboard() }
}

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
            <div>
              <div className="title-pane">
                Output
                <button className="copy-button" onClick={this.onClick}>Copy Payload</button>
              </div>
              <PayloadPanel onRef={ref => (this.child = ref)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Application
