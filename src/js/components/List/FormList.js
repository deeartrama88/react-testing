/** @jsx React.DOM */
var React = require('react');

var FormList = React.createClass({

	clickHandle: function(e) {
		var value = this.refs.bla.getDOMNode().value;
		var func = this.props.func;
		func(value);
	},

	addNewItem: function(e) {
		e.preventDefault();
		var value = this.refs.bla.getDOMNode().value;
		var func = this.props.add_func;
		func(value);
		this.refs.bla.getDOMNode().value = "";
	},



	render: function(){
		var disabled = this.props.disabled ? "true" : "";
		return (
			<div className="new_item_from">
				<form>
					<input onChange={ this.clickHandle }  type="text" placeholder="title" ref="bla"/>
					<button onClick={ this.addNewItem } disabled={ disabled } className="btn btn-primary">add new item</button>
				</form>
			</div>
		);
	}
});












module.exports = FormList;