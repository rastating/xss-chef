import React from 'react'
import CookBookPanel from './CookBookPanel'
import { shallow } from 'enzyme'

describe('<CookBookPanel />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CookBookPanel />)
  })

  it('should not render children', () => {
    const wrapper = shallow(
      <CookBookPanel>
        <div className="test"></div>
      </CookBookPanel>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render the panel title', () => {
    const title = wrapper.find('div.title-pane')
    expect(title).toHaveLength(1)
    expect(title.find('span.title').text()).toEqual('Cook Book')
  })

  it('should render a button to add new recipes', () => {
    const button = wrapper.find('.cook-book-action.add-recipe')
    expect(button).toHaveLength(1)
  })

  it('should render a button to reset the cook book', () => {
    const button = wrapper.find('.cook-book-action.reset-cook-book')
    expect(button).toHaveLength(1)
  })
})
