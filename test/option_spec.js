"use strict";

var Option = window.OptionJS;
var Some = Option.Some, None = Option.None;

describe("Option", function() {
  it("is present", function() {
    expect(typeof Option).not.toBe('undefined');
  });

});

describe("Option.Some", function() {
  var anOption = Some(41);

  function assertCallbackInvokedCorrectly(callback) {
    expect(callback).toHaveBeenCalledWith(41, 0, anOption);
  };

  function testThisContext(methodName) {
    var callbackCalledWithThisContext;
    function callback() {
      callbackCalledWithThisContext = this;
    }

    var thisContext = "just a test string";
    anOption[methodName](callback, thisContext);
    expect(callbackCalledWithThisContext).toBe(thisContext);
  };

  it("is present", function() {
    expect(typeof Option.Some).toBe('function');
  });

  it("#get should return the value", function() {
    expect(anOption.get()).toBe(41);
  });

  it("#getOrElse should return the value", function() {
    expect(anOption.getOrElse()).toBe(41);
  });

  it("#isDefined should be true", function() {
    expect(anOption.isDefined).toBe(true);
  });

  it("#isEmpty should be false", function() {
    expect(anOption.isEmpty).toBe(false);
  });

  it("#filter should let you provide a `this` context for the callback", function() {
    testThisContext('forEach');
  });

  it("#filter should return None if callback returns false", function() {
    var callback = jasmine.createSpy().andReturn(false);

    expect(anOption.filter(callback)).toBe(None);
    assertCallbackInvokedCorrectly(callback);
  });

  it("#filter should return the Option if callback returns true", function() {
    var callback = jasmine.createSpy().andReturn(true);

    expect(anOption.filter(callback)).toBe(anOption);
    assertCallbackInvokedCorrectly(callback);
  });

  it("#forEach should invoke the callback", function() {
    var callback = jasmine.createSpy();

    expect(typeof anOption.forEach(callback)).toBe('undefined');
    assertCallbackInvokedCorrectly(callback);
  });

  it("#map should invoke the callback and return a new Some", function() {
    var doubledValue = anOption.get() * 2;
    var callback = jasmine.createSpy().andReturn(doubledValue);

    expect(anOption.map(callback).get()).toBe(doubledValue);
    assertCallbackInvokedCorrectly(callback);
  });

  it("#map should let you provide a `this` context for the callback", function() {
    testThisContext('map');
  });

  it("#forEach should let you provide a `this` context for the callback", function() {
    testThisContext('forEach');
  });

  it("#toArray should return the value in an array", function() {
    expect(anOption.toArray()).toEqual([41]);
  });

  it("#toString should return a reasonable representation", function() {
    expect(anOption.toString()).toEqual("Some(41)");
  });
});

describe("Option.None", function() {
  it("#get should throw an exception", function() {
    expect(function() {
      None.get();
    }).toThrow(Option.NoneGetError);
  });

  it("#getOrElse, when given a non-function fallback value, should return the fallback value", function() {
    expect(None.getOrElse("fallback")).toBe("fallback");
  });

  it("#getOrElse, when given a function as a fallback value, should call the fallback function and return its return value", function() {
    var callback = jasmine.createSpy().andReturn("fallback");
    expect(None.getOrElse(callback)).toBe("fallback");
    expect(callback).toHaveBeenCalled();
  });

  it("#isDefined should be false", function() {
    expect(None.isDefined).toBe(false);
  });

  it("#isEmpty should be true", function() {
    expect(None.isEmpty).toBe(true);
  });

  it("#filter should return None", function() {
    var callback = jasmine.createSpy();

    expect(None.filter(callback)).toBe(None);
    expect(callback).not.toHaveBeenCalled();
  });

  it("#forEach should not invoke the callback", function() {
    var callback = jasmine.createSpy();

    expect(typeof None.forEach(callback)).toBe('undefined');
    expect(callback).not.toHaveBeenCalled();  });

  it("#map should not invoke the callback and return None", function() {
    var callback = jasmine.createSpy();

    expect(None.map(callback)).toBe(None);
    expect(callback).not.toHaveBeenCalled();
  });

  it("#toArray should return the value in an array", function() {
    expect(None.toArray()).toEqual([]);
  });

  it("#toString should return a reasonable representation", function() {
    expect(None.toString()).toEqual("None");
  });
});
