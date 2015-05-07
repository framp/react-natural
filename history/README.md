maramoja
========

Still nothing useful here (except this little prototype in `/example`)

###Description

The aim of the project is to create a framework which will help you:
 - Create a minimal server which will respond to xhr and normal requests with either JSON or HTML.
 - Write a minimal client-side application which will override link and forms events with equivalent xhr requests, HTML generation from JSON and URL rewriting 

The choosen templating system should be able to run on both server and client.


The end result should be:

    GET /page 
      Server => Retrieve data, generate HTML from a template, return HTML to the client
      Client => Retrieve HTML, display HTML, override link and forms event (if JS is enabled)
    GET /page     
    X-Requested-With: XMLHttpRequest
      Server => Retrieve data, return JSON to the client
      Client => Retrieve JSON, generate HTML from a template, display HTML, rewrite URL
  
###Advantages
  - Users without JS (and search engines) will be able to browse
  - Users with JS will waste less bandwidth
  - Users with JS won't have to refresh the page
  - All your users will see the same link when browsing a page

###Tools
  - The server will be based on [node.js](http://nodejs.org/) and [express.js](http://expressjs.com).
  - The client side will use [History.js](https://github.com/browserstate/history.js)
  - The templating system will be [dust.js](http://linkedin.github.io/dustjs/)

###Show us something!
Want to check out an example?

Head over to `/example`, `npm install && grunt && npm start`, `open http://localhost:3000/songs`
