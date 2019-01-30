import { cook, init, render, validate } from './Alert'
import { shallow } from 'enzyme'

describe('Alert', () => {
  const vars = {
    payload: '__XSS_CHEF_ENTRY_POINT__'
  }

  describe('.cook', () => {
    it('should escape single quotes in the message', () => {
      const payload = cook({ message: `'test'` }, vars).payload
      expect(payload).toEqual(
        expect.stringContaining(`\\'test\\'`)
      )
    })

    it('should escape backslashes in the message', () => {
      const payload = cook({ message: `\\test` }, vars).payload
      expect(payload).toEqual(
        expect.stringContaining(`\\\\test`)
      )
    })

    it('should generate a call to `alert`', () => {
      const payload = cook({ message: `test` }, vars).payload
      expect(payload).toEqual(
        expect.stringContaining(`alert('test')`)
      )
    })

    it('should place the next entry point at the end of the payload', () => {
      const payload = cook({ message: `test` }, vars).payload
      expect(payload).toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
    })
  })

  describe('.init', () => {
    it('should define {message}', () => {
      expect(init().message).toBeDefined()
    })
  })

  describe('.render', () => {
    const setRecipeProperty = jest.fn()

    it('should render a RecipeTextField for the message`', () => {
      const instance = { message: 'test' }
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="message"]')

      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'message',
        instance: instance,
        label: 'Message',
        placeholder: '',
        setRecipeProperty: setRecipeProperty
      })
    })
  })

  describe('.validate', () => {
    it('should return `true`', () => {
      expect(validate()).toBe(true)
    })
  })
})
