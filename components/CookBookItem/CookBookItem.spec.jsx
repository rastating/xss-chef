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

  let wrapper, disableRecipe

  beforeEach(() => {
    disableRecipe = jest.fn()
    wrapper = shallow(
      <CookBookItem
        cookBook={cookBookDouble}
        disableRecipe={disableRecipe}
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
    let titleElement = wrapper.find('div.recipe-title span')
    expect(titleElement).toHaveLength(1)
    expect(titleElement.text()).toEqual('Dummy Recipe')
  })

  it('should call the `render` function of the matching recipe', () => {
    let dummyElement = wrapper.find('div.recipe-content')
    expect(dummyElement).toHaveLength(1)
    expect(dummyElement.text()).toEqual('Rendered DummyRecipe-0002')
  })

  it('should render a "disable" button', () => {
    const button = wrapper.find('.recipe-title FontAwesomeIcon')
    expect(button).toHaveLength(1)
  })

  describe('when the disable button is clicked', () => {
    it('should invoke `props.disableRecipe`', () => {
      wrapper.find('.recipe-title FontAwesomeIcon').simulate('click')
      expect(disableRecipe).toHaveBeenCalledWith('DummyRecipe-0002')
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
