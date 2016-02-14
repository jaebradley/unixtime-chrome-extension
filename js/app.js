"use es6";

var ReactDOM = require('react-dom');
var React = require('react');

var CurrentUnixtimestamp = require('./components/CurrentUnixtimestamp');

ReactDOM.render(
  <CurrentUnixtimestamp />,
  document.getElementById('unixtime')
);