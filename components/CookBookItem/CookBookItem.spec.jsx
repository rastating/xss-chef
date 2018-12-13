import React from 'react'
import { shallow } from 'enzyme'
import CookBookItem from './CookBookItem'

describe('<CookBookItem />', () => {
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

  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <CookBookItem
        cookBook={cookBookDouble}
        id="DummyRecipe-0002"
      />
    )
  })

  it('should not render children', () => {
    const wrapper = shallow(
      <CookBookItem
        cookBook={cookBookDouble}
        id="DummyRecipe-0002">

        <div className="test"></div>
      </CookBookItem>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render the recipe title', () => {
    let titleElement = wrapper.find('div.recipe-title')
    expect(titleElement).toHaveLength(1)
    expect(titleElement.text()).toEqual('Dummy Recipe')
  })

  it('should call the `render` function of the matching recipe', () => {
    let dummyElement = wrapper.find('div.recipe-content')
    expect(dummyElement).toHaveLength(1)
    expect(dummyElement.text()).toEqual('Rendered DummyRecipe-0002')
  })

  it.skip('should render a "disable" button', () => {

  })

  describe('when the disable button is clicked', () => {
    it.skip('should invoke `props.disableRecipe`', () => {
      
    })
  })

  describe('if the recipe is disabled', () => {
    it('should render the root element with the `disabled` class', () => {
      wrapper.setProps({ disabled: true })
      expect(wrapper.hasClass('disabled')).toBe(true)
    })
  })

  describe('if the recipe is not disabled', () => {
    it('should render the root element with the `enabled` class', () => {
      wrapper.setProps({ disabled: false })
      expect(wrapper.hasClass('enabled')).toBe(true)
    })
  })

  describe('if the recipe instance validates', () => {
    it('should not render the root element with the `has-error` class', () => {
      wrapper.setProps({ id: 'DummyRecipe-0002' })
      expect(wrapper.hasClass('has-error')).toBe(false)
    })
  })

  describe('if the recipe instance fails to validate', () => {
    it('should render the root element with the `has-error` class', () => {
      wrapper.setProps({ id: 'DummyRecipe-0003' })
      expect(wrapper.hasClass('has-error')).toBe(true)
    })
  })
})
