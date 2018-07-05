// config/auth.js

module.exports = {

	'facebookAuth' : {
		'clientID'			: '546607095460423', // your App ID
		'clientSecret'	: 'e9ceafbaa879304155e9210bd9edd56f', // your App Secret
		'callbackURL'		: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey'			: 'your-consumer-key-here',
		'consumerSecret'	: 'your-client-secret-here',
		'callbackURL'			: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID'			: 'your-secret-clientID-here',
		'clientSecret'	: 'your-client-secret-here',
		'callbackURL'		: 'http://localhost:8080/auth/google/callback'
	}

};