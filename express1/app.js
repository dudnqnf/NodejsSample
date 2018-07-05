var express = require('express');
var app = express();

app.disabled('trust proxy');
// => true

app.enable('trust proxy');
console.log(app.disabled('trust proxy'));
// => false