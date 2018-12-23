import * as actions from '~/actions/CookBook'

const initialState = []

const cookBook = (previousState = initialState, action) => {
  let state = previousState
  let payload = action.payload

  switch (action.type) {
    case actions.COOK_BOOK_RECIPE_ADDED:
      state.push(payload)
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
