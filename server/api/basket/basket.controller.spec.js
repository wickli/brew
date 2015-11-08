/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var basketModel = require('./basket.model');

// Clear all baskets
function cleanup(done) {
	basketModel.model.remove().exec().then(function () { done();	});
}

describe('/api/baskets', function () {

	var basket;

	// reset basket before each test
	beforeEach(function () {
		basket = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear baskets before each test
	beforeEach(cleanup);

	// Clear baskets after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('/api/baskets')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.instanceof(Array);
					done();
				});
		});

		it('should respond with an error for a malformed basket id parameter', function (done) {
			request(app)
				.get('/api/baskets/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing basket id', function (done) {
			request(app)
				.get('/api/baskets/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a basket for its id', function (done) {
			basketModel.model(basket).save(function (err, doc) {
				request(app)
					.get('/api/baskets/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(basket);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new basket and respond with 201 and the created basket', function (done) {
			request(app)
				.post('/api/baskets')
				.set('Accept', 'application/json')
				.send(basket)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(basket);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('/api/baskets')
				.set('Accept', 'application/json')
				.send(basket)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing basket id', function (done) {
			request(app)
				.put('/api/baskets/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a basket and respond with the updated basket', function (done) {
			request(app)
				.post('/api/baskets')
				.set('Accept', 'application/json')
				.send(basket)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					basket.name = 'Cat';
					// check if id is stripped on update
					basket._id = 'malformed id string';
					request(app)
						.put('/api/baskets/' + res.body._id)
						.set('Accept', 'application/json')
						.send(basket)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', basket.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('/api/baskets')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing basket id', function (done) {
			request(app)
				.delete('/api/baskets/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a basket and respond with 204', function (done) {
			request(app)
				.post('/api/baskets')
				.set('Accept', 'application/json')
				.send(basket)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('/api/baskets/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
