
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

app.get('/write',routes.writeform);
app.post("/write",routes.write);

app.get("/list", routes.list);
app.get("/list/:page", routes.lists);
app.get("/write300", routes.write300);
app.get("/read/:num/page/:page", routes.read);
app.get("/update/:num/page/:page", routes.updateform);
app.post("/update", routes.update);
// app.post("/delete", routes.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// create table board(
// 	num int not null auto_increment,
// 	writer varchar(12) not null,
// 	title varchar(50) not null,
// 	content text not null,
// 	pwd varchar(12) not null,
// 	hit int not null,
// 	regdate datetime not null,
// 	primary key(num)
// ) default character set utf8 collate utf8_general_ci;