/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var cartModel = require('./cart.model');

// Clear all carts
function cleanup(done) {
	cartModel.model.remove().exec().then(function () { done();	});
}

describe('/api/carts', function () {

	var cart;

	// reset cart before each test
	beforeEach(function () {
		cart = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear carts before each test
	beforeEach(cleanup);

	// Clear carts after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('/api/carts')
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

		it('should respond with an error for a malformed cart id parameter', function (done) {
			request(app)
				.get('/api/carts/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing cart id', function (done) {
			request(app)
				.get('/api/carts/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a cart for its id', function (done) {
			cartModel.model(cart).save(function (err, doc) {
				request(app)
					.get('/api/carts/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(cart);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new cart and respond with 201 and the created cart', function (done) {
			request(app)
				.post('/api/carts')
				.set('Accept', 'application/json')
				.send(cart)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(cart);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('/api/carts')
				.set('Accept', 'application/json')
				.send(cart)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing cart id', function (done) {
			request(app)
				.put('/api/carts/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a cart and respond with the updated cart', function (done) {
			request(app)
				.post('/api/carts')
				.set('Accept', 'application/json')
				.send(cart)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					cart.name = 'Cat';
					// check if id is stripped on update
					cart._id = 'malformed id string';
					request(app)
						.put('/api/carts/' + res.body._id)
						.set('Accept', 'application/json')
						.send(cart)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', cart.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('/api/carts')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing cart id', function (done) {
			request(app)
				.delete('/api/carts/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a cart and respond with 204', function (done) {
			request(app)
				.post('/api/carts')
				.set('Accept', 'application/json')
				.send(cart)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('/api/carts/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
