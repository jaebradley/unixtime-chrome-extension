"use es6";

var React = require('react');
var Moment = require('moment');
var Calendar = require('react-input-calendar');
var Select = require('react-select');
var Clipboard = require('react-copy-to-clipboard');

var hours = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
];

var timesOfDay = [
  { value: 'AM', label: 'AM'},
  { value: 'PM', label: 'PM'}
];

var minutesOrSeconds = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },

    { value: 13, label: 13 },
    { value: 14, label: 14 },
    { value: 15, label: 15 },
    { value: 16, label: 16 },
    { value: 17, label: 17 },
    { value: 18, label: 19 },
    { value: 19, label: 19 },
    { value: 20, label: 20 },
    { value: 21, label: 21 },
    { value: 22, label: 22 },
    { value: 23, label: 23 },
    { value: 24, label: 24 },

    { value: 25, label: 25 },
    { value: 26, label: 26 },
    { value: 27, label: 27 },
    { value: 28, label: 28 },
    { value: 29, label: 29 },
    { value: 30, label: 30 },
    { value: 31, label: 31 },
    { value: 32, label: 32 },
    { value: 33, label: 33 },
    { value: 34, label: 34 },
    { value: 35, label: 35 },
    { value: 36, label: 36 },

    { value: 37, label: 37 },
    { value: 38, label: 38 },
    { value: 39, label: 39 },
    { value: 40, label: 40 },
    { value: 41, label: 41 },
    { value: 42, label: 42 },
    { value: 43, label: 43 },
    { value: 44, label: 44 },
    { value: 45, label: 45 },
    { value: 46, label: 46 },
    { value: 47, label: 47 },
    { value: 48, label: 48 },

    { value: 49, label: 49 },
    { value: 50, label: 50 },
    { value: 51, label: 51 },
    { value: 52, label: 52 },
    { value: 53, label: 53 },
    { value: 54, label: 54 },
    { value: 55, label: 55 },
    { value: 56, label: 56 },
    { value: 57, label: 57 },
    { value: 58, label: 58 },
    { value: 59, label: 59 },
];


var Conversion = React.createClass({
  getInitialState: function() {
    var unixtimestamp = Moment().unix();
    return {
      date: Moment.unix(unixtimestamp).format('MM/DD/YYYY'),
      hour: null,
      timeOfDay: null,
      minute: null,
      second: null,
      convertedUnixtimestamp: null
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
  },

  onMinuteChange: function(obj) {
    this.setState({
      minute: obj.value
    });
  },

  onSecondChange: function(obj) {
    this.setState({
      second: obj.value
    });
  },

  onTimeOfDayChange: function(obj) {
    this.setState({
      timeOfDay: obj.value
    });
  },

  getDateTimeString: function() {
    return this.state.date + '/' + this.state.hour + '/' + this.state.minute + '/' + this.state.second + '/' + this.state.timeOfDay;
  },

  calculateConversionToUnixtimestamp: function(e) {
    if (this.state.hour != null && this.state.timeOfDay != null && this.state.minute != null && this.state.second != null) {
      var dateTime = Moment(this.getDateTimeString(), 'MM/DD/YYYY/HH/mm/ss/a');
      this.setState({
        convertedUnixtimestamp: dateTime.unix()
      })
    } else {
      alert("Must fill out all fields in order to convert to unixtimestamp");
    }
  },

  render: function() {
    if (this.state.convertedUnixtimestamp != null) {
      var convertedUnixtimestamp = this.state.convertedUnixtimestamp.toString();  
    } else {
      var convertedUnixtimestamp = "No unixtimestamp converted";
    }
    
    return (
      <div>
        <Calendar
          format="MM/DD/YYYY"
          date={this.state.date}
        />
        <div>
          <Select
            className="hours"
            name="hour"
            options={hours}
            placeholder={"Hour"}
            value={this.state.hour}
            onChange={this.onHourChange}
          />
          <Select
            className="timeOfDay"
            name="timeOfDay"
            options={timesOfDay}
            value={this.state.timeOfDay}
            placeholder={"Time of Day"}
            onChange={this.onTimeOfDayChange}
          />
          <Select
            className="minutes"
            name="minutes"
            options={minutesOrSeconds}
            value={this.state.minute}
            placeholder={"Minutes"}
            onChange={this.onMinuteChange}
          />
          <Select
            className="seconds"
            name="seconds"
            options={minutesOrSeconds}
            value={this.state.second}
            placeholder={"Seconds"}
            onChange={this.onSecondChange}
          />
        </div>
        <button onClick={this.calculateConversionToUnixtimestamp}>Convert to Unixtimestamp</button>
        <div>
          <div className="unixtimestamp-value">{convertedUnixtimestamp}</div>
          <Clipboard 
            className="unixtimestamp-clipboard"
            text={convertedUnixtimestamp}> 
            <button>Copy</button>
          </Clipboard>
        </div>
      </div>
    );
  }
});

module.exports = Conversion;