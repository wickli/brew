/**
 * Module for handling basket requests.
 * Initializing the [BasketController]{@link basket:controller~BasketController}
 * and configuring the express router to handle the basket api
 * for /api/baskets routes. All Routes are registered after the
 * [request parameters]{@link basket:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the basket api routes
 * @module {express.Router} basket
 * @requires {@link module:middleware}
 * @requires {@link basket:controller~BasketController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var BasketController = require('./basket.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the basket api routes
module.exports = router;

/**
 * The api controller
 * @type {basket:controller~BasketController}
 */
var controller = new BasketController(router);

// register basket route parameters, uncomment if needed
// var registerBasketParameters = require('./basket.params');
// registerBasketParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the admin role
var isAuthenticated = auth.hasRole('admin');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register basket routes
router.route('/')
	.get(controller.index)
	.post(controller.create);

router.route('/' + controller.paramString)
	.get(controller.show)
	.delete(controller.destroy)
	.put(controller.update)
	.patch(controller.update);
