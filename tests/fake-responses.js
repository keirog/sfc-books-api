module.exports = {
	good: {
		statusCode: 200,
		headers: {
			'content-type': 'application/json; charset=UTF-8'
		}
	},
	badStatus: {
		statusCode: 404,
		headers: {
			'content-type': 'text/html'
		}
	},
	badContentType: {
		statusCode: 200,
		headers: {
			'content-type': 'text/html'
		}
	}
};

