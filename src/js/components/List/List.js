/** @jsx React.DOM */
var React = require('react');
var Item = require('./Item');
var _ = require('lodash');
var FormOpenBtn = require('./FormOpenBtn');
var FormList = require('./FormList');

var List = React.createClass({

	getInitialState: function() {
		var all_data = [
			{ title: 'Javascript is CooL!!!', done: false, open: false },
			{ title: 'PHP is not so fun!!', done: false, open: false },
			{ title: 'Redux i think is awesome to.', done: false, open: false },
			{ title: 'Ecmasript 2015 is cool thing too..', done: false, open: false },
			{ title: 'REACT is awesome of course!!!', done: false, open: false }
		];
		return {
			// all list of items
			data: all_data,
			// style to make submit button desable if form is empty(input)
			form_disabled: true,
			// id's to add in every new ToDo
			id: 0,
			// style to hide form
			form_hide: false,
			open_li_style: false
		}
	},

	// add new ToDo in list
	addNewItem: function(element) {
		var new_el = { title: element, id: this.state.id  };
		var new_items = [new_el, ...this.state.data ];
		
		this.setState({ 
			data: new_items, 
			form_disabled: true, 
			id: this.state.id + 1 
		});
	},

	// update toDo
	update_func: function(item){
		var arr_ = this.state.data;
		var index = _.findIndex(arr_, function(o) {
			return o === item; 
		});
		arr_[index] = item;
		this.setState({ data: arr_ });
	},

	// delete ToDo 
	deleteToDo: function(element){
		var newList = _.without(this.state.data, element);
		this.setState({ data: newList });
	},

	// make submit button able if input is not empty
	disabledForm: function(element){
		if(element === ""){
			this.setState({ form_disabled: true });
		}
		else{
			this.setState({ form_disabled: false });
		}	
	},

	// hide/open fomr on click
	HideOpenForm: function(){
		this.setState({ form_hide: !this.state.form_hide });
	},

	done_func: function(item){
		var arr_ = this.state.data;
		var index = _.findIndex(arr_, function(o) {
			return o === item; 
		});
		var check = arr_[index].done;
		var check2 = check ? false : true;
		arr_[index].done = check2;
		this.setState({ data: arr_ });
	},

	open_li_style_func: function(item){
		var arr_ = this.state.data;
		var index = _.findIndex(arr_, function(o) {
			return o === item; 
		});
		var check = arr_[index].open;
		var check2 = check ? false : true;
		arr_[index].open = check2;
		this.setState({ data: arr_ });
	},

	render: function(){
		var delete_func_ = this.deleteToDo;
		var done_func = this.done_func;
		var update_func = this.update_func;
		var open_li_style = this.state.open_li_style;
		var open_li_style_func = this.open_li_style_func;
		// create list of items
		var items = this.state.data.map(function(item) {
			return <Item 
				item_title={item.title} 
				this_item={item} 
				update_func={update_func}
				done={item.done}
				done_func={done_func}
				open_li_style={item.open}

				open_li_style_func = {open_li_style_func}
				delete_func={delete_func_}/>
		});

		return (
			<div>
				<FormOpenBtn func={this.HideOpenForm} />
				<FormList 
					// add new item functin 
					add_func={this.addNewItem}
					// disable submit button style(prop) in form
					disabled={this.state.form_disabled}
					// hide propperty to open/hide form on open/close btn 
					hide={this.state.form_hide}
					// function to make submit button able if input is not empty
					func={this.disabledForm} />


				<ol>
					{ items }
					
				</ol>

			</div>
		);
	}
});



module.exports = List;