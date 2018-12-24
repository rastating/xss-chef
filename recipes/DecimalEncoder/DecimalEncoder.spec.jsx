import { shallow } from 'enzyme'
import { cook, render, validate, init } from './DecimalEncoder'

describe('DecimalEncoder', () => {
  const payloadSample = 'function (x) { x(); __XSS_CHEF_ENTRY_POINT__ }()'
  const instance = {
    id: 'DummyTest-001',
    className: 'DummyTest'
  }

  describe('.cook', () => {
    it('should remove any placeholders and encode the payload', () => {
      let payload = cook(
        Object.assign({}, instance, { useEval: false }),
        { payload: payloadSample }
      )

      expect(payload).toMatch(
        /String\.fromCharCode\(102,117,110,99,116,105,111,110,32,40,120,41,32,123,32,120,40,41,59,32,32,125,40,41\)/
      )
    })

    it('should place the entry point placeholder after the encoded payload', () => {
      let payload = cook(instance, { payload: payloadSample })
      expect(payload).toMatch(/\n__XSS_CHEF_ENTRY_POINT__$/)
    })

    describe('if `instance.useEval` is truthy', () => {
      it('should use the `eval` function to invoke the encoded payload', () => {
        let payload = cook(
          Object.assign({}, instance, { useEval: true }),
          { payload: payloadSample }
        )

        expect(payload).toMatch(
          /eval\(String\.fromCharCode\(102,117,110,99,116,105,111,110,32,40,120,41,32,123,32,120,40,41,59,32,32,125,40,41\)\)/
        )
      })
    })
  })

  describe('.render', () => {
    it('should render a checkbox to enable the use of eval', () => {
      const wrapper = shallow(render(instance, jest.fn()))
      expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1)
    })

    describe('when the checkbox changes value', () => {
      it('should call `setRecipeProperty`', () => {
        const setRecipeProperty = jest.fn()
        const wrapper = shallow(render(instance, setRecipeProperty))

        let event = {
          target: {
            checked: true
          }
        }

        wrapper.find('input').simulate('change', event)
        expect(setRecipeProperty).toHaveBeenLastCalledWith(
          'DummyTest-001',
          'useEval',
          true
        )

        event.target.checked = false
        wrapper.find('input').simulate('change', event)
        expect(setRecipeProperty).toHaveBeenLastCalledWith(
          'DummyTest-001',
          'useEval',
          false
        )
      })
    })
  })

  describe('.validate', () => {
    it('should return true', () => {
      expect(validate(instance)).toBe(true)
    })
  })

  describe('.init', () => {
    it('should define `useEval` as `true`', () => {
      expect(init().useEval).toBe(true)
    })
  })
})
