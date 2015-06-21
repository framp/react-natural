'use strict'
module.exports = function(React, Router, routes, pages, Template, options) {
  options = options || {}
  options.notFound = options.notFound || function(state, next){
    next()
    return false
  }
  options.prefix = options.prefix || '/api'
  return function(req, res, next) {
    let url = req.url
    let json = false
    if (url.substr(0, options.prefix.length) === options.prefix) {
      url = url.substr(options.prefix.length)
      json = true
    }
    let router = Router.create({location: url, routes: routes})
    router.run((Handler, state) => {
      if (!state || !state.routes || 
          !state.routes[0] || !state.routes[0].name ||
          !state.routes[0].name in pages) {
        if (options.notFound(state, next) === false)
          return
      }
      let name = state.routes[0].name
      let data = pages[name]['data']
      req.params = state.params
      data(req, (initialState) => {
        if (json)
          return res.send(initialState)
        let template = React.renderToStaticMarkup(<Template initialState={initialState}/>)
        let html = template.replace('{body}', React.renderToString(<Handler initialState={initialState}/>))
        return res.send(html)
      });
    })
  }
}