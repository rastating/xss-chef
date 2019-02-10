import React from 'react'
import Application from './Application'
import CookBookPanel from '~/containers/CookBookPanel'
import PayloadPanel from '~/containers/PayloadPanel'
import RecipeListPanel from '~/components/RecipeListPanel'
import { shallow } from 'enzyme'

describe('<Application />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Application />)
    global.toastSuccess = jest.fn()
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
    expect(wrapper.find(CookBookPanel)).toHaveLength(1)
  })

  it('should render a <PayloadPanel />', () => {
    expect(wrapper.find(PayloadPanel)).toHaveLength(1)
  })

  it('should render a <RecipeListPanel />', () => {
    expect(wrapper.find(RecipeListPanel)).toHaveLength(1)
  })

  describe('.displayToast', () => {
    it('should display a toast to indicate the payload has been copied', () => {
      wrapper.instance().displayToast()
      expect(global.toastSuccess).toHaveBeenCalled()

      const args = global.toastSuccess.mock.calls[0]
      expect(args[0]).toBe('Payload copied to clipboard')
      expect(args[1].closeButton).toBe(false)
      expect(args[1].position).toBe('BOTTOM_RIGHT')
    })
  })
})
