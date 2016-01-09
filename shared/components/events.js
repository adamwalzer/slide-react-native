const EventEmitter = require('events');
const util = require('util');

function Emitter() {
  EventEmitter.call(this);
}
util.inherits(Emitter, EventEmitter);

const e = new Emitter();

module.exports = e;