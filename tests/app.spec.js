'use strict';

var expect = require('chai').expect;
var app = require('../app');

describe('Clavivox', function () {
	it('should export an object', function () {
		expect(app).to.be.an('object');
	});

	it('should have a search method', function () {
		expect(app.search).to.be.an('function');
	});
});
