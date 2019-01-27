import { cook, init, render, validate } from './LinkHijacker'
import { shallow } from 'enzyme'

describe('LinkHijacker', () => {
  const vars = {
    payload: '__XSS_CHEF_ENTRY_POINT__'
  }

  describe('.cook', () => {
    it('should replace all links with the specified url', () => {
      const payload = cook({ url: 'http://127.0.0.1' }, vars).payload
      expect(payload).toEqual(
        expect.stringContaining(`a.href = 'http://127.0.0.1'`)
      )
    })

    it('should escape user specified single quotes', () => {
      const payload = cook({ url: `'test'` }, vars).payload
      expect(payload).toEqual(
        expect.stringContaining(`a.href = '\\'test\\''`)
      )
    })

    it('should escape user specified backslashes', () => {
      const payload = cook({ url: `\\\\` }, vars).payload
      expect(payload).toEqual(
        expect.stringContaining(`a.href = '\\\\\\\\'`)
      )
    })

    it('should place the next entry point at the end of the payload', () => {
      const payload = cook({ url: 'http://127.0.0.1' }, vars).payload
      expect(payload).toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
    })
  })

  describe('.init', () => {
    it('should define {url}', () => {
      expect(init().url).toBeDefined()
    })
  })

  describe('.render', () => {
    const setRecipeProperty = jest.fn()

    it('should render a RecipeTextField for the new URL`', () => {
      const instance = { url: 'http://127.0.0.1' }
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="url"]')

      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'url',
        instance: instance,
        label: 'New URL',
        placeholder: 'Example: http://your.domain.com/',
        setRecipeProperty: setRecipeProperty
      })
    })
  })

  describe('.validate', () => {
    it('should return false if a url is not specified', () => {
      expect(validate({ url: '' })).toBe(false)
    })

    it('should return true if a url is specified', () => {
      expect(validate({ url: 'http://127.0.0.1' })).toBe(true)
    })
  })
})
