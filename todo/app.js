
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
app.post("/create", routes.create);
app.get("/edit/:id", routes.edit);
app.post("/update/:id", routes.update);
app.get("/destroy/:id", routes.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//mongodb윈도우 바로실행 명령어 
//sc create MongoDB binPath= "C:\mongodb-2.6.0\bin\mongod.exe --service --dbpath C:\data\db --logpath c:\data\mongoserivce.log --logappend --directoryperdb" start= auto