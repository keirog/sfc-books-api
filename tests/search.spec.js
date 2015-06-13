'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('request');

var search = require('../server/lib/search');
var fakeResult = require('./google-books-result');
var fakeResponses = require('./fake-responses');

chai.use(chaiAsPromised);

describe('Search', function () {
	var requestStub;

	before(function () {
		requestStub = sinon.stub(request, 'get');
	});

	afterEach(function () {
		requestStub.yields();
	});

	it('should be a function', function () {
		expect(search).to.be.a('function');
	});

	it('should be thenable', function () {
		expect(search().then).to.be.a('function');
	});

	it('should reject its promise (with an error) when called with no params', function () {
		return expect(search()).to.be.rejectedWith(Error, 'Search term parameter missing');
	});

	it('should reject its promise (with an error) when passed a non-string search term', function () {
		return expect(search({})).to.be.rejectedWith(Error, 'Search term must be a string');
	});

	it('should reject its promise (with an error) when passed an empty string', function () {
		return expect(search('')).to.be.rejectedWith(Error, 'Search term string must not be empty');
	});

	it('should reject its promise (with an error) when the books API request returns a non-200', function () {
		requestStub.yields(null, fakeResponses.badStatus, '');
		return expect(search('asimov')).to.be.rejectedWith(Error, '404');
	});

	it('should reject its promise (with an error) when the books API returns invalid JSON', function () {
		requestStub.yields(null, fakeResponses.good, 'abc');
		return expect(search('asimov')).to.be.rejectedWith(Error, 'Invalid JSON received');
	});

	it('should reject its promise (with an error) when the books API returns non-JSON content type', function () {
		requestStub.yields(null, fakeResponses.badContentType, '{}');
		return expect(search('asimov')).to.be.rejectedWith(Error, 'Invalid content type received');
	});

	it('should eventually return an object when passed a valid string', function () {
		requestStub.yields(null, fakeResponses.good, fakeResult);
		return expect(search('asimov')).to.eventually.be.an('object');
	});

	it('should eventually return an object with expected keys, when passed a valid string', function () {
		requestStub.yields(null, fakeResponses.good, fakeResult);
		return expect(search('asimov')).to.eventually.include.keys('totalItems');
	});
});
