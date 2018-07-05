var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var nicknames = [];
var users = {};

server.listen(3000);

app.get("/", function(req, res){
	res.sendfile(__dirname+ "/index.html");
});

io.sockets.on("connection", function(socket){
	socket.on("new user", function(data, callback){
		if(data in users) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			users[socket.nickname] = socket;
			updateNicknames();
		} //else
	});

	function updateNicknames(){
		io.sockets.emit("usernames", Object.keys(users));
	};

	socket.on("send message", function(data, callback) {
		var msg = data.trim();
		if(msg.substr(0,3) === '/w ') {
			msg = msg.substr(3);
			var idx = msg.indexOf(" ");
			if(idx !== -1){
				var name = msg.substring(0, idx);
				var msg = msg.substring(idx + 1);
				if(name in users){	//사용자가 있는경우
					users[name].emit("whisper", {msg:msg, nick:socket.nickname});
					console.log("message sent is:" +msg + "whisper!");
				} else {	//사용자가 없는 경우
					callback("Error! Enter a valid user!")
				}
			} else {
				callback("Error! Message Please!");
			}	//스페이스가 없는경우;
		} else {	//귓속말이 아닌경우
			io.sockets.emit("new message", {msg:msg, nick:socket.nickname});
		}
	});	//send message


	socket.on("disconnect", function(data) {
		if(!socket.nickname) {return;}
		//nicknames.splice(nicknames.indexOf(socket.nickname), 1)
		delete users[socket.nickname];
		updateNicknames();
	});
});	//connection