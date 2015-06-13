'use strict'
module.exports = function(React, Router, routes, pages, Template) {
  return function(req, res, next) {
    let router = Router.create({location: req.url, routes: routes})
    router.run((Handler, state) => {
      if (!state || !state.routes || 
          !state.routes[0] || !state.routes[0].name ||
          !state.routes[0].name in pages)
        return next();
      let name = state.routes[0].name
      let data = pages[name]['data']
      req.params = state.params
      data(req, (initialState) => {
        if (!req.accepts('html'))
          return res.send(initialState)
        let template = React.renderToStaticMarkup(<Template initialState={initialState}/>)
        let html = template.replace('{body}', React.renderToString(<Handler initialState={initialState}/>))
        return res.send(html)
      });
    })
  }
}