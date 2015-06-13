react-natural
========

The simplest framework to build your isomorphic application.

Standing on the shoulders of giants like [React](http://facebook.github.io/react/) and [React-Router](https://github.com/rackt/react-router), react-natural gives you a simple set of conventions to build your application.

##How to start
Simply clone the official starter project and install dependencies:

    git clone https://github.com/framp/react-natural-starter.git #TODO move proper-example to this repo
    npm install
    #TODO add file watcher and automatic reloader

Congratulations, you're now running an isomorphic application!

In order to customize your application you can add a `page` and a `route` to the system.

##Adding a page
Create a new directory in `./pages/new-route` containing `data.js` and `view.jsx`.
`data.js` is a function run on the server which return data or execute an action.
It accepts a [express](https://github.com/strongloop/express) request object and a callback, which has to be called with the data you want to return to the client.

    module.exports = function(req, next){
      next({
        title: 'New Route',
        name: req.body.name || 'framp'
      })
    } 

You can use `data.js` to communicate with an API server (where the business logic live). Check out our [REST-ful example]( https://github.com/framp/react-natural-starter) *WIP* for a production-ready example.
react-natural server and client are strictly coupled: it's not a good idea to put your business logic here.

`view.jsx` is a simple React component which is used to render the page, both on the server and on the client.

    'use strict'
    let React = require('react')
    let Link = require('react-router').Link
    let Form = require('react-router-form')

    module.exports = React.createClass({
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
          <div>
            Hello {this.state.name} <br />
            <Form method="POST" to="search">
              My name is: <input type="text" name="name" /> <input type="submit" />
            </Form>
            <Link to="root">Back to home</Link>
          </div>
        )
      }
    })

We can use `Link` and `Form` elements to interact with user - exactly like you do with the boring `<a>` and `<form>` from HTML.
They just have a little bit of Ajax magic which makes everything refresh-less.

##Adding a route

After declaring your page, you probably want to see what you did.

Edit the `routes.jsx` file and add your `new-route` to the application.
These routes will be run both on server and on the browser.

    module.exports = [
      <Route name="root" path="/" handler={require('./pages/root/view')}></Route>,
      <Route name="new-route" path="/new-route" handler={require('./pages/new-route/view')}></Route>,
    ]
    
Take a look at the React Router [documentation](http://rackt.github.io/react-router/) for more information.

##Changing <head> template

To generate everything but body of your application we define another React component.

Edit `template.jsx` and edit the template inserting everything you need.

    'use strict'
    let React = require('react')

    module.exports = React.createClass({
      getInitialState: function() {
        return this.props.initialState || {}
      },
      render: function () {
        return (
          <html>
            <head>
              <title>{this.state.title}</title>
              <script src="https://fb.me/react-0.13.3.min.js"></script>
              <script dangerouslySetInnerHTML={{
                __html: 'if (!window.React) { document.write(\'<script src="/js/react-0.13.3.min.js"><\' + \'/script>\'); }'
              }} />
              <script src="/js/react-router-custom.js"></script>
              <script dangerouslySetInnerHTML={{
                __html: 'initialState=' + JSON.stringify(this.state)
              }} />
              <script src="/js/app.js"></script>
            </head>
            <body>
              {'{body}'}
            </body>
          </html>
        )
      }
    })

You just have to respect 2 rules:

  - Don't touch the body (or React will complain)
  - Don't remove the pre-existing scripts (or you'll lose your client-side React)
  
The `{'{body}'}` string will be replaced with the components defined in your pages


##Advanced edits
Every react-natural application has 2 fundamental entrypoints:

 - `clients.jsx`: is a light wrapper on the client implementation `react-natural` provides.
 - `server.jsx`: is an express application which uses the server middleware provided by `react-natural`

When designing this framework the goal was to create something ready-made and still easy to edit.

If you want to add server side routes you can simply edit `server.jsx` following [express](https://github.com/strongloop/express) documentation.

If you want to edit `react-natural` middleware, [create your own](https://github.com/framp/react-natural/blob/master/server.jsx) and use it in your `server.jsx`.

The `react-natural` middleware generator has the signature:

    function(React, Router, routes, pages, Template. options)
    > React: React object
    > Router: ReactRouter object
    > routes: Array or Route object which can be used with ReactRouter.run
    > pages: Object containing the tree of pages data script
      > pages[page][data]: data function
    > Template: Template React component used to wrap pages
    #TODO: add options (error handling?)

If you want to change the client implementation, [create your own](https://github.com/framp/react-natural/blob/master/client.jsx) and use it in your `client.jsx`.

The `react-natural` client generator has the signature:

    function(routes, options)
    > routes: Array or Route object which can be used with ReactRouter.run
    > options: Object containing settings
      > options.error: function executed when we can't retrieve information from the server
                       defaults to: function(){ location.reload() }

##License
MIT

