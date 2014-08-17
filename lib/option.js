"use strict";

var NoneGetError = new Error("None.get error")

var None = new (function() {
  Object.defineProperty(this, "isDefined", {
    get: function() { return false; }
  });
  Object.defineProperty(this, "isEmpty", {
    get: function() { return true; }
  });

  this.get = function () { throw NoneGetError; };
  this.getOrElse = function(fallbackValueOrFunction) {
    if (typeof fallbackValueOrFunction == 'function') {
      return fallbackValueOrFunction();
    } else {
      return fallbackValueOrFunction;
    };
  };
  this.filter = function(callback, thisArg) { return None; }
  this.forEach = function(callback) { };
  this.map = function(callback) { return None; };
  this.toString = function() { return "None"; }
  this.toArray = function() { return []; }
})();

function SomeInstance(value) {
  Object.defineProperty(this, "isDefined", {
    get: function() { return true; }
  });
  Object.defineProperty(this, "isEmpty", {
    get: function() { return false; }
  });

  this.get = function () { return value; };
  this.getOrElse = function(fallbackValueOrFunction) { return value; };
  this.filter = function(callback, thisArg) {
    if (callback.call(thisArg || this, value, 0, this) == true) {
      return this;
    } else {
      return None;
    }
  };
  this.forEach = function(callback, thisArg) {
    callback.call(thisArg || this, value, 0, this);
  };
  this.map = function(callback, thisArg) {
    var modifiedValue = callback.call(thisArg || this, value, 0, this);
    return Some(modifiedValue);
  };
  this.toArray = function() { return [value]; }
  this.toString = function() { return "Some(" + value + ")"; }
}

function Some(value) {
  return new SomeInstance(value);
};

function Option(possibleValue) {
  if (typeof possibleValue == 'undefined' || possibleValue === null) {
    return None
  } else {
    return new Some(possibleValue);
  }
};

Option.Some = Some;
Option.None = None;
Option.NoneGetError = NoneGetError;

if (typeof module == 'undefined') {
  window.OptionJS = Option;
} else {
  module.exports = Option;
}
