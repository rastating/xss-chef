import React from 'react'
import Application from './Application'
import PayloadPanel from '~/containers/PayloadPanel'
import RecipeList from '~/containers/RecipeList'
import { shallow } from 'enzyme'

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
    expect(wrapper.find(PayloadPanel)).toHaveLength(1)
  })

  describe('when the `CookBookPanel.onAddClick` event is fired', () => {
    it('should render a <RecipeList />', () => {
      expect(wrapper.find(RecipeList)).toHaveLength(0)
      wrapper.find('CookBookPanel').simulate('addClick')
      expect(wrapper.find(RecipeList)).toHaveLength(1)
    })
  })
})
