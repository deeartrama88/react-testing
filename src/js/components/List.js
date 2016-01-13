/** @jsx React.DOM */

var React = require('react');

var Item = require('./Item');
var Button_count = require('./Button_count');


var List = React.createClass({
	getInitialState: function(){
		return {
			content_01: 'hello world',
			counts: 2
		};
	},
	clickAdd: function(){
		console.log('hello this is fun');
		var clicks = this.state.counts;
			clicks++;
		this.setState({ content_01: 'this is new data yoo', counts: clicks });
	},
	render: function () {
		return (
			<div>
				<ul>
					<Item item_cont={this.state.content_01} />
					<Button_count func={this.clickAdd}  counts={this.state.counts} />
				</ul>
			</div>
		);
	}
});



module.exports = List;