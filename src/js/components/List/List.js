/** @jsx React.DOM */
var React = require('react');
var Item = require('./Item');
var FormList = require('./FormList');

var List = React.createClass({

	getInitialState: function() {
		var all_data = [
			{ title: 'Javascript is CooL!!!' },
			{ title: 'PHP is not so fun!!' },
			{ title: 'Redux i think is awesome to.' },
			{ title: 'Ecmasript 2015 is cool thing too..' },
			{ title: 'REACT is awesome of course!!!' }
		];
		return {
			data: all_data,
			form_disabled: true,
			id: 0
		}
	},

	addNewItem: function(element) {
		var new_el = { title: "element", id: this.state.id  };
		var new_items = [new_el, ...this.state.data ];
		
		this.setState({ 
			data: new_items, 
			form_disabled: true, 
			id: this.state.id + 1 
		});

		console.log(new_items);
	},

	disabledForm: function(element){
		if(element === ""){
			this.setState({ form_disabled: true });
		}
		else{
			this.setState({ form_disabled: false });
		}	
	},
	

	render: function(){

		var items = this.state.data.map(function(item) {
			return <Item item_title={item.title} />
		});

		return (
			<div>

				<FormList add_func={this.addNewItem} disabled={this.state.form_disabled} func={this.disabledForm} />

				<ol>
					{ items }
					
				</ol>

			</div>
		);
	}
});




module.exports = List;