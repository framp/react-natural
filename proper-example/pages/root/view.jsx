'use strict'
let React = require('react')
let Link = require('react-router').Link

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
        <Link to="songs">Check out some songs</Link> <br />
      </div>
    )
  }
})
