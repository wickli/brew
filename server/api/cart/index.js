/**
 * Module for handling cart requests.
 * Initializing the [CartController]{@link cart:controller~CartController}
 * and configuring the express router to handle the cart api
 * for /api/carts routes. All Routes are registered after the
 * [request parameters]{@link cart:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the cart api routes
 * @module {express.Router} cart
 * @requires {@link module:middleware}
 * @requires {@link cart:controller~CartController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var CartController = require('./cart.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the cart api routes
module.exports = router;

/**
 * The api controller
 * @type {cart:controller~CartController}
 */
var controller = new CartController(router);

// register cart route parameters, uncomment if needed
// var registerCartParameters = require('./cart.params');
// registerCartParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register cart routes
router.route('/')
	.get(controller.index)
	.post(controller.create);

router.route('/' + controller.paramString)
	.get(controller.show)
	.delete(controller.destroy)
	.put(controller.update)
	.patch(controller.update);
