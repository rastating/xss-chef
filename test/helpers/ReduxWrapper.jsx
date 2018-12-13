import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '~/reducers'

const store = createStore(rootReducer)

export default (props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}
