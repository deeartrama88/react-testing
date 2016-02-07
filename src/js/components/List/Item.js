/** @jsx React.DOM */
var React = require('react');

var Item = React.createClass({
	componentDidUpdate: function(prevProps, prevState){
    	this.refs.change_title.getDOMNode().focus(); 
	},

	open_textarea: function(){
		textarea_open = !textarea_open;
	},

	delete_func: function(){
		var func = this.props.delete_func;
		func(this.props.this_item);
	},

	done_func: function(){
		var func = this.props.done_func;
		func(this.props.this_item);
	},

	open_li_func: function(){
		var func = this.props.open_li_style_func;
		func(this.props.this_item);
		this.refs.change_title.getDOMNode().value = this.props.this_item.title;
	},

	update_func: function(){
		var func = this.props.update_func;
		var updated = this.props.this_item;
		updated.title = this.refs.change_title.getDOMNode().value;
		func(updated);
		var close_func = this.open_li_func;
		close_func();
	},	

	cancel_func: function(){
		var close_func = this.open_li_func;
		close_func();
	},

	render: function(){
		var check_icon_class = this.props.done ? 'fa fa-undo' : 'fa fa-check _check';
		var style_color = this.props.done ? '#8E8D8D' : '#2D2D2D';
		var style_bg = this.props.done ? '#EAEAEA' : '#C1C1C1';
		var style_tt = this.props.done ? 'line-through' : 'none';
		var style = {
			color: style_color,
			background: style_bg,
			textDecoration: style_tt
		};
		var open_li_style = this.props.open_li_style ? 'block' : 'none';
		var style2 = {
			display: open_li_style
		};
		return (
				<li style={style}> {this.props.item_title} 
					<div className="buttons">
						<i onClick={this.done_func} className={check_icon_class}></i> 
						<i onClick={this.open_li_func} className="fa fa-pencil"></i>
						<i onClick={this.delete_func} className="fa fa-trash"></i> 
					</div> 
					<div style={style2} className="change_title_todo">
						<textarea ref="change_title" rows="3"></textarea>
						<div className="buttons_change">
							<button onClick={this.update_func} className="btn btn-primary btn-lg">update</button>
							<button onClick={this.cancel_func} className="btn btn-danger btn-lg">cancel</button>
						</div>
					</div>
				</li>
		);
	}


});






module.exports = Item;