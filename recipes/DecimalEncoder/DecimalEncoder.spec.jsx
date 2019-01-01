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
      ).payload

      expect(payload).toMatch(
        /^102,117,110,99,116,105,111,110,32,40,120,41,32,123,32,120,40,41,59,32,32,125,40,41/
      )
    })

    it('should place the entry point placeholder after the encoded payload', () => {
      let payload = cook(instance, { payload: payloadSample }).payload
      expect(payload).toMatch(/\n__XSS_CHEF_ENTRY_POINT__$/)
    })

    describe('if `instance.useEval` is truthy', () => {
      it('should use the `eval` function to invoke the encoded payload', () => {
        let payload = cook(
          Object.assign({}, instance, { useEval: true }),
          { payload: payloadSample }
        ).payload

        expect(payload).toMatch(
          /^eval\(String\.fromCharCode\(102,117,110,99,116,105,111,110,32,40,120,41,32,123,32,120,40,41,59,32,32,125,40,41\)\)/
        )
      })
    })

    describe('if `instance.decode` is truthy', () => {
      it('should use `String.fromCharCode` to decode the payload', () => {
        let payload = cook(
          Object.assign({}, instance, { decode: true }),
          { payload: payloadSample }
        ).payload

        expect(payload).toMatch(
          /^String\.fromCharCode\(102,117,110,99,116,105,111,110,32,40,120,41,32,123,32,120,40,41,59,32,32,125,40,41\)/
        )
      })
    })
  })

  describe('.render', () => {
    it('should render a checkbox bound to `instance.useEval`', () => {
      const createWrapper = (useEval) => shallow(
        render(
          Object.assign({}, instance, { useEval: useEval }),
          jest.fn()
        )
      )

      let checkBox = createWrapper(false)
        .find('input[type="checkbox"]')
        .findWhere(e => e.props().id.match(/.+?-useEval/))

      expect(checkBox).toHaveLength(1)
      expect(checkBox.props().checked).toBe(false)

      checkBox = createWrapper(true)
        .find('input[type="checkbox"]')
        .findWhere(e => e.props().id.match(/.+?-useEval/))

      expect(checkBox).toHaveLength(1)
      expect(checkBox.props().checked).toBe(true)
    })

    it('should render a checkbox bound to `instance.decode`', () => {
      const createWrapper = (decode) => shallow(
        render(
          Object.assign({}, instance, { decode: decode }),
          jest.fn()
        )
      )

      let checkBox = createWrapper(false)
        .find('input[type="checkbox"]')
        .findWhere(e => e.props().id.match(/.+?-decode/))

      expect(checkBox).toHaveLength(1)
      expect(checkBox.props().checked).toBe(false)

      checkBox = createWrapper(true)
        .find('input[type="checkbox"]')
        .findWhere(e => e.props().id.match(/.+?-decode/))

      expect(checkBox).toHaveLength(1)
      expect(checkBox.props().checked).toBe(true)
    })

    describe('when the decode checkbox changes value', () => {
      it('should set `decode`', () => {
        const setRecipeProperty = jest.fn()
        const wrapper = shallow(render(instance, setRecipeProperty))
        const checkBox = wrapper
          .find('input[type="checkbox"]')
          .findWhere(e => e.props().id.match(/.+?-decode/))

        let event = {
          target: {
            checked: true
          }
        }

        checkBox.simulate('change', event)
        expect(setRecipeProperty).toHaveBeenLastCalledWith(
          'DummyTest-001',
          'decode',
          true
        )

        event.target.checked = false
        checkBox.simulate('change', event)
        expect(setRecipeProperty).toHaveBeenLastCalledWith(
          'DummyTest-001',
          'decode',
          false
        )
      })
    })

    describe('when the eval checkbox changes value', () => {
      it('should set `useEval`', () => {
        const setRecipeProperty = jest.fn()
        const wrapper = shallow(render(instance, setRecipeProperty))
        const checkBox = wrapper
          .find('input[type="checkbox"]')
          .findWhere(e => e.props().id.match(/.+?-useEval/))

        let event = {
          target: {
            checked: true
          }
        }

        checkBox.simulate('change', event)
        expect(setRecipeProperty).toHaveBeenLastCalledWith(
          'DummyTest-001',
          'useEval',
          true
        )

        event.target.checked = false
        checkBox.simulate('change', event)
        expect(setRecipeProperty).toHaveBeenLastCalledWith(
          'DummyTest-001',
          'useEval',
          false
        )
      })

      describe('if the checkbox was checked', () => {
        it('should set `decode` to `true`', () => {
          const setRecipeProperty = jest.fn()
          const wrapper = shallow(render(instance, setRecipeProperty))
          const checkBox = wrapper
            .find('input[type="checkbox"]')
            .findWhere(e => e.props().id.match(/.+?-useEval/))

          let event = {
            target: {
              checked: false
            }
          }

          checkBox.simulate('change', event)
          expect(setRecipeProperty).not.toHaveBeenCalledWith(
            'DummyTest-001',
            'decode',
            true
          )

          event.target.checked = true
          checkBox.simulate('change', event)
          expect(setRecipeProperty).toHaveBeenCalledWith(
            'DummyTest-001',
            'decode',
            true
          )
        })
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

    it('should define `decode` as `true`', () => {
      expect(init().decode).toBe(true)
    })
  })
})
