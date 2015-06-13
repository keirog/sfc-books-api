'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server/app');

describe('Clavivox', function () {
	describe('GET /search', function () {
		it('should return 200', function (done) {
			request(app)
				.get('/search')
				.expect(200, done);
		});

		it('should serve html that contains a form', function (done) {
			request(app)
				.get('/search')
				.expect('Content-Type', /text\/html/)
				.expect(/<html/)
				.expect(/<form/, done);
		});
	});
});
