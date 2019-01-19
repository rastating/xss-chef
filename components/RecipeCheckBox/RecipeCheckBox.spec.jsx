import React from 'react'
import RecipeCheckBox from './RecipeCheckBox'
import { shallow } from 'enzyme'

describe('<RecipeCheckBox />', () => {
  const setRecipeProperty = jest.fn()
  const instance = {
    id: 'instance_id',
    dummy: true
  }

  const createWrapper = () => {
    setRecipeProperty.mockReset()

    return shallow(
      <RecipeCheckBox
        instance={instance}
        bindTo="dummy"
        label="Dummy Label"
        setRecipeProperty={setRecipeProperty}
      />
    )
  }

  it('should not render children', () => {
    const wrapper = shallow(
      <RecipeCheckBox instance={{}}>
        <div className="test"></div>
      </RecipeCheckBox>
    )

    expect(wrapper.find('div.test')).toHaveLength(0)
  })

  it('should render a check box field bound to the specified property', () => {
    const wrapper = createWrapper()
    const field = wrapper.find('input[type="checkbox"]')
    expect(field).toHaveLength(1)
    expect(field.props().checked).toBe(true)
  })

  it('should create a unique ID for the field', () => {
    const wrapper = createWrapper()
    const field = wrapper.find('input[type="checkbox"]')
    expect(field).toHaveLength(1)
    expect(field.props().id).toBe('instance_id-dummy')
  })

  it('should render a label for the field', () => {
    const wrapper = createWrapper()
    const field = wrapper.find('input[type="checkbox"]')
    const label = wrapper.find('label')

    expect(label).toHaveLength(1)
    expect(label.props().htmlFor).toBe(field.props().id)
    expect(label.text()).toBe('Dummy Label')
  })

  describe('when the input is changed', () => {
    it('should invoke `props.setRecipeProperty`', () => {
      const wrapper = createWrapper()
      const field = wrapper.find('input[type="checkbox"]')

      field.simulate('change', {
        target: {
          checked: true
        }
      })

      expect(setRecipeProperty).toHaveBeenCalledWith(
        'instance_id',
        'dummy',
        true
      )
    })
  })
})
