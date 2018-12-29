import DecimalEncoder from './index'

describe('Default export', () => {
  it('should have a title', () => {
    expect(DecimalEncoder.title).toEqual('Decimal Encoder')
  })

  it('should have a description', () => {
    expect(DecimalEncoder.description).toBeDefined()
  })

  it('should contain a `cook` function', () => {
    expect(DecimalEncoder.cook).toBeDefined()
    expect(typeof DecimalEncoder.cook).toBe('function')
  })

  it('should contain a `render` function', () => {
    expect(DecimalEncoder.render).toBeDefined()
    expect(typeof DecimalEncoder.render).toBe('function')
  })

  it('should contain a `validate` function', () => {
    expect(DecimalEncoder.validate).toBeDefined()
    expect(typeof DecimalEncoder.validate).toBe('function')
  })

  it('should contain a `init` function', () => {
    expect(DecimalEncoder.init).toBeDefined()
    expect(typeof DecimalEncoder.init).toBe('function')
  })
})
