import React from 'react'
import CookBookPanel from './CookBookPanel'
import { shallow } from 'enzyme'

describe('<CookBookPanel />', () => {
  let wrapper, onAddClick, onResetClick

  beforeEach(() => {
    onAddClick = jest.fn()
    onResetClick = jest.fn()
    wrapper = shallow(
      <CookBookPanel
        onAddClick={onAddClick}
        onResetClick={onResetClick}
      />
    )
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

  it('should render a button to reset the cook book', () => {
    const button = wrapper.find('.cook-book-action.reset-cook-book')
    expect(button).toHaveLength(1)
  })

  describe('when the reset button is clicked', () => {
    it('should invoke `props.onResetClick`', () => {
      const button = wrapper.find('.reset-cook-book')
      button.simulate('click')
      expect(onResetClick).toHaveBeenCalledTimes(1)
    })
  })
})
