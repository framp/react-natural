'use strict'
let React = require('react')
let Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return this.props.initialState || { 
      search: 'Unknown',
      songs: []
    }
  },
  render: function () {
    return (
      <div>
        <h2>Results for {this.state.search}:</h2>
        <ul>
        { this.state.songs.map(function(song, id){
            return <li key={id}><Link to="song" params={{id: id}}>{song}</Link></li>
          }) }
        </ul>
        <Link to="songs">Back to songs</Link>
      </div>
    )
  }
})
 
