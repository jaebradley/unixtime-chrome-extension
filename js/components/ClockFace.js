"use es6";

var React = require('react');
var Moment = require('moment');

var ClockFace = React.createClass({

  transform: function(str) {
    return { transform: str };
  },

  rotate: function(deg) {
    return 'rotate(' + deg + 'deg)';
  },

  returnValues: function(unixtimestamp) {
    var day = Moment(this.props.unixtimestamp);
    const millis = day.millisecond();
    const second = day.second() * 6 + millis * (6 / 1000);
    const minute = day.minute() * 6 + second / 60;
    const hour = ((day.hour() % 12) / 12) * 360 + 90 + minute / 12;

    return {
      millis: millis,
      second: second,
      minute: minute,
      hour: hour
    }
  },

  render: function() {
    var values = this.returnValues(this.props.unixtimestamp);
    return (
      <div className="clock">
        <div className="face">
          <div className="second" style={this.transform(this.rotate(values.second))} />
          <div className="hour" style={this.transform(this.rotate(values.hour))} />
          <div className="minute" style={this.transform(this.rotate(values.minute))} />
        </div>
      </div>
    );
  }
});

module.exports = ClockFace;