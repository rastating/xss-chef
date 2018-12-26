import 'babel-polyfill'
import './style.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import CookBook from '~/containers/CookBook'
import RecipeList from '~/containers/RecipeList'
import PayloadPanel from '~/containers/PayloadPanel'

import rootReducer from '~/reducers'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const logger = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(logger)
)

ReactDOM.render((
  <Provider store={store}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="title-pane">
            Cook Book
            <div className="float-right d-inline">
              <FontAwesomeIcon
                className="cook-book-action"
                icon={faPlusCircle}
              />

              <FontAwesomeIcon
                className="cook-book-action"
                icon={faTrashAlt}
              />
            </div>
          </div>
          <RecipeList />
          <CookBook />
        </div>
        <div className="col-md-4">
          <div className="title-pane">
            Output
          </div>
          <PayloadPanel />
        </div>
      </div>
    </div>
  </Provider>
), document.getElementById('app'))
