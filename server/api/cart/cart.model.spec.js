/* jshint unused:false */
'use strict';

var should = require('should');

var cart = require('./cart.model');
var cartDefinition = cart.definition;
var cartSchema= cart.schema;
var Cart = cart.model;

var cartData = [
	{
		name: 'Dog',
		info: 'Hello, this is dog.',
		active: true
	}, {
		name: 'Bugs Bunny',
		info: 'Famous Bunny.',
		active: true
	}, {
		name: 'Nyan Cat',
		info: 'No comment.',
		active: false
	}
];

// Clear all carts
function cleanup(done) {
	Cart.remove().exec().then(function () { done();	});
}

describe('Cart Model', function () {

	// Clear carts before testing
	before(cleanup);

	// Clear carts after testing
	after(cleanup);

// Check test conditions for cart tests
	it('should start with no carts', function (done) {
		Cart.find({}, function (err, carts) {
			carts.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var cartModel = new Cart(cartData[0]);

		// Clear carts after running this suite
		after(cleanup);

		it('should insert a new cart', function (done) {
			cartModel.save(function (err, cart) {
				cart.should.have.properties(cartModel);
				done(err);
			});
		});

		it('should insert a list of carts', function (done) {
			Cart.create(cartData, function (err, cart) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(cartData.length);
				done(err);
			});
		});


		it('should find a cart by _id property', function (done) {
			Cart.findById(cartModel._id, function (err, cart) {
				cart.should.have.properties(cartData[0]);
				done(err);
			});
		});

		it('should update a cart', function (done) {
			cartModel.name = 'foo';
			cartModel.save(function (err) { done(err);	});
		});

		it('should remove a cart', function (done) {
			cartModel.remove(function (err) { done(err); });
		});
	}); // crud
});
