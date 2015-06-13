'use strict';

var request = require('request');
var url = process.env.BOOKS_API_URL;

module.exports = function (term) {
	return new Promise(function (resolve, reject) {
		if (typeof term === 'undefined') {
			reject(new Error('Search term parameter missing'));
		}
		
		if (typeof term !== 'string') {
			reject(new Error('Search term must be a string'));
		}

		if (term === '') {
			reject(new Error('Search term string must not be empty'));
		}

		request.get(url + term, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				try {
					if (response.headers['content-type'] === 'application/json; charset=UTF-8') {
						resolve(JSON.parse(body));
					} else {
						reject(new Error('Invalid content type received'));
					}
				}
				catch (e) {
					reject(new Error('Invalid JSON received'));
				}
			} else {
				reject(new Error(error || response.statusCode));
			}
		});
	});
};
