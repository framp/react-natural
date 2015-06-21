React Natural
========

The simplest framework to build your isomorphic application.

Standing on the shoulders of giants like [React](http://facebook.github.io/react/) and [React Router](https://github.com/rackt/react-router), React Natural gives you a simple set of conventions to build your application.

##How to start
Head over to [React Natural Starter](http://github.com/framp/React Natural-starter/)!

##Library description
Looking to fiddle around?
That's great, don't forget to open a PR when you're done!

###Server
The Server side generates a [express](https://github.com/strongloop/express) middleware which resolves `routes` using the data contained in `pages` and the `Template`.

    function(React, Router, routes, pages, Template. options)
    > React: React object
    > Router: React Router object
    > routes: Array or Route object which can be used with ReactRouter.run
    > pages: Object containing the tree of pages data script
      > pages[page]['data']: data function
    > Template: Template React component used to wrap pages
    > options: Object containing settings
      > options.prefix: URL prefix used to send and retrieve data to the server via XHR
                        defaults to: '/api'
    returns an express middleware(req, res, next)
  };

###Client
The Client attach a function to `DOMContentLoaded` which creates an istance of `React Router` with HTML5 pushState support enabled, using `routes`.
At every change of route the 

    function(routes, options)
    > routes: Array or Route object which can be used with ReactRouter.run
    > options: Object containing settings
      > options.error: function executed when we can't retrieve information from the server
                       defaults to: location.reload()


##TODO
- Let the user override client rendering and fetching
- Expand the API to cache data retrieved from the server

##Coffee
Feel free to refill my cup with a [click](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BDPUGENG892JA) and keep me awake working on Open Source Projects.
Also, if you're looking for a contractor in London, [drop me a line](mailto:hi@framp.me).

##License
MIT