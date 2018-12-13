import * as actions from '~/actions/CookBook'

const cookBook = (previousState = [], action) => {
  let state = previousState

  switch (action.type) {
    case actions.COOK_BOOK_RECIPE_ADDED:
      state.push(action.payload)
      break
  }

  return state
}

export default cookBook
