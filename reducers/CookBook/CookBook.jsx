import * as actions from '~/actions/CookBook'
import * as recipes from '~/recipes'

const initialState = []

const cookBook = (previousState = initialState, action) => {
  let state = Object.assign([], previousState)
  let payload = action.payload

  switch (action.type) {
    case actions.COOK_BOOK_RECIPE_ADDED:
      state.push(Object.assign({}, payload, recipes[payload.className].init()))
      break

    case actions.COOK_BOOK_UPDATED:
      state = payload
      break

    case actions.COOK_BOOK_RECIPE_PROPERTY_SET:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === payload.id) {
          state[i][payload.key] = payload.value
          break
        }
      }
      break
  }

  return state
}

export default cookBook
