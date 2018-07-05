
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
express.session({
	user_id: ""
});

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat" }));
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
app.get("/main", routes.main);
app.get("/signout", routes.signout);
app.post("/signout", routes.signout_post);
app.get("/fix_mem", routes.fix_mem);
app.get("/out_mem", routes.out_mem);
app.get("/logout", routes.logout);
app.post("/login_post", routes.login_post);
app.post("/fix_mem_post", routes.fix_mem_post);
app.get("/id_check/:user_id", routes.id_check);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// create table hw2(
//  	num int not null auto_increment,
//  	user_id varchar(12) not null,
//  	pwd varchar(12) not null,
//  	email varchar(50) not null,
//  	memo text not null,
//  	primary key(num)
// ) default character set utf8 collate utf8_general_ci;