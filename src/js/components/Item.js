/** @jsx React.DOM */

var React = require('react');


var Item = React.createClass({
	render: function () {
		return (
			<li> first li {this.props.item_cont} </li>
		);
	}
});


module.exports = Item;