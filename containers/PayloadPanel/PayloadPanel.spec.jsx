import React from 'react'
import { shallow } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import PayloadPanel from './PayloadPanel'

describe('<PayloadPanel />', () => {
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
    wrapper = shallow(<PayloadPanel />, { context })
  })

  it('should map `state.cookBook` to `props`', () => {
    expect(wrapper.props().cookBook).toEqual(cookBookDouble)
  })
})
