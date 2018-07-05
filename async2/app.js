
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
app.set('view engine', 'ejs');
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/test', routes.test)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// create table ex1 (
// 	num int not null auto_increment,
// 	list varchar(100) not null,
// 	word varchar(100) not null,
// 	primary key(num)
// ) DEFAULT CHARACTER SET utf8 COLLATE='utf8_general_ci';

// insert into ex1(list,word) values('list1', 'aaa');
// insert into ex1(list,word) values('list1', 'bbb');
// insert into ex1(list,word) values('list1', 'ccc');
// insert into ex1(list,word) values('list2', 'ddd');
// insert into ex1(list,word) values('list2', 'eee');
// insert into ex1(list,word) values('list2', 'fff');
// insert into ex1(list,word) values('list3', 'ggg');
// insert into ex1(list,word) values('list3', 'hhh');
// insert into ex1(list,word) values('list3', 'iii');