"use es6";

var ReactDOM = require('react-dom');
var React = require('react');
var Tabs = require('react-simpletabs');
var Panel = Tabs.Panel;

var CurrentUnixtimestamp = require('./components/CurrentUnixtimestamp');
var Conversion = require('./components/Conversion');

var App = React.createClass({
  render: function() {
    return (
      <Tabs>
        <Panel title='Current'>
          <CurrentUnixtimestamp />
        </Panel>
        <Panel title='Conversion'>
          <Conversion />
        </Panel>
      </Tabs>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('unixtime')
);