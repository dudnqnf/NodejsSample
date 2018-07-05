
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/sel', routes.sel);

//app.get('/sel', routes.sel);
// app.post('/ins', routes.ins);
// app.post('/upd', routes.upd);
// app.post('/del', routes.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/*
create table memo (
	_id int not null AUTO_INCREMENT,
	writer varchar(20) not null,
	content text not null,
	mtime datetime not null,
	primary key(_id)
) default character set utf8 collate utf8_general_ci;
*/