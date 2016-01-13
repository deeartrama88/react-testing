/** @jsx React.DOM */

var React = require('react');


var Button_count = React.createClass({
	clicked: function(message){

		console.log(message);

	},

	render: function () {
		return (
			<button onClick={this.props.func}>  counts:  {this.props.counts} </button>
		);
	}
});


module.exports = Button_count;