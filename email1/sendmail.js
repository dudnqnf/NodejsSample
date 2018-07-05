var email   = require("emailjs/email");
var server  = email.server.connect({
   user:    "perplcloud@daum.net", 
   password:"perplteam", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    "i hope this works", 
   from:    "you <perplcloud@daum.net>", 
   to:      "someone <dlgustlr2510@naver.com>",
   cc:      "else <else@gmail.com>",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });