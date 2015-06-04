'use strict'
let React = require('react/addons')
let Link = require('react-router').Link

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return this.props.initialState || { 
      songs: [],
      searchForm: {
        song: ''
      }
    }
  },
  render: function () {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <ul>
        { this.state.songs.map(function(song, id){
            return <li key={id}><Link to="song" params={{id: id}}>{song}</Link></li>
          }) }
        </ul>
        <form method="post" action="/search">
          <input type="text" name="song" valueLink={this.linkState('searchForm.song')} />
          <input type="submit" />
        </form>
      </div>
    )
  }
})