import React from 'react'
import CookBook from '~/containers/CookBook'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

class CookBookPanel extends React.Component {
  render () {
    return (
      <div>
        <div className="title-pane">
          <span className="title">Cook Book</span>
          <div className="float-right d-inline">
            <FontAwesomeIcon
              className="cook-book-action reset-cook-book"
              icon={faTrashAlt}
              onClick={this.props.resetCookBook}
            />
          </div>
        </div>
        <div className="panel-content">
          <CookBook />
        </div>
      </div>
    )
  }
}

export default CookBookPanel
