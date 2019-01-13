function ajaxPost (url, data, cb) {
  var xmlHttp = new XMLHttpRequest()

  if (xmlHttp.overrideMimeType) {
    xmlHttp.overrideMimeType('text/plain; charset=x-user-defined')
  }

  xmlHttp.open('POST', url, true)

  if (cb) {
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        cb.apply(this, arguments)
      }
    }
  }

  xmlHttp.send(data)
  return xmlHttp
}

const fn = ajaxPost
const implementation = ajaxPost.toString()
export { implementation, fn }
