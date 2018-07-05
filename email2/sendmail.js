var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP", {
	service: 'Gmail',
	auth: {
		user: 'gustlr2510@gmail.com',
		pass: 'qweasd345'
	}
});

var mailOptions = {
	from: 'perplteam <perplcloud@daum.net>',
	to: 'dlgustlr2510@naver.com',
	subject: 'Nodemailer 테스트',
	text: '평문 보내기 테스트 '
};

smtpTransport.sendMail(mailOptions, function(error, response){

	if (error){
		console.log(error);
	} else {
		console.log("Message sent : " + response.message);
	}
	smtpTransport.close();
});