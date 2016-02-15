"use es6";

var React = require('react');
var Moment = require('moment');
var Clipboard = require('react-copy-to-clipboard');

var Clock = require('./Clock');

var CurrentUnixtimestamp = React.createClass({
  setTime: function() {
    var unixtimestamp = Moment().unix();
    this.setState({
      unixtimestamp: unixtimestamp
    });
  },

  componentWillMount: function() {
    this.setTime();
  },

  componentDidMount: function() {
    window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  },

  handleCopy : function(e) {
    console.log("copied " + e.value, e);
  },

  render: function() {
    return (
      <div>
        <Clock 
          unixtimestamp={this.state.unixtimestamp}
        />
        <div className="unixtimestamp">
          <div className="unixtimestamp-value">
            {this.state.unixtimestamp}
          </div>
          <Clipboard 
            className="unixtimestamp-clipboard"
            text={this.state.unixtimestamp.toString()} 
            onCopy={this.handleCopy}>
            <button>Copy</button>
          </Clipboard>
        </div>
        <div className="formatted-timestamp">
          {Moment.unix(this.state.unixtimestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </div>
      </div>
      )
  }
});

module.exports = CurrentUnixtimestamp;