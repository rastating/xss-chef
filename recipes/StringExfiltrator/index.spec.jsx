import StringExfiltrator from './index'

describe('Default export', () => {
  it('should have a title', () => {
    expect(StringExfiltrator.title).toEqual('String Exfiltrator')
  })

  it('should have a description', () => {
    expect(StringExfiltrator.description).toBeDefined()
  })

  it('should contain a `cook` function', () => {
    expect(StringExfiltrator.cook).toBeDefined()
    expect(typeof StringExfiltrator.cook).toBe('function')
  })

  it('should contain a `render` function', () => {
    expect(StringExfiltrator.render).toBeDefined()
    expect(typeof StringExfiltrator.render).toBe('function')
  })

  it('should contain a `validate` function', () => {
    expect(StringExfiltrator.validate).toBeDefined()
    expect(typeof StringExfiltrator.validate).toBe('function')
  })

  it('should contain a `init` function', () => {
    expect(StringExfiltrator.init).toBeDefined()
    expect(typeof StringExfiltrator.init).toBe('function')
  })

  it('should declare AjaxRequest as a dependency', () => {
    expect(StringExfiltrator.dependencies).toBeDefined()
    expect(StringExfiltrator.dependencies).toContain('AjaxRequest')
  })
})
