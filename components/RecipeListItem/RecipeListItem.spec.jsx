import React from 'react'
import RecipeListItem from './RecipeListItem'
import { shallow, mount } from 'enzyme'

describe('<RecipeListItem />', () => {
  let wrapper, onClick

  beforeEach(() => {
    onClick = jest.fn()
    wrapper = shallow(
      <RecipeListItem
        title="Dummy Recipe"
        description="Dummy Desc"
        className="DummyRecipe"
        onClick={onClick}
      />
    )
  })

  it('should not render children', () => {
    const wrapper = shallow(
      <RecipeListItem>
        <div className="test"></div>
      </RecipeListItem>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render the recipe title', () => {
    const title = wrapper.find('.recipe-title')
    expect(title).toHaveLength(1)
    expect(title.text()).toEqual('Dummy Recipe')
  })

  it('should render the description', () => {
    const description = wrapper.find('.recipe-desc')
    expect(description).toHaveLength(1)
    expect(description.text()).toEqual('Dummy Desc')
  })

  describe('when the item is clicked', () => {
    it('should invoke `props.onClick` with the recipe class name', () => {
      wrapper.simulate('click')
      expect(onClick).toHaveBeenCalledWith('DummyRecipe')
    })
  })
})
