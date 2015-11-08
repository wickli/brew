/**
 * An module for defining and initializing the Basket model.
 * Exporting the Basket model definition, schema and model instance.
 * @module {Object} basket:model
 * @property {Object} definition - The [definition object]{@link basket:model~BasketDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link basket:model~BasketSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link basket:model~Basket}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Basket model definition
 * @type {Object}
 * @property {String} name - The name of this basket
 * @property {String} info - Details about this basket
 * @property {Boolean} active - Flag indicating this basket is active
 */
var BasketDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean
};

/**
 * The Basket model schema
 * @type {MongooseSchema}
 */
var BasketSchema = new mongoose.Schema(BasketDefinition);

/**
 * Attach security related plugins
 */
BasketSchema.plugin(createdModifiedPlugin);

BasketSchema.plugin(requestContext, {
	propertyName: 'modifiedBy',
	contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
BasketSchema
	.path('name')
	.validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Basket model
 *  @type {Basket}
 */
var Basket = mongoose.model('Basket', BasketSchema);

module.exports = {

	/**
	 * The Basket model definition object
	 * @type {Object}
	 * @see basket:BasketModel~BasketDefinition
	 */
	definition: BasketDefinition,

	/**
	 * The Basket model schema
	 * @type {MongooseSchema}
	 * @see basket:model~BasketSchema
	 */
	schema: BasketSchema,

	/**
	 * The Basket model instance
	 * @type {basket:model~Basket}
	 */
	model: Basket

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
	this.constructor.findOne({name: value}, function (err, basket) {
		if (err) {
			throw err;
		}

		if (basket) {
			// the searched name is my name or a duplicate
			return respond(self.id === basket.id);
		}

		respond(true);
	});
}
