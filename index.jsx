import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import CookBook from '~/containers/CookBook'
import rootReducer from '~/reducers'

const logger = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(logger)
)

ReactDOM.render((
  <Provider store={store}>
    <div>
      <CookBook />
    </div>
  </Provider>
), document.getElementById('app'))
