import React from 'react'
import RecipeTextField from './RecipeTextField'
import { shallow } from 'enzyme'

describe('<RecipeTextField />', () => {
  const setRecipeProperty = jest.fn()
  const instance = {
    id: 'instance_id',
    dummy: 'test'
  }

  const createWrapper = () => {
    setRecipeProperty.mockReset()

    return shallow(
      <RecipeTextField
        instance={instance}
        bindTo="dummy"
        label="Dummy Label"
        placeholder="Dummy Placeholder"
        setRecipeProperty={setRecipeProperty}
      />
    )
  }

  it('should not render children', () => {
    const wrapper = shallow(
      <RecipeTextField instance={{}}>
        <div className="test"></div>
      </RecipeTextField>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render a text field bound to the specified property', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('input[type="text"]')
    expect(textField).toHaveLength(1)
    expect(textField.props().value).toBe('test')
  })

  it('should set the placeholder of the text field', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('input[type="text"]')
    expect(textField).toHaveLength(1)
    expect(textField.props().placeholder).toBe('Dummy Placeholder')
  })

  it('should create a unique ID for the text field', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('input[type="text"]')
    expect(textField).toHaveLength(1)
    expect(textField.props().id).toBe('instance_id-dummy')
  })

  it('should render a label for the text field', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('input[type="text"]')
    const label = wrapper.find('label')

    expect(label).toHaveLength(1)
    expect(label.props().htmlFor).toBe(textField.props().id)
    expect(label.text()).toBe('Dummy Label')
  })

  describe('when the input is changed', () => {
    it('should invoke `props.setRecipeProperty`', () => {
      const wrapper = createWrapper()
      const textField = wrapper.find('input[type="text"]')

      textField.simulate('change', {
        target: {
          value: 'new value'
        }
      })

      expect(setRecipeProperty).toHaveBeenCalledWith(
        'instance_id',
        'dummy',
        'new value'
      )
    })
  })
})
