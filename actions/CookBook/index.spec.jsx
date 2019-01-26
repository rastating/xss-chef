import * as actions from './index'

describe('CookBook actions roll-up', () => {
  it('should export an addRecipe function', () => {
    expect(actions.addRecipe).toBeDefined()
    expect(typeof actions.addRecipe).toBe('function')
  })

  it('should export the recipe added action constant', () => {
    expect(actions.COOK_BOOK_RECIPE_ADDED).toBeDefined()
  })

  it('should export the recipe disabled action constant', () => {
    expect(actions.COOK_BOOK_RECIPE_DISABLED).toBeDefined()
  })

  it('should export the cook book updated action constant', () => {
    expect(actions.COOK_BOOK_UPDATED).toBeDefined()
  })

  it('should export a disableRecipe function', () => {
    expect(actions.disableRecipe).toBeDefined()
    expect(typeof actions.disableRecipe).toBe('function')
  })

  it('should export a updateCookBook function', () => {
    expect(actions.updateCookBook).toBeDefined()
    expect(typeof actions.updateCookBook).toBe('function')
  })

  it('should export a setRecipeProperty function', () => {
    expect(actions.setRecipeProperty).toBeDefined()
    expect(typeof actions.setRecipeProperty).toBe('function')
  })

  it('should export the recipe property set action constant', () => {
    expect(actions.COOK_BOOK_RECIPE_PROPERTY_SET).toBeDefined()
  })

  it('should export the reset cook book action constant', () => {
    expect(actions.COOK_BOOK_RESET).toBeDefined()
  })

  it('should export a resetCookBook function', () => {
    expect(actions.resetCookBook).toBeDefined()
    expect(typeof actions.resetCookBook).toBe('function')
  })

  it('should export the delete recipe action constant', () => {
    expect(actions.COOK_BOOK_RECIPE_DELETED).toBeDefined()
  })

  it('should export a deleteRecipe function', () => {
    expect(actions.deleteRecipe).toBeDefined()
    expect(typeof actions.deleteRecipe).toBe('function')
  })
})
