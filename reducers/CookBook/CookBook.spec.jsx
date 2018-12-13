import reducer from './CookBook'
import * as actions from '~/actions/CookBook'

describe('CookBook reducer', () => {
  it('should return an empty array as the initial state', () => {
    expect(Array.isArray(reducer(undefined, {}))).toBe(true)
  })

  describe('when the action type is COOK_BOOK_ADD_RECIPE', () => {
    it('should append a new item to the state', () => {
      let action = actions.addRecipe('DummyClass')
      let state = reducer(undefined, action)
      expect(state).toHaveLength(1)
    })
  })
})
