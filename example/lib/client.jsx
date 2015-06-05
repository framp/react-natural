'use strict'
let React = require('react')
let Router = require('react-router')
let routes = require('../routes')

require('whatwg-fetch')

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  if (initialState) {
    React.render(<Handler initialState={initialState}/>, document.body)
    initialState = null
    return
  }
  fetch(state.path, {
    method: state.data.method ? state.data.method : 'GET',
    body: state.data.body ? JSON.stringify(state.data.body) : null,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    React.render(<Handler initialState={json}/>, document.body)
  }).catch(function(ex) {
    console.log('Error while retrieving data', ex)
  })
})
