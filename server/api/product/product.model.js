/**
 * An module for defining and initializing the Product model.
 * Exporting the Product model definition, schema and model instance.
 * @module {Object} product:model
 * @property {Object} definition - The [definition object]{@link product:model~ProductDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link product:model~ProductSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link product:model~Product}
 */
'use strict';

var mongoose = require('mongoose');

/**
 * The Product model definition
 * @type {Object}
 * @property {String} name - The name of this product
 * @property {String} info - Details about this product
 * @property {Boolean} active - Flag indicating this product is active
 */
var ProductDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean
};

/**
 * The Product model schema
 * @type {MongooseSchema}
 */
var ProductSchema = new mongoose.Schema(ProductDefinition);

/**
 * Validations
 */
ProductSchema
	.path('name')
	.validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Product model
 *  @type {Product}
 */
var Product = mongoose.model('Product', ProductSchema);

module.exports = {

	/**
	 * The Product model definition object
	 * @type {Object}
	 * @see product:ProductModel~ProductDefinition
	 */
	definition: ProductDefinition,

	/**
	 * The Product model schema
	 * @type {MongooseSchema}
	 * @see product:model~ProductSchema
	 */
	schema: ProductSchema,

	/**
	 * The Product model instance
	 * @type {product:model~Product}
	 */
	model: Product

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
	// jshint validthis: true
	var self = this;

	// check for uniqueness of user name
	this.constructor.findOne({name: value}, function (err, product) {
		if (err) {
			throw err;
		}

		if (product) {
			// the searched name is my name or a duplicate
			return respond(self.id === product.id);
		}

		respond(true);
	});
}
