var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
	// fs.readFile('sub.js', 'utf8', function(err, data){
	// 	if(err) {console.error("err", err);}
	// 	res.write(data);
	// })
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.write("Hello, World!");
	res.end();
}).listen(3000, function(){console.log("콜백함수닷!")});
console.log("port is 3000");