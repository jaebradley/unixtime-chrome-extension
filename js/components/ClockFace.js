var React = require('react');
var Moment = require('moment');

var ClockFace = React.createClass({

  transform: function(str) {
    return { transform: str };
  },

  rotate: function(deg) {
    return 'rotate(' + deg + 'deg)';
  },

  render: function() {
    var day = Moment(this.props.unixtimestamp);
    var millis = day.millisecond();
    var second = day.second() * 6 + millis * (6 / 1000);
    var minute = day.minute() * 6 + second / 60;
    var hour = ((day.hour() % 12) / 12) * 360 + 90 + minute / 12;

    return (
      <div className="clock">
        <div className="face">
          <div className="second" style={this.transform(this.rotate(second))} />
          <div className="hour" style={this.transform(this.rotate(hour))} />
          <div className="minute" style={this.transform(this.rotate(minute))} />
        </div>
      </div>
    );
  }
});

module.exports = ClockFace;