if(process.env.UPLOAD_PATH == undefined) {
  process.env.UPLOAD_PATH = 'public'; // 로칼 테스트
}//if

var fs = require('fs');
var path = require('path');
var ffmpeg = require('fluent-ffmpeg');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.uploadform = function(req, res) {
  res.render('uploadform', { title: '파일 업로드' });
};

exports.upload = function(req, res) {
  var userid = req.body.userid;
  var upfile = req.files.upfile;
  if(upfile.originalFilename != '') { // 업로드 파일이 있을때
    var userpolder = path.resolve(process.env.UPLOAD_PATH, userid);
    // console.log('userpolder', userpolder);
    if(! fs.existsSync(userpolder)) {
      fs.mkdirSync(userpolder);
    }//if
    var name = upfile.name;
    var srcpath = upfile.path;
    var destpath = path.resolve(userpolder, name);
    // console.log('srcpath', srcpath);
    // console.log('destpath', destpath);
    var is = fs.createReadStream(srcpath);
    var os = fs.createWriteStream(destpath);
    is.pipe(os);
    is.on('end', function() {
      fs.unlinkSync(srcpath);
      videoToScreenshot(destpath);
      res.json({userid:userid, status:'success'});
    });//is.on
  } else { // 업로드 파일이 없을때
    res.json({status:'not file'});
  }
};

function videoToScreenshot(videoPath) {
  var Metalib = require('fluent-ffmpeg').Metadata;
  console.log("Metalib", Metalib);
  console.log('videoPath', videoPath);
  console.log('process.env.OS', process.env.OS); // 예) 'Windows_NT'
  var idxSlash = 0;
  if(process.env.OS == 'Windows_NT') {
    idxSlash = videoPath.lastIndexOf('\\') + 1;
  } else {
    idxSlash = videoPath.lastIndexOf('/') + 1;
  }
  var savePath = videoPath.substring(0, idxSlash);
  var idxExt = videoPath.lastIndexOf('.');
  var screenshotName = videoPath.substring(idxSlash, idxExt);
  console.log('idxSlash', idxSlash);
  console.log('idxExt', idxExt);
  console.log('savePath', savePath);
  console.log('screenshotName', screenshotName);
  var metaObject = new Metalib(videoPath, function(metadata, err) {
    console.log('metadata', metadata); // 메타 정보 출력
    if(err) {
      console.error('err', err);
      return;
    }// if
    var aspectString = metadata.video.aspectString; // 예) 640:267
    var arr = aspectString.split(':');
    var width = 500; // 예) 640
    var height = 500; // 예) 267
    var size = width + 'x' + height; // 예) 640x267
    console.log('size', size);
    var proc = new ffmpeg({ source: videoPath })
      .withSize(size)
      .takeScreenshots({
        count: 1,
        timemarks: [ '5' ],
        filename: screenshotName
      }, savePath, function(err, filenames) {
        if(err) console.error('err', err);
        console.log(filenames);
        console.log('screenshots were saved');
    });// takeScreenshots
  });// metaObject
};// videoToScreenshot

