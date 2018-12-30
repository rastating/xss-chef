import React from 'react'
import CookBook from '~/containers/CookBook'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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
        <CookBook />
      </div>
    )
  }
}

export default CookBookPanel
