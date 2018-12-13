import * as actions from './CookBook'

describe('.addRecipe', () => {
  let subject, timeDouble

  beforeAll(() => {
    timeDouble = Date.now()
    Date._now = Date.now
    Date.now = jest.fn(() => timeDouble)

    subject = actions.addRecipe('DummyRecipe')
  })

  afterAll(() => {
    Date.now = Date._now
    delete Date._now
  })

  it('should have a {type} of `COOK_BOOK_RECIPE_ADDED`', () => {
    expect(subject.type).toEqual(actions.COOK_BOOK_RECIPE_ADDED)
  })

  it('should use `className` and the current timestamp as an ID', () => {
    expect(subject.payload.id).toEqual(`DummyRecipe-${timeDouble}`)
  })

  it('should return the class name', () => {
    expect(subject.payload.className).toEqual('DummyRecipe')
  })
})

describe('.disableRecipe', () => {
  let subject

  beforeAll(() => {
    subject = actions.disableRecipe(0xdeadbeef)
  })

  it('should have a {payload.id} that matches the specified `id`', () => {
    expect(subject.payload.id).toEqual(0xdeadbeef)
  })

  it('should have a {type} of `COOK_BOOK_RECIPE_DISABLED`', () => {
    expect(subject.type).toEqual(actions.COOK_BOOK_RECIPE_DISABLED)
  })
})

describe('.updateCookBook', () => {
  let subject

  beforeAll(() => {
    subject = actions.updateCookBook([1, 2, 3])
  })

  it('should return `cookBook` as `payload`', () => {
    expect(subject.payload).toEqual([1, 2, 3])
  })

  it('should have a {type} of `COOK_BOOK_UPDATED`', () => {
    expect(subject.type).toEqual(actions.COOK_BOOK_UPDATED)
  })
})
