maramoja
========

Still nothing useful here (except this old manifesto and prototype in `/history`)

###Description

The aim of the project is to create a framework which will help you:
 - Create a minimal server which will respond to xhr and normal requests with either JSON or HTML.
 - Write a minimal client-side application which will override link and forms events with equivalent xhr requests, HTML generation from JSON and URL rewriting 

The choosen templating system should be able to run on both server and client.

It's not supposed to be an API server; a useful pattern actually consists of having:
 - An API server containing business logic
 - A frontend server which queries the API server, serves pages and cache them


The end result should be:

    GET /page 
      Server => Retrieve data, generate HTML from a template, return HTML to the client
      Client => Retrieve HTML, display HTML, override link and forms event (if JS is enabled)
    GET /page { Accept: application/json }
      Server => Retrieve data, return JSON to the client
      Client => Retrieve JSON, generate HTML from a template, display HTML, rewrite URL
  
###Advantages
  - Users without JS (and search engines) will be able to browse
  - Users with JS will waste less bandwidth
  - Users with JS won't have to refresh the page
  - All your users will see the same link when browsing a page

###Tools
  - The server stack shouldn't matter (the only adaptation required should be a react-router wrapper)
  - The templating system will be [React](http://linkedin.github.io/dustjs/)
  - The router will be [React-router](https://github.com/rackt/react-router), both on server and on client

###History
This project actually started in 2013 targeting node.js, history.js and dust.js.
Nowadays there are better alternatives out there.
