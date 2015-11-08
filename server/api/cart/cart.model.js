/**
 * An module for defining and initializing the Cart model.
 * Exporting the Cart model definition, schema and model instance.
 * @module {Object} cart:model
 * @property {Object} definition - The [definition object]{@link cart:model~CartDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link cart:model~CartSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link cart:model~Cart}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Cart model definition
 * @type {Object}
 * @property {String} name - The name of this cart
 * @property {String} info - Details about this cart
 * @property {Boolean} active - Flag indicating this cart is active
 */
var CartDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean
};

/**
 * The Cart model schema
 * @type {MongooseSchema}
 */
var CartSchema = new mongoose.Schema(CartDefinition);

/**
 * Attach security related plugins
 */
CartSchema.plugin(createdModifiedPlugin);

CartSchema.plugin(requestContext, {
	propertyName: 'modifiedBy',
	contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
CartSchema
	.path('name')
	.validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Cart model
 *  @type {Cart}
 */
var Cart = mongoose.model('Cart', CartSchema);

module.exports = {

	/**
	 * The Cart model definition object
	 * @type {Object}
	 * @see cart:CartModel~CartDefinition
	 */
	definition: CartDefinition,

	/**
	 * The Cart model schema
	 * @type {MongooseSchema}
	 * @see cart:model~CartSchema
	 */
	schema: CartSchema,

	/**
	 * The Cart model instance
	 * @type {cart:model~Cart}
	 */
	model: Cart

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
	this.constructor.findOne({name: value}, function (err, cart) {
		if (err) {
			throw err;
		}

		if (cart) {
			// the searched name is my name or a duplicate
			return respond(self.id === cart.id);
		}

		respond(true);
	});
}
