import React from 'react'
import RecipeListPanel from './RecipeListPanel'
import RecipeList from '~/containers/RecipeList'
import { shallow } from 'enzyme'

describe('<RecipeListPanel />', () => {
  it('should not render children', () => {
    const wrapper = shallow(
      <RecipeListPanel>
        <div className="test" />
      </RecipeListPanel>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render the panel title', () => {
    const wrapper = shallow(<RecipeListPanel />)
    const title = wrapper.find('.title-pane .title')
    expect(title).toHaveLength(1)
    expect(title.text()).toEqual('Recipes')
  })

  it('should render a <RecipeList />', () => {
    const wrapper = shallow(<RecipeListPanel />)
    expect(wrapper.find(RecipeList)).toHaveLength(1)
  })
})
