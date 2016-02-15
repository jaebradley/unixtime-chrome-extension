"use es6";

var React = require('react');
var Moment = require('moment');

var Clock = require('./Clock');

var CurrentUnixtimestamp = React.createClass({
  setTime: function() {
    var unixtimestamp = Moment().unix();
    this.setState({
      unixtimestamp: unixtimestamp
    });
  },

  componentWillMount: function() {
    this.setTime();
  },

  componentDidMount: function() {
    window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  },

  render: function() {
    return (
      <div>
        <Clock 
          unixtimestamp={this.state.unixtimestamp}
        />
        <div className = "timestamp">
          {this.state.unixtimestamp}
        </div>
      </div>
      )
  }
});

module.exports = CurrentUnixtimestamp;