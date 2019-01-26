import React from 'react'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import CookBook from './CookBook'

describe('<CookBook />', () => {
  const cookBookDouble = [{
    id: 'DummyRecipe-0001',
    className: 'DummyRecipe'
  }, {
    id: 'DummyRecipe-0002',
    className: 'DummyRecipe'
  }, {
    id: 'DummyRecipe-0003',
    className: 'DummyRecipe',
    valid: false
  }]

  const store = createMockStore({
    cookBook: cookBookDouble
  })

  const context = {
    store
  }

  let wrapper
  beforeAll(() => {
    wrapper = shallow(<CookBook />, { context })
  })

  it('should map `state.cookBook` to `props`', () => {
    expect(wrapper.props().cookBook).toEqual(cookBookDouble)
  })

  it('should map the updateCookBook action creator', () => {
    wrapper.dive().instance().onSortEnd(0, 1)
    expect(store.isActionDispatched({
      type: 'COOK_BOOK_UPDATED',
      payload: cookBookDouble
    })).toBe(true)
  })

  it('should map the disableRecipe action creator', () => {
    wrapper.props().disableRecipe('DummyId')
    expect(store.isActionDispatched({
      type: 'COOK_BOOK_RECIPE_DISABLED',
      payload: { id: 'DummyId' }
    }))
  })

  it('should map the setRecipeProperty action creator', () => {
    wrapper.props().setRecipeProperty('DummyId', 'key', 'value')
    expect(store.isActionDispatched({
      type: 'COOK_BOOK_RECIPE_PROPERTY_SET',
      payload: {
        id: 'DummyId',
        key: 'key',
        value: 'value'
      }
    }))
  })

  it('should map the deleteRecipe action creator', () => {
    wrapper.props().deleteRecipe('DummyId')
    expect(store.isActionDispatched({
      type: 'COOK_BOOK_RECIPE_DELETED',
      payload: { id: 'DummyId' }
    }))
  })
})
