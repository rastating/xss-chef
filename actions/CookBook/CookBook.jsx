export const COOK_BOOK_RECIPE_ADDED = 'COOK_BOOK_RECIPE_ADDED'
export const COOK_BOOK_RECIPE_DISABLED = 'COOK_BOOK_RECIPE_DISABLED'
export const COOK_BOOK_UPDATED = 'COOK_BOOK_UPDATED'
export const COOK_BOOK_RECIPE_PROPERTY_SET = 'COOK_BOOK_RECIPE_PROPERTY_SET'
export const COOK_BOOK_RESET = 'COOK_BOOK_RESET'

export function addRecipe (className) {
  return {
    type: COOK_BOOK_RECIPE_ADDED,
    payload: {
      id: `${className}-${Date.now()}`,
      className: className
    }
  }
}

export function disableRecipe (id) {
  return {
    type: COOK_BOOK_RECIPE_DISABLED,
    payload: {
      id: id
    }
  }
}

export function updateCookBook (cookBook) {
  return {
    type: COOK_BOOK_UPDATED,
    payload: cookBook
  }
}

export function setRecipeProperty (id, key, value) {
  return {
    type: COOK_BOOK_RECIPE_PROPERTY_SET,
    payload: {
      id: id,
      key: key,
      value: value
    }
  }
}

export function resetCookBook () {
  return {
    type: COOK_BOOK_RESET
  }
}
