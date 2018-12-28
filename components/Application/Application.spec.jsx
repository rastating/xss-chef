import React from 'react'
import Application from './Application'
import ReduxWrapper from '~/test/helpers/ReduxWrapper'
import RecipeList from '~/containers/RecipeList'
import { shallow, mount } from 'enzyme'

describe('<Application />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Application />)
  })

  it('should not render children', () => {
    const wrapper = shallow(
      <Application>
        <div className="test"></div>
      </Application>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render a <CookBookPanel />', () => {
    expect(wrapper.find('CookBookPanel')).toHaveLength(1)
  })

  it('should render a <PayloadPanel />', () => {
    expect(wrapper.find('Connect(PayloadPanel)')).toHaveLength(1)
  })

  describe('when the `CookBookPanel.onAddClick` event is fired', () => {
    it('should set `state.recipeListOpen` to `true`', () => {
      expect(wrapper.state().recipeListOpen).toBe(false)
      wrapper.find('CookBookPanel').simulate('addClick')
      expect(wrapper.state().recipeListOpen).toBe(true)
    })
  })

  describe('when `state.recipeListOpen` is `true`', () => {
    it('should render a <RecipeList />', () => {
      wrapper.setState({ recipeListOpen: false })
      wrapper.update()
      expect(wrapper.find('Connect(RecipeList)')).toHaveLength(0)

      wrapper.setState({ recipeListOpen: true })
      wrapper.update()
      expect(wrapper.find('Connect(RecipeList)')).toHaveLength(1)
    })
  })
})
