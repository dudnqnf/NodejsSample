var path = require("path");
var fs = require("fs");
var easyimage = require("easyimage");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.uploadform = function(req, res){
	res.render("uploadform", {title:"파일업로드"});
};

exports.upload = function(req, res){
	// console.log("req.body", req.body);
	// console.log("req.files", req.files);
	var user_id = req.body.user_id;
	var upfile = req.files.upfile;
	if(upfile.originalFilename == ""){
		res.json({result:"no file"});
	} else {
		var userfolder = path.resolve(__dirname, '..', 'uploads', user_id);
		//console.log("userfolder", userfolder);
		if(! fs.existsSync(userfolder)){
			fs.mkdirSync(userfolder);
		}
		var name = upfile.name;
		var srcpath = upfile.path;
		var destpath = path.resolve(userfolder, name);
		console.log("destpath", destpath);
		var is = fs.createReadStream(srcpath);
		var os = fs.createWriteStream(destpath);
		is.pipe(os);
		is.on("end", function(){
			fs.unlinkSync(srcpath);
			var srcimg = destpath;
			var idx = destpath.lastIndexOf('.');
			var filename = destpath.substring(0, idx);
			var ext = destpath.substring(idx);
			var destimg = filename + '-thumbnail' + ext;
			easyimage.resize({src:srcimg, dst:destimg, width:100, height:100}, function(err, image) {
				if(err) console.error('err', err);
				console.log("image", image);
				res.json({user_id:user_id, status:"success", image:image});
			});
		});
	}
};