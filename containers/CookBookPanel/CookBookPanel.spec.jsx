import React from 'react'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import CookBookPanel from './CookBookPanel'

describe('<CookBookPanel />', () => {
  const cookBookDouble = []
  const store = createMockStore({
    cookBook: cookBookDouble
  })

  const context = {
    store
  }

  let wrapper
  beforeAll(() => {
    wrapper = shallow(<CookBookPanel />, { context })
  })

  it('should map `state.cookBook` to `props`', () => {
    expect(wrapper.props().cookBook).toEqual(cookBookDouble)
  })

  it('should map the resetCookBook action creator', () => {
    wrapper.props().resetCookBook()
    expect(store.isActionDispatched({
      type: 'COOK_BOOK_RESET'
    })).toBe(true)
  })
})
