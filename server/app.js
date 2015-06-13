'use strict';

var app = module.exports = require('express')();

app.get('/search', function (req, res) {
});

app.listen(process.env.PORT || 3001);
