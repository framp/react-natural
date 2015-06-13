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