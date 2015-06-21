'use strict'
let express = require('express')
let bodyParser = require('body-parser')
let requireDirectory = require('node-require-directory')
let React = require('react')
let Router = require('react-router')

let server = require('../server').bind(0, React, Router)

let routes = require('./routes')
let pages = requireDirectory('./pages')
let Template = require('./template')

let app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(server(routes, pages, Template))
app.listen(process.env.PORT || 3000, () => {
  console.log('Server started')
})