"use es6";

var React = require('react');
var Moment = require('moment');

var ClockFace = require('./ClockFace');

var Clock = React.createClass({

  tick: function() {
    window.requestAnimationFrame(this.tick);
  },

  componentDidMount: function() {
    this.tick();
  },

  render: function() {
    return <ClockFace date={this.props.unixtimestamp} />;
  }

});

module.exports = Clock;