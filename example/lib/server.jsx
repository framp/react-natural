let express = require('express')
let bodyParser = require('body-parser')
'use strict'
let React = require('react')
let Router = require('react-router')
let routes = require('../routes')

let app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use((req, res, next) => {
  let router = Router.create({location: req.url, routes: routes})
  router.run((Handler, state) => {
    if (!state || !state.routes || !state.routes[0])
      return next();
    let name = state.routes[0].name
    let data = require('../pages/' + name + '/data')
    req.params = state.params
    data(req, (initialState) => {
      if (!req.accepts('html'))
        return res.send(initialState)
      let html = React.renderToString(<Handler initialState={initialState}/>)
      return res.send(
        '<html><body>' + html + 
        '<script>initialState=' + JSON.stringify(initialState) + '</script>' +
        '<script src="/app.js"></script>' +
        '</body></html>')
    });
  })
})
let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.log('Maramoja listening at http://%s:%s', host, port)
})