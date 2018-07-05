var mongoose = require('mongoose');
var express = require('express');
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
var middleware = require('middleware');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/blog', function(err){
	if(err){
		console.log('err', err);
	}

	var app = express();
	middleware(app);
	routes(app);

	app.listen(3000, function(){
		console.log('http://localhost:3000 에서 실행됨!!!')
	});
});