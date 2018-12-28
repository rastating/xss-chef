import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from '~/reducers'
import Application from '~/components/Application'

const logger = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(logger)
)

ReactDOM.render((
  <Provider store={store}>
    <Application />
  </Provider>
), document.getElementById('app'))
