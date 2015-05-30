'use strict';

module.exports = function (term) {
	return new Promise(function (resolve, reject) {
		if (typeof term === 'undefined') {
			reject(new Error('Missing param: search term'));
		}
		
		if (typeof term !== 'string') {
			reject(new Error('Search term must be a string'));
		}

		if (term === '') {
			reject(new Error('Search term string must not be empty'));
		}

	});
};
