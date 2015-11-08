/* jshint unused:false */
'use strict';

var should = require('should');

var basket = require('./basket.model');
var basketDefinition = basket.definition;
var basketSchema= basket.schema;
var Basket = basket.model;

var basketData = [
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

// Clear all baskets
function cleanup(done) {
	Basket.remove().exec().then(function () { done();	});
}

describe('Basket Model', function () {

	// Clear baskets before testing
	before(cleanup);

	// Clear baskets after testing
	after(cleanup);

// Check test conditions for basket tests
	it('should start with no baskets', function (done) {
		Basket.find({}, function (err, baskets) {
			baskets.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var basketModel = new Basket(basketData[0]);

		// Clear baskets after running this suite
		after(cleanup);

		it('should insert a new basket', function (done) {
			basketModel.save(function (err, basket) {
				basket.should.have.properties(basketModel);
				done(err);
			});
		});

		it('should insert a list of baskets', function (done) {
			Basket.create(basketData, function (err, basket) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(basketData.length);
				done(err);
			});
		});


		it('should find a basket by _id property', function (done) {
			Basket.findById(basketModel._id, function (err, basket) {
				basket.should.have.properties(basketData[0]);
				done(err);
			});
		});

		it('should update a basket', function (done) {
			basketModel.name = 'foo';
			basketModel.save(function (err) { done(err);	});
		});

		it('should remove a basket', function (done) {
			basketModel.remove(function (err) { done(err); });
		});
	}); // crud
});
