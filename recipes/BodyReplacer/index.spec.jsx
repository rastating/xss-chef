import Recipe from './index'

describe('Default export', () => {
  it('should have a title', () => {
    expect(Recipe.title).toBe('Body Replacer')
  })

  it('should have a description', () => {
    expect(Recipe.description).toBeDefined()
  })

  it('should contain a `cook` function', () => {
    expect(Recipe.cook).toBeDefined()
    expect(typeof Recipe.cook).toBe('function')
  })

  it('should contain a `render` function', () => {
    expect(Recipe.render).toBeDefined()
    expect(typeof Recipe.render).toBe('function')
  })

  it('should contain a `validate` function', () => {
    expect(Recipe.validate).toBeDefined()
    expect(typeof Recipe.validate).toBe('function')
  })

  it('should contain a `init` function', () => {
    expect(Recipe.init).toBeDefined()
    expect(typeof Recipe.init).toBe('function')
  })
})
