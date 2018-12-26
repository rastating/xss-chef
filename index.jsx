import 'babel-polyfill'
import './style.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import CookBookPanel from '~/components/CookBookPanel'
import RecipeList from '~/containers/RecipeList'
import PayloadPanel from '~/containers/PayloadPanel'

import rootReducer from '~/reducers'

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
          <CookBookPanel />
          <RecipeList />
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
