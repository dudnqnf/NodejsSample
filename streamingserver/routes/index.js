var fs = require("fs");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.streaming = function(req, res) {
	var filename = req.params.filename;	//get방식은 params로 post방식은 body.변수명
	var path = "./public/" + filename;
	var stat = fs.statSync(path);
	console.log("stat",stat);
	var total = stat.size;
	if (req.headers.range){
		var range = req.headers.range;
		var parts = range.replace(/bytes=/, "").split("-");
		var partialstart = parts[0];
		var partialend = parts[1];
		var start = parseInt(partialstart, 10);
		var end = partialend ? parseInt(partialend, 10) : total-1;
		var chunksize = (end-start)+1;
		console.log("RANGE: " + start + " - " + end + " = " + chunksize);
		var file = fs.createReadStream(path, {start: start, end: end});
		res.writeHead(206, {"Content-Range":"bytes" + start + "-" + end + "/" + total, "Accept-Ranges":"bytes", "Content-Length":chunksize, "Content-Type":"video/mp4"});
		file.pipe(res);
	}else{
		console.log("ALL:"+total);
		res.writeHead(200, {"Content-Length": total, "Content-Type":"video/mp4"});
		fs.createReadStream(path).pipe(res);
	}
}