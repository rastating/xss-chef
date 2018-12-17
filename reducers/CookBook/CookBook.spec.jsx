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

  describe('when the action type is COOK_BOOK_RECIPE_ADDED', () => {
    it('should replace the state with current payload', () => {
      let action = actions.updateCookBook(['new state'])
      let state = reducer(undefined, action)
      expect(state).toHaveLength(1)
      expect(state[0]).toEqual('new state')
    })
  })
})
