/** @jsx React.DOM */
var React = require('react');

var List = require('./components/List');


// var React = require('react'),
// 	List = require('./components/List');


React.renderComponent( 
	<List />, 
	document.getElementById('app')  
);