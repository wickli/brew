/**
 * Module for the controller definition of the basket api.
 * The BasketController is handling /api/baskets requests.
 * @module {basket:controller~BasketController} basket:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = BasketController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Basket model instance
 * @type {basket:model~Basket}
 */
var Basket = require('./basket.model').model;

/**
 * BasketController constructor
 * @classdesc Controller that handles /api/baskets route requests
 * for the basket api.
 * Uses the 'basketId' parameter and the 'basketParam' request property
 * to operate with the [main basket API Model]{@link basket:model~Basket} model.
 * @constructor
 * @inherits ParamController
 * @see basket:model~Basket
 */
function BasketController(router) {
	ParamController.call(this, Basket,  router);

	// modify select only properties
	// this.select = ['-__v'];

	// omit properties on update
	// this.omit = ['hashedPassword'];

	// property to return (maybe a virtual getter of the model)
	// this.defaultReturn = 'profile';
}

// define properties for the BasketController here
BasketController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: BasketController

};

// inherit from ParamController
BasketController.prototype = Object.create(ParamController.prototype);

