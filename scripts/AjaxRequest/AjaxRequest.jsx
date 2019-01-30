function ajaxRequest (method, url, data, cb) {
  var xmlHttp = new XMLHttpRequest()

  if (xmlHttp.overrideMimeType) {
    xmlHttp.overrideMimeType('text/plain; charset=x-user-defined')
  }

  xmlHttp.open(method, url, true)

  if (cb) {
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        cb(xmlHttp)
      }
    }
  }

  xmlHttp.send(data)
  return xmlHttp
}

const fn = ajaxRequest
const implementation = `
function ajaxRequest (method, url, data, cb) {
  var xmlHttp = new XMLHttpRequest()

  if (xmlHttp.overrideMimeType) {
    xmlHttp.overrideMimeType('text/plain; charset=x-user-defined')
  }

  xmlHttp.open(method, url, true)

  if (cb) {
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        cb(xmlHttp)
      }
    }
  }

  xmlHttp.send(data)
  return xmlHttp
}`

export { implementation, fn }
