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
          <source src="https://video-lhr3-1.xx.fbcdn.net/hvideo-xta1/v/t42.3356-2/11301721_10205687863369895_658175490_n.mp4/video-1433283652.mp4.mp4?vabr=349920&oh=c0f12a9469798b90d2be9966ebf95adc&oe=55712E0A&dl=1" type="video/mp4" />
        </video>
      </div>
    )
  }
})
