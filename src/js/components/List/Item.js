/** @jsx React.DOM */
var React = require('react');

var Item = React.createClass({
	render: function(){
		return (
				<li>{this.props.item_title} 
					<div className="buttons">
						<i className="fa fa-trash"></i> <i className="fa fa-check _check"></i>
					</div> 
				</li>
		);
	}
});






module.exports = Item;