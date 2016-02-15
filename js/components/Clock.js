"use es6";

var React = require('react');
var Moment = require('moment');

var ClockFace = require('./ClockFace');

var Clock = React.createClass({

  start: function() {
    var self = this;
    (function tick() {
      window.requestAnimationFrame(tick);
    }());
  },

  componentDidMount: function() {
    this.start();
  },

  render: function() {
    return <ClockFace date={this.props.unixtimestamp} />;
  }

});

module.exports = Clock;