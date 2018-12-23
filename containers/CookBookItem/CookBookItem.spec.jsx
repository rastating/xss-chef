import React from 'react'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import CookBookItem from './CookBookItem'

describe('<CookBookItem />', () => {
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
    wrapper = shallow(<CookBookItem id="DummyRecipe-0001" />, { context })
  })

  it('should map `state.cookBook` to `props`', () => {
    expect(wrapper.props().cookBook).toEqual(cookBookDouble)
  })

  it('should map the disableRecipe action creator', () => {
    wrapper.dive().instance().disableRecipe(0xdeadbeef)
    expect(store.isActionDispatched({
      type: 'COOK_BOOK_RECIPE_DISABLED',
      payload: {
        id: 0xdeadbeef
      }
    })).toBe(true)
  })

  it('should map the setRecipeProperty action creator', () => {
    expect(store.isActionDispatched({
      type: 'COOK_BOOK_RECIPE_PROPERTY_SET',
      payload: {
        id: 'DummyRecipe-0001',
        key: 'foo',
        value: 'bar'
      }
    })).toBe(true)
  })
})
