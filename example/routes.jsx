'use strict'
let React = require('react')
let Router = require('react-router')

let DefaultRoute = Router.DefaultRoute
let NotFoundRoute = Router.NotFoundRoute
let Route = Router.Route

module.exports = [
  <Route name="root" path="/" handler={require('./pages/root/view')}></Route>,
  <Route name="songs" path="/songs" handler={require('./pages/songs/view')}></Route>,
  <Route name="song" path="/songs/:id" handler={require('./pages/song/view')}></Route>,
  <Route name="search" path="/search" handler={require('./pages/search/view')}></Route>
] 
