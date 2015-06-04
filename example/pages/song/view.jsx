'use strict'
let React = require('react/addons')
let Link = require('react-router').Link

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return this.props.initialState || { 
      song: 'Unknown'
    }
  },
  render: function () {
    return (
      <div>
        <h2>{this.state.song}</h2>
        <Link to="songs">Back to songs</Link>
      </div>
    )
  }
})
 
