"use es6";

var React = require('react');
var Moment = require('moment');
var Calendar = require('react-input-calendar');
var Select = require('react-select');
var Clipboard = require('react-copy-to-clipboard');
var ConversionConstants = require('../constants/ConversionConstants');


var Conversion = React.createClass({
  getInitialState: function() {
    var unixtimestamp = Moment().unix();
    return {
      date: Moment.unix(unixtimestamp).format('MM/DD/YYYY'),
      hour: null,
      timeOfDay: null,
      minute: null,
      second: null,
      unixtimestamp: null
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  onHourChange: function(obj) {
    this.setState({
      hour: obj.value
    });
    this.calculateConversionToUnixtimestamp();
  },

  onMinuteChange: function(obj) {
    this.setState({
      minute: obj.value
    });
    this.calculateConversionToUnixtimestamp();
  },

  onSecondChange: function(obj) {
    this.setState({
      second: obj.value
    });
    this.calculateConversionToUnixtimestamp();
  },

  onTimeOfDayChange: function(obj) {
    this.setState({
      timeOfDay: obj.value
    });

    this.calculateConversionToUnixtimestamp();
  },

  getDateTimeString: function() {
    return this.state.date + '/' + this.state.hour + '/' + this.state.minute + '/' + this.state.second + '/' + this.state.timeOfDay;
  },

  calculateConversionToUnixtimestamp: function() {
    if (this.state.hour != null && this.state.timeOfDay != null && this.state.minute != null && this.state.second != null) {
      var dateTime = Moment(this.getDateTimeString(), 'MM/DD/YYYY/hh/mm/ss/A');
      this.setState({
        unixtimestamp: dateTime.unix()
      });
    }
  },

  onUnixtimestampToDateTimeChange: function(e) {
    var dateTime = Moment.unix(e.target.value);
    this.setState({
      date: dateTime.format('MM/DD/YYYY'),
      hour: Number(dateTime.format('hh')),
      timeOfDay: dateTime.format('A'),
      minute: dateTime.minute(),
      second: dateTime.second(),
      unixtimestamp: Number(e.target.value)
    });
  },

  render: function() {
    if (this.state.unixtimestamp != null) {
      var dateTime = Moment.unix(this.state.unixtimestamp).format("MM/DD/YYYY hh:mm:ss A");
      var unixtimestamp = this.state.unixtimestamp;
    } else {
      var unixtimestamp = "No unix timestamp";
      var dateTime = "No date time";
    }
    
    return (
      <div>
        <Calendar
          format="MM/DD/YYYY"
          date={this.state.date}
        />
        <div onChange={this.calculateConversionToUnixtimestamp}>
          <Select
            className="hours"
            name="hour"
            options={ConversionConstants.HOURS}
            placeholder={"Hour"}
            value={this.state.hour}
            onChange={this.onHourChange}
          />
          <Select
            className="timeOfDay"
            name="timeOfDay"
            options={ConversionConstants.TIME_OF_DAY}
            value={this.state.timeOfDay}
            placeholder={"Time of Day"}
            onChange={this.onTimeOfDayChange}
          />
          <Select
            className="minutes"
            name="minutes"
            options={ConversionConstants.MINUTES_OR_SECONDS}
            value={this.state.minute}
            placeholder={"Minutes"}
            onChange={this.onMinuteChange}
          />
          <Select
            className="seconds"
            name="seconds"
            options={ConversionConstants.MINUTES_OR_SECONDS}
            value={this.state.second}
            placeholder={"Seconds"}
            onChange={this.onSecondChange}
          />
        </div>
        <div>
          <input type="text" onChange={this.onUnixtimestampToDateTimeChange}>{unixtimestamp}</input>
          <div>{dateTime}</div>
          <Clipboard 
            className="unixtimestamp-clipboard"
            text={dateTime}> 
            <button>Copy</button>
          </Clipboard>
        </div>
      </div>
    );
  }
});

module.exports = Conversion;