'use strict'
let React = require('react')
let Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return this.props.initialState || { 
      name: 'Unknown'
    }
  },
  render: function () {
    return (
      <div>
        Hello {this.state.name} <br />
        <Link to="songs">Check out some songs</Link> <br />
        
        <video autoPlay loop>
          <source src="/isomorphic-javascript.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }
})
