import * as actions from '~/actions/CookBook'

const initialState = []

const cookBook = (previousState = initialState, action) => {
  let state = previousState

  switch (action.type) {
    case actions.COOK_BOOK_RECIPE_ADDED:
      state.push(action.payload)
      break

    case actions.COOK_BOOK_UPDATED:
      state = action.payload
      break
  }

  return state
}

export default cookBook
