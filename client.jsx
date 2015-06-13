'use strict'
let React = require('react')
let Router = require('react-router')

require('whatwg-fetch')

module.exports = function(routes, options) {
  options = options || {}
  options.error = options.error || function(err){
    location.reload()
  }
  
  document.addEventListener('DOMContentLoaded', function() { 
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
      let container = document.body
      if (initialState) {
        React.render(<Handler initialState={initialState}/>, container)
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
        React.render(<Handler initialState={json}/>, container)
      }).catch(options.error)
    })
  })
}