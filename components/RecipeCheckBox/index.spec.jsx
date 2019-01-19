import DefaultExport from './'
import RecipeCheckBox from './RecipeCheckBox'

it('should export the RecipeCheckBox class as the default export', () => {
  expect(DefaultExport).toBe(RecipeCheckBox)
})
