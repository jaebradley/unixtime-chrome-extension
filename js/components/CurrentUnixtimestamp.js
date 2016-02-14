"use es6";

var React = require('react');
var Moment = require('moment');

var UnixtimeRetriever = React.createClass({
  setTime: function() {
    this.setState({
      unixtimestamp: Moment().unix()
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
        {this.state.unixtimestamp}
      </div>
      )
  }
});

module.exports = UnixtimeRetriever;