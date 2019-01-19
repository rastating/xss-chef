import DefaultExport from './'
import RecipeTextField from './RecipeTextField'

it('should export the RecipeTextField class as the default export', () => {
  expect(DefaultExport).toBe(RecipeTextField)
})
