import React from 'react'
import CookBookPanel from '~/containers/CookBookPanel'
import RecipeListPanel from '~/components/RecipeListPanel'
import PayloadPanel from '~/containers/PayloadPanel'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './style.scss'

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.displayToast = this.displayToast.bind(this)
  }

  displayToast () {
    toast.success('Payload copied to clipboard', {
      className: 'clipboard-toast',
      closeButton: false,
      position: toast.POSITION.BOTTOM_RIGHT,
      progressClassName: 'clipboard-toast-progress'
    })
  }

  render () {
    return (
      <div className="h-100">
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
              <PayloadPanel
                onPayloadCopy={this.displayToast}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default Application
