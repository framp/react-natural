'use strict'
let React = require('react/addons')

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return this.props.initialState || { 
      name: 'Unknown'
    }
  },
  render: function () {
    return (
      <div>
        Hello {this.state.name}
      </div>
    )
  }
})
