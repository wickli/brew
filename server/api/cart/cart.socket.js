/**
 * Module for registering broadcast updates to clients when
 * the Cart model changes. Exports the
 * [register function]{@link cart:socket~registerCartSockets}
 * to register the model schema events on the socket instance.
 * @module {function} cart:socket
 * @requires {@link cart:model}
 */
'use strict';

/**
 * The Cart model instance
 * @type {cart:model~Cart}
 */
var Cart = require('./cart.model').model;

// export the function to register all socket broadcasts
exports.register = registerCartSockets;

/**
 * Register Cart model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Cart model events on
 */
function registerCartSockets(socket) {
	Cart.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Cart.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Cart save event on a socket object: 'cart:save'
 * @param {socket.io} socket - The socket object to emit the Cart save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('cart:save', doc);
}

/**
 * Emit a Cart remove event on a socket object: 'cart:remove'
 * @param {socket.io} socket - The socket object to emit the Cart remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('cart:remove', doc);
}
