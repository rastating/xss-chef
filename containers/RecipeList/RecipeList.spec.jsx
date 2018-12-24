import React from 'react'
import { shallow, mount } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import RecipeList from './RecipeList'

describe('<RecipeList />', () => {
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
    wrapper = shallow(<RecipeList />, { context })
  })

  it('should map `state.cookBook` to `props`', () => {
    expect(wrapper.props().cookBook).toEqual(cookBookDouble)
  })

  it('should map the addRecipe action creator', () => {
    wrapper = mount(<RecipeList />, { context })
    wrapper.update()
    wrapper.find('RecipeListItem').at(0).simulate('click')
    expect(store.isActionTypeDispatched('COOK_BOOK_RECIPE_ADDED')).toBe(true)
  })
})
