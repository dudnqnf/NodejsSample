var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('AJAX초급,AJAX중급,AJAX고급');
}).listen(1337, '127.0.0.1');
console.log('server running at http://127.0.0.1:1337/');