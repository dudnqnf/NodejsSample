
/** easyimage 모듈을 사용하여 thumbnail 이미지 생성 예제
imagemagick.org에서 s/w 설치 후 테스트하시오.
참고 : express 에서 업로드하려면 아래 문장 추가
app.use(express.multipart());
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
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.multipart());	//업로드가능
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//uploads 폴더 지정
app.use("/uploads", express.directory(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get("/upload", routes.uploadform);
app.post("/upload", routes.upload);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
