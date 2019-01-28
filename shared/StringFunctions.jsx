export function random (length, type = 'mixed') {
  const numeric = '0123456789'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let charset = `${numeric}${lowercase}${uppercase}`
  let string = ''

  if (type === 'numeric') {
    charset = numeric
  } else if (type === 'lowercase') {
    charset = lowercase
  } else if (type === 'uppercase') {
    charset = uppercase
  } else if (type === 'alpha') {
    charset = `${lowercase}${uppercase}`
  }

  for (let i = 0; i < length; i++) {
    string += charset[Math.floor(Math.random() * charset.length)]
  }

  return string
}

export function buildUrl (parts) {
  return parts.join('/').replace(/\/{2,}/g, '/')
}
