/**
 * Module for registering broadcast updates to clients when
 * the Basket model changes. Exports the
 * [register function]{@link basket:socket~registerBasketSockets}
 * to register the model schema events on the socket instance.
 * @module {function} basket:socket
 * @requires {@link basket:model}
 */
'use strict';

/**
 * The Basket model instance
 * @type {basket:model~Basket}
 */
var Basket = require('./basket.model').model;

// export the function to register all socket broadcasts
exports.register = registerBasketSockets;

/**
 * Register Basket model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Basket model events on
 */
function registerBasketSockets(socket) {
	Basket.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Basket.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Basket save event on a socket object: 'basket:save'
 * @param {socket.io} socket - The socket object to emit the Basket save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('basket:save', doc);
}

/**
 * Emit a Basket remove event on a socket object: 'basket:remove'
 * @param {socket.io} socket - The socket object to emit the Basket remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('basket:remove', doc);
}
