/**
 * Module for the controller definition of the cart api.
 * The CartController is handling /api/carts requests.
 * @module {cart:controller~CartController} cart:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = CartController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Cart model instance
 * @type {cart:model~Cart}
 */
var Cart = require('./cart.model').model;

/**
 * CartController constructor
 * @classdesc Controller that handles /api/carts route requests
 * for the cart api.
 * Uses the 'cartId' parameter and the 'cartParam' request property
 * to operate with the [main cart API Model]{@link cart:model~Cart} model.
 * @constructor
 * @inherits ParamController
 * @see cart:model~Cart
 */
function CartController(router) {
	ParamController.call(this, Cart,  router);

	// modify select only properties
	// this.select = ['-__v'];

	// omit properties on update
	// this.omit = ['hashedPassword'];

	// property to return (maybe a virtual getter of the model)
	// this.defaultReturn = 'profile';
}

// define properties for the CartController here
CartController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: CartController

};

// inherit from ParamController
CartController.prototype = Object.create(ParamController.prototype);

