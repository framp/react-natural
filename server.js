'use strict';

module.exports = function (React, Router, routes, pages, Template, options) {
  options = options || {};
  options.notFound = options.notFound || function (state, next) {
    next();
    return false;
  };
  options.prefix = options.prefix || '/api';
  return function (req, res, next) {
    var url = req.url;
    var json = false;
    if (url.substr(0, options.prefix.length) === options.prefix) {
      url = url.substr(options.prefix.length);
      json = true;
    }
    var router = Router.create({ location: url, routes: routes });
    router.run(function (Handler, state) {
      if (!state || !state.routes || !state.routes[0] || !state.routes[0].name || !state.routes[0].name in pages) {
        if (options.notFound(state, next) === false) return;
      }
      var name = state.routes[0].name;
      var data = pages[name]['data'];
      req.params = state.params;
      data(req, function (initialState) {
        if (json) return res.send(initialState);
        var template = React.renderToStaticMarkup(React.createElement(Template, { initialState: initialState }));
        var html = template.replace('{body}', React.renderToString(React.createElement(Handler, { initialState: initialState })));
        return res.send(html);
      });
    });
  };
};
