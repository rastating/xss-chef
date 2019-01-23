import DefaultExport from './'
import RecipeTextArea from './RecipeTextArea'

it('should export the RecipeTextArea class as the default export', () => {
  expect(DefaultExport).toBe(RecipeTextArea)
})
