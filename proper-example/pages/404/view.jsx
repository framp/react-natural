'use strict'
let React = require('react')
let Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {}
  },
  componentDidMount: function() {
    document.title = this.state.title
  },
  render: function () {
    return (
      <div>
        404 <br />
        <Link to="home">Back to home</Link>
      </div>
    )
  }
})
