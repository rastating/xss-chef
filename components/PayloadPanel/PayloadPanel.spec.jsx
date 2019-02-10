import React from 'react'
import { shallow, mount } from 'enzyme'
import PayloadPanel from './PayloadPanel'

describe('<PayloadPanel />', () => {
  const cookBookDouble = [{
    id: 'DummyRecipe_0001',
    className: 'DummyRecipe',
    exports: { recipe1: true }
  }, {
    id: 'DummyRecipe_0002',
    className: 'DummyRecipe2',
    disabled: true,
    exports: { recipe2: true }
  }, {
    id: 'DummyRecipe_0003',
    className: 'DummyRecipe',
    exports: { recipe3: true }
  }]

  let wrapper, onPayloadCopy

  beforeEach(() => {
    document.execCommand = jest.fn()
    global.cookCallback = jest.fn()
    onPayloadCopy = jest.fn()

    wrapper = mount(
      <PayloadPanel
        cookBook={cookBookDouble}
        onPayloadCopy={onPayloadCopy}
      />
    )
  })

  afterAll(() => {
    delete global.cookCallback
  })

  it('should not render children', () => {
    const wrapper = shallow(
      <PayloadPanel cookBook={cookBookDouble}>
        <div className="test"></div>
      </PayloadPanel>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render a copy button', () => {
    expect(wrapper.find('FontAwesomeIcon.copy-to-clipboard')).toHaveLength(1)
  })

  describe('if all items in `props.cookBook` are valid', () => {
    it('should call the `cook` method of each enabled recipe in `props.cookBook`', () => {
      expect(global.cookCallback).toHaveBeenCalledTimes(2)
    })

    describe('when multiple recipes are present', () => {
      it('should invoke `cook` with the `vars` returned from the previous recipe', () => {
        expect(global.cookCallback).toHaveBeenNthCalledWith(1, cookBookDouble[0], {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        })

        expect(global.cookCallback).toHaveBeenNthCalledWith(2, cookBookDouble[2], {
          payload: 'Cooked DummyRecipe_0001',
          recipe1: true
        })
      })
    })

    it('should render the final payload as text', () => {
      expect(wrapper.find('textarea').props().value).toEqual(
        'Cooked DummyRecipe_0001 DummyRecipe_0003'
      )
    })
  })

  describe('if any item in `props.cookBok` is invalid', () => {
    it('should not call the `cook` method of any recipe', () => {
      const cookBookDouble = [{
        id: 'DummyRecipe_0001',
        className: 'DummyRecipe'
      }, {
        id: 'DummyRecipe_0002',
        className: 'DummyRecipe'
      }, {
        id: 'DummyRecipe_0003',
        className: 'DummyRecipe',
        valid: false
      }]

      global.cookCallback = jest.fn()
      wrapper = shallow(
        <PayloadPanel cookBook={cookBookDouble} />
      )

      expect(global.cookCallback).toHaveBeenCalledTimes(0)
    })
  })

  describe('if one or more recipes have dependencies', () => {
    it('should include a single copy of each dependency in the final payload', () => {
      const cookBook = [{
        id: 'DummyRecipe_0001',
        className: 'DummyRecipe2',
        exports: { recipe1: true }
      }, {
        id: 'DummyRecipe_0002',
        className: 'DummyRecipe2',
        exports: { recipe2: true }
      }, {
        id: 'DummyRecipe_0003',
        className: 'DummyRecipe2',
        exports: { recipe3: true }
      }]

      const wrapper = shallow(
        <PayloadPanel cookBook={cookBook} />
      )

      const payload = wrapper.find('textarea').props().value
      const functionCount = (payload.match(/function ajaxRequest/g) || []).length
      expect(functionCount).toEqual(1)
    })
  })

  describe('if an item is disabled', () => {
    it('should not render its dependency blocks', () => {
      expect(wrapper.find('textarea').props().value).toEqual(
        expect.not.stringContaining('function ajaxRequest')
      )
    })

    it('should not cook the recipe into the final payload', () => {
      expect(wrapper.find('textarea').props().value).toEqual(
        'Cooked DummyRecipe_0001 DummyRecipe_0003'
      )
    })
  })

  describe('when the copy button is clicked', () => {
    it('should execute the `copy` command', () => {
      const button = wrapper.find('FontAwesomeIcon.copy-to-clipboard')
      button.simulate('click')
      expect(document.execCommand).toHaveBeenCalledWith('copy')
    })

    it('should invoke `props.onPayloadCopy`', () => {
      expect(onPayloadCopy).not.toHaveBeenCalled()
      const button = wrapper.find('FontAwesomeIcon.copy-to-clipboard')
      button.simulate('click')
      expect(onPayloadCopy).toHaveBeenCalled()
    })
  })
})
