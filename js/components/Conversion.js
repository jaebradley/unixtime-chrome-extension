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

  onDateChange: function(obj) {
    var result = obj.replace("-", "/").replace("-","/");
    this.calculateConversionToUnixtimestamp(
      result,
      this.state.hour,
      this.state.timeOfDay,
      this.state.minute,
      this.state.second
    );
  },

  onHourChange: function(obj) {
    this.calculateConversionToUnixtimestamp(
      this.state.date,
      obj.value,
      this.state.timeOfDay,
      this.state.minute,
      this.state.second
    );
  },

  onMinuteChange: function(obj) {
    this.calculateConversionToUnixtimestamp(
      this.state.date,
      this.state.hour,
      this.state.timeOfDay,
      obj.value,
      this.state.second
    );
  },

  onSecondChange: function(obj) {
    this.calculateConversionToUnixtimestamp(
      this.state.date,
      this.state.hour,
      this.state.timeOfDay,
      this.state.minute,
      obj.value
    );
  },

  onTimeOfDayChange: function(obj) {
    this.calculateConversionToUnixtimestamp(
      this.state.date,
      this.state.hour,
      obj.value,
      this.state.minute,
      this.state.second
    );
  },

  getDateTimeString: function(date, hour, minute, second, timeOfDay) {
    return date + '/' + hour + '/' + minute + '/' + second + '/' + timeOfDay;
  },

  calculateConversionToUnixtimestamp: function(date, hour, timeOfDay, minute, second) {
    var unixtimestamp = null;
    if (hour != null && timeOfDay != null && minute != null && second != null) {
      var dateTime = Moment(this.getDateTimeString(date, hour, minute, second, timeOfDay), 'MM/DD/YYYY/hh/mm/ss/A');
      var unixtimestamp = dateTime.unix();
    }

    this.setState({
      date: date,
      hour: hour,
      timeOfDay: timeOfDay,
      minute: minute,
      second: second,
      unixtimestamp: unixtimestamp
    });
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

  handleCopy: function(e) {
    var unixtimestampInput = document.querySelector(".unixtimestamp-to-convert");
    unixtimestampInput.select();
    document.execCommand('copy');
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
          onChange={this.onDateChange}
        />
        <div>
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
        <img 
          className="conversion-image" 
          src={"../../public/static/img/up-down-arrow.png"} />
        <div>
          <input 
            className="unixtimestamp-to-convert"
            type="text" 
            onChange={this.onUnixtimestampToDateTimeChange} 
            value={unixtimestamp} />
            <button
              className="unixtimestamp-to-convert-copy"
              onClick={this.handleCopy}>Copy
            </button>
          <div>{dateTime}</div>
        </div>
      </div>
    );
  }
});

module.exports = Conversion;