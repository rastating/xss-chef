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

  describe('when the action type is COOK_BOOK_RECIPE_PROPERTY_SET', () => {
    it('should update the specified item to contain the given property', () => {
      let initialState = [{
        id: 'DummyRecipe-002'
      }, {
        id: 'DummyRecipe-001'
      }, {
        id: 'DummyRecipe-003'
      }]

      let action = actions.setRecipeProperty('DummyRecipe-001', 'foo', 'bar')
      let state = reducer(initialState, action)

      expect(state[0].foo).toBeUndefined()
      expect(state[1].foo).toBeDefined()
      expect(state[2].foo).toBeUndefined()
    })
  })
})
