import React from 'react'
import RecipeList from './RecipeList'
import { shallow, mount } from 'enzyme'

describe('<RecipeList />', () => {
  let wrapper, addRecipe

  beforeEach(() => {
    addRecipe = jest.fn()
    wrapper = mount(
      <RecipeList addRecipe={addRecipe} />
    )
  })

  it('should not render children', () => {
    const wrapper = shallow(
      <RecipeList>
        <div className="test"></div>
      </RecipeList>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render a <RecipeListItem /> for each available recipe', () => {
    const items = wrapper.find('RecipeListItem')
    expect(items).toHaveLength(2)
  })

  describe('when a RecipeListItem is clicked', () => {
    it('should invoke `props.addRecipe`', () => {
      wrapper.find('RecipeListItem').at(0).simulate('click')
      expect(addRecipe).toHaveBeenCalledWith('DummyRecipe')
    })
  })
})
