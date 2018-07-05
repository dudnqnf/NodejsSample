var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Nabi' });
kitty.save(function (err) {
  if (err) console.error('err',err);
  console.log('meow');
});