'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

var search = require('../lib/search');

chai.use(chaiAsPromised);

describe('Search', function () {

	it('should be a function', function () {
		expect(search).to.be.a('function');
	});

	it('should be thenable', function () {
		expect(search().then).to.be.a('function');
	});

	it('should reject its promise (with an error) when called with no params', function () {
		return expect(search()).to.be.rejectedWith(Error);
	});

	it('should reject its promise (with an error) when passed a non-string search term', function () {
		return expect(search({})).to.be.rejectedWith(Error);
	});

	it('should reject its promise (with an error) when passed an empty string', function () {
		return expect(search('')).to.be.rejectedWith(Error);
	});
});
