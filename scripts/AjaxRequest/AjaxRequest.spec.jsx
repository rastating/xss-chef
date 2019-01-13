import { implementation, fn } from './AjaxRequest'

const originalXHR = window.XMLHttpRequest
let mockXHR

beforeEach(() => {
  mockXHR = {
    open: jest.fn(),
    overrideMimeType: jest.fn(),
    send: jest.fn()
  }
  window.XMLHttpRequest = jest.fn(() => mockXHR)
})

afterEach(() => {
  window.XMLHttpRequest = originalXHR
})

it('should name the function ajaxRequest', () => {
  expect(implementation).toMatch(/function ajaxRequest/)
})

describe('if XMLHttpRequest supports .overrideMimeType', () => {
  it('should set the MIME type to text/plain', () => {
    fn()
    expect(mockXHR.overrideMimeType).toHaveBeenCalledWith(
      'text/plain; charset=x-user-defined'
    )
  })
})

it('should open the asynchronous XHR using the specified method', () => {
  fn('POST', 'http://127.0.0.1', 'foo=bar')
  expect(mockXHR.open).toHaveBeenCalledWith(
    'POST', 'http://127.0.0.1', true
  )

  fn('GET', 'http://127.0.0.1/2')
  expect(mockXHR.open).toHaveBeenCalledWith(
    'GET', 'http://127.0.0.1/2', true
  )
})

it('should send the specified `data` using XHR', () => {
  fn('POST', 'http://127.0.0.1', 'foo=bar')
  expect(mockXHR.send).toHaveBeenCalledWith('foo=bar')
})

describe('if a callback is specified', () => {
  describe('when .onreadystatechange is invoked', () => {
    describe('if `readyState` === 4', () => {
      it('should invoke the callback', () => {
        return new Promise((resolve, reject) => {
          fn('POST', 'http://127.0.0.1', 'foo=bar', () => {
            resolve()
          })

          mockXHR.readyState = 4
          mockXHR.onreadystatechange()
        })
      })
    })

    describe('if `readyState` !== 4', () => {
      it('should not invoke the callback', () => {
        return new Promise((resolve, reject) => {
          fn('POST', 'http://127.0.0.1', 'foo=bar', () => {
            reject(new Error('invoked callback'))
          })

          mockXHR.readyState = 3
          mockXHR.onreadystatechange()

          setTimeout(() => {
            resolve()
          }, 500)
        })
      })
    })
  })
})
