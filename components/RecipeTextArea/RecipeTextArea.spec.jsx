import React from 'react'
import RecipeTextArea from './RecipeTextArea'
import { shallow } from 'enzyme'

describe('<RecipeTextArea />', () => {
  const setRecipeProperty = jest.fn()
  const instance = {
    id: 'instance_id',
    dummy: 'test'
  }

  const createWrapper = () => {
    setRecipeProperty.mockReset()

    return shallow(
      <RecipeTextArea
        instance={instance}
        bindTo="dummy"
        label="Dummy Label"
        placeholder="Dummy Placeholder"
        setRecipeProperty={setRecipeProperty}
        rows={99}
      />
    )
  }

  it('should not render children', () => {
    const wrapper = shallow(
      <RecipeTextArea instance={{}}>
        <div className="test"></div>
      </RecipeTextArea>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render a text area bound to the specified property', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('textarea')
    expect(textField).toHaveLength(1)
    expect(textField.props().value).toBe('test')
  })

  it('should set the placeholder of the text area', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('textarea')
    expect(textField).toHaveLength(1)
    expect(textField.props().placeholder).toBe('Dummy Placeholder')
  })

  it('should set the row count of the text area', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('textarea')
    expect(textField).toHaveLength(1)
    expect(textField.props().rows).toBe(99)
  })

  it('should create a unique ID for the text area', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('textarea')
    expect(textField).toHaveLength(1)
    expect(textField.props().id).toBe('instance_id-dummy')
  })

  it('should render a label for the text area', () => {
    const wrapper = createWrapper()
    const textField = wrapper.find('textarea')
    const label = wrapper.find('label')

    expect(label).toHaveLength(1)
    expect(label.props().htmlFor).toBe(textField.props().id)
    expect(label.text()).toBe('Dummy Label')
  })

  describe('when the input is changed', () => {
    it('should invoke `props.setRecipeProperty`', () => {
      const wrapper = createWrapper()
      const textField = wrapper.find('textarea')

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
