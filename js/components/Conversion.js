"use es6";

var React = require('react');
var Moment = require('moment');
var Calendar = require('react-input-calendar');
var Select = require('react-select');

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


var Conversion = React.createClass({
  render: function() {
    return (
      <div>
        <Calendar
          format="DD/MM/YYYY"
          date="4-12-2014"
        />
        <div>
          <Select
            className="hours"
            name="hour"
            options={hours}
            placeholder={"Hour"}
          />
          <Select
            className="timeOfDay"
            name="timeOfDay"
            options={timesOfDay}
            placeholder={"Time of Day"}
          />
        </div>
      </div>
    );
  }
});

module.exports = Conversion;