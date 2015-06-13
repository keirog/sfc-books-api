'use strict';

var app = module.exports = require('express')();
var handlebars = require('express-handlebars');
var hbOptions = {
	defaultLayout: 'main.html'
};

app.engine('html', handlebars.create(hbOptions).engine);
app.set('view engine', 'html');

app.get('/search', function (req, res) {
	res.render('search', {
		title: 'Search'
	});
});

app.listen(process.env.PORT || 3001);
