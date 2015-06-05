'use strict'
let React = require('react')
let Link = require('react-router').Link
let Form = require('react-router-form')

module.exports = React.createClass({
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
        <Form method="POST" to="search">
          <input type="text" name="search" />
          <input type="submit" />
        </Form>
      </div>
    )
  }
})