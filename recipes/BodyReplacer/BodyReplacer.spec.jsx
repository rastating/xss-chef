import { shallow } from 'enzyme'
import { cook, render, validate, init } from './BodyReplacer'

describe('BodyReplacer', () => {
  describe('.cook', () => {
    const vars = {
      payload: '__XSS_CHEF_ENTRY_POINT__'
    }

    it('should contain code to overwrite document.body.innerHTML', () => {
      const payload = cook({
        markup: `test`
      }, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `document.body.innerHTML = 'test'`
        )
      )
    })

    it('should escape any single quotes in the specified markup', () => {
      const payload = cook({
        markup: `<strong>'test'</strong>`
      }, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `<strong>\\'test\\'</strong>`
        )
      )
    })

    it('should escape back slashes in the specified markup', () => {
      const payload = cook({
        markup: `<strong>\\</strong>`
      }, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `<strong>\\\\</strong>`
        )
      )
    })

    it('should place the next entry point at the end of the payload', () => {
      const payload = cook({
        markup: `test`
      }, vars).payload

      expect(payload).toMatch(/__XSS_CHEF_ENTRY_POINT__$/)
    })
  })

  describe('.init', () => {
    it('should define {markup}', () => {
      expect(init().markup).toBeDefined()
    })
  })

  describe('.render', () => {
    const setRecipeProperty = jest.fn()
    const instance = {
      id: 'instance_id',
      markup: 'test'
    }

    it('should render a RecipeTextArea for the markup', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textArea = wrapper.find('RecipeTextArea')
      expect(textArea).toHaveLength(1)
      expect(textArea.props().instance).toBe(instance)
      expect(textArea.props().placeholder).toBe('Example: <strong>Replacement markup</strong>')
      expect(textArea.props().rows).toEqual(10)
      expect(textArea.props().bindTo).toBe('markup')
      expect(textArea.props().setRecipeProperty).toBe(setRecipeProperty)
      expect(textArea.props().label).toBe('Markup')
    })
  })

  describe('.validate', () => {
    it('should return false if no markup is specified', () => {
      expect(validate({ markup: '' })).toBe(false)
    })

    it('should return true if valid', () => {
      expect(validate({ markup: 'test' })).toBe(true)
    })
  })
})
