function EventEmitter() {}

EventEmitter.prototype.on = function (event, f) {
  if (!this._event) {
    this._event = {};
  }
  if (!this._event[event]) {
    this._event[event] = [];
  }
  if (this._event[event].indexOf(f) === -1) {
    this._event[event].push(f);
  }
};
EventEmitter.prototype.emit = function (event, ...args) {
  if (!this._event || !this._event[event]) {
    return;
  }
  this._event[event].forEach((f) => {
    f.apply(this, args);
  });
};
EventEmitter.prototype.once = function (event, f) {
  if (!this._event) {
    this._event = {};
  }
  const wrapper = (...args) => {
    f(...args);
    this.off(event, wrapper);
  };
  f.wrapper = wrapper;
  this.on(event, wrapper);
};
EventEmitter.prototype.off = function (event, f) {
  if (!this._event || !this._event[event]) {
    return;
  }
  this._event[event] = this._event[event].filter((listener) => {
    return listener !== f && listener !== f.wrapper;
  });
};

module.exports = EventEmitter;
