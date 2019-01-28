import { buildUrl, random } from './StringFunctions'

describe('StringFunctions', () => {
  describe('.random', () => {
    describe('if `type` is not specified', () => {
      it('should return `length` chars from a mixed charset', () => {
        for (let i = 0; i < 1000; i++) {
          expect(random(32)).toMatch(/^[a-zA-Z0-9]{32}$/)
        }
      })
    })

    describe('if `type` is `numeric`', () => {
      it('should return `length` chars from a numeric charset', () => {
        for (let i = 0; i < 1000; i++) {
          expect(random(32, 'numeric')).toMatch(/^[0-9]{32}$/)
        }
      })
    })

    describe('if `type` is `lowercase`', () => {
      it('should return `length` chars from a lowercase alpha charset', () => {
        for (let i = 0; i < 1000; i++) {
          expect(random(32, 'lowercase')).toMatch(/^[a-z]{32}$/)
        }
      })
    })

    describe('if `type` is `uppercase`', () => {
      it('should return `length` chars from an uppercase alpha charset', () => {
        for (let i = 0; i < 1000; i++) {
          expect(random(32, 'uppercase')).toMatch(/^[A-Z]{32}$/)
        }
      })
    })

    describe('if `type` is `alpha`', () => {
      it('should return `length` chars from a lower and uppercase alpha charset', () => {
        for (let i = 0; i < 1000; i++) {
          expect(random(32, 'alpha')).toMatch(/^[A-Za-z]{32}$/)
        }
      })
    })
  })

  describe('.buildUrl', () => {
    it('should join all parts without duplicate slashes', () => {
      expect(buildUrl(['/foo', '/bar'])).toBe('/foo/bar')
      expect(buildUrl(['/foo/', '/bar'])).toBe('/foo/bar')
      expect(buildUrl(['/foo/', 'bar'])).toBe('/foo/bar')
      expect(buildUrl(['foo/', '/bar'])).toBe('foo/bar')
    })
  })
})
