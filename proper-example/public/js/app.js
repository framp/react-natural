(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'
let React = (window.React)
let Router = (window.ReactRouter)

require('whatwg-fetch')

module.exports = function(routes, options) {
  options = options || {}
  options.error = options.error || function(err){
    location.reload()
  }
  options.prefix = options.prefix || '/api'
  
  document.addEventListener('DOMContentLoaded', function() { 
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
      let container = document.body
      if (initialState) {
        React.render(React.createElement(Handler, {initialState: initialState}), container)
        initialState = null
        return
      }
      fetch(options.prefix + state.path, {
        method: state.data.method ? state.data.method : 'GET',
        body: state.data.body ? JSON.stringify(state.data.body) : null
      }).then(function(response) {
        return response.json()
      }).then(function(json) {
        React.render(React.createElement(Handler, {initialState: json}), container)
      }).catch(options.error)
    })
  })
}

},{"whatwg-fetch":2}],2:[function(require,module,exports){
(function() {
  'use strict';

  if (self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = name.toString();
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = value.toString();
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(url, options) {
    options = options || {}
    this.url = url

    this.credentials = options.credentials || 'omit'
    this.headers = new Headers(options.headers)
    this.method = normalizeMethod(options.method || 'GET')
    this.mode = options.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(options.body)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit)
    this.type = 'default'
    this.url = null
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    // TODO: Request constructor should accept input, init
    var request
    if (Request.prototype.isPrototypeOf(input) && !init) {
      request = input
    } else {
      request = new Request(input, init)
    }

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      xhr.onload = function() {
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})();

},{}],3:[function(require,module,exports){
'use strict'
let client = require('../client')
let routes = require('./routes')

client(routes)

},{"../client":1,"./routes":8}],4:[function(require,module,exports){
'use strict'
let React = (window.React)
let Link = (window.ReactRouter).Link

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return this.props.initialState || { 
      name: 'Unknown'
    }
  },
  componentDidMount: function() {
    document.title = this.state.title
  },
  render: function () {
    return (
      React.createElement("div", null, 
        "Hello ", this.state.name, " ", React.createElement("br", null), 
        React.createElement(Link, {to: "songs"}, "Check out some songs"), " ", React.createElement("br", null)
      )
    )
  }
})

},{}],5:[function(require,module,exports){
'use strict'
let React = (window.React)
let Link = (window.ReactRouter).Link

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return this.props.initialState || { 
      search: 'Unknown',
      songs: []
    }
  },
  componentDidMount: function() {
    document.title = this.state.title
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Results for ", this.state.search, ":"), 
        React.createElement("ul", null, 
         this.state.songs.map(function(song, id){
            return React.createElement("li", {key: id}, React.createElement(Link, {to: "song", params: {id: id}}, song))
          }) 
        ), 
        React.createElement(Link, {to: "songs"}, "Back to songs")
      )
    )
  }
})

},{}],6:[function(require,module,exports){
'use strict'
let React = (window.React)
let Link = (window.ReactRouter).Link

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return this.props.initialState || { 
      song: 'Unknown'
    }
  },
  componentDidMount: function() {
    document.title = this.state.title
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, this.state.song), 
        React.createElement(Link, {to: "songs"}, "Back to songs")
      )
    )
  }
})

},{}],7:[function(require,module,exports){
'use strict'
let React = (window.React)
let Link = (window.ReactRouter).Link
let Form = (window.ReactRouterForm)

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return this.props.initialState || { 
      songs: [],
      searchForm: {
        song: ''
      }
    }
  },
  componentDidMount: function() {
    document.title = this.state.title
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, this.state.title), 
        React.createElement("ul", null, 
         this.state.songs.map(function(song, id){
            return React.createElement("li", {key: id}, React.createElement(Link, {to: "song", params: {id: id}}, song))
          }) 
        ), 
        React.createElement(Form, {method: "POST", to: "search"}, 
          React.createElement("input", {type: "text", name: "search"}), 
          React.createElement("input", {type: "submit"})
        )
      )
    )
  }
})

},{}],8:[function(require,module,exports){
'use strict'
let React = (window.React)
let Router = (window.ReactRouter)

let DefaultRoute = Router.DefaultRoute
let NotFoundRoute = Router.NotFoundRoute
let Route = Router.Route

module.exports = [
  React.createElement(Route, {name: "root", path: "/", handler: require('./pages/root/view')}),
  React.createElement(Route, {name: "songs", path: "/songs", handler: require('./pages/songs/view')}),
  React.createElement(Route, {name: "song", path: "/songs/:id", handler: require('./pages/song/view')}),
  React.createElement(Route, {name: "search", path: "/search", handler: require('./pages/search/view')})
] 

},{"./pages/root/view":4,"./pages/search/view":5,"./pages/song/view":6,"./pages/songs/view":7}]},{},[3]);
