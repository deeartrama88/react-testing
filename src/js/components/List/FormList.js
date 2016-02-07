/** @jsx React.DOM */
var React = require('react');

var FormList = React.createClass({
	
	componentDidUpdate: function(prevProps, prevState){
    	this.refs.bla.getDOMNode().focus(); 
	},

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
		var hide = this.props.hide ? 'none' : 'block';
		var autoFocus = this.props.hide ? false : true;
		var style = { display: hide };
		return (
			<div style={style} className="new_item_from">
				<form>
					<label>Add new ToDo:</label>
					<input onChange={ this.clickHandle } autoFocus={autoFocus}  type="text" placeholder="title" ref="bla"/>
					<button onClick={ this.addNewItem } disabled={ disabled } className="btn btn-primary">add new item</button>
				</form>
			</div>
		);
	}

});




module.exports = FormList;