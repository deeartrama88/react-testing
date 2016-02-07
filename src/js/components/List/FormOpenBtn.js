/** @jsx React.DOM */
var React = require('react');
var FromList = require('./FormList');

var FormOpenBtn = React.createClass({
	hideOpen: function(){
		var func = this.props.func;
		func();
		this.refs.bla.getDOMNode().focus(); 
	},

	render: function(){
		return (
			<button onClick={this.hideOpen} className="btn btn-success form_open_btn">Add new ToDo</button>
		);
	}
});




module.exports = FormOpenBtn;