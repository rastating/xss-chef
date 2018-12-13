import React from 'react'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import CookBook from './CookBook'

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
})
