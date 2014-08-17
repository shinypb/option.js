# Option.js

A JavaScript implementation of Scala's Option type, sort of.

## A crash course in optional values
Options make it easier to work with values that may or may not be present -- they let you stop worrying about null or undefined and just focus on the values themselves.

One way of thinking of options is as arrays that only ever have zero or one item in them. In fact, lots of the methods on Options are based on arrays.

## An example
Let's imagine that we have an object representing some URL parameters for an incoming request:

```
  var params = {
    "username": "shinypb",
    "url": undefined
  }
```

Normally, working with that data would mean explicitly checking the values before using them:

```
  if (typeof params.username != 'undefined') {
    if (typeof params.url != 'undefined') {
      console.log("You can learn more about " + username + " at " + url);
    } else {
      console.log(username + " doesn't have a web page.");
    }
  }
```

Options let you define functions that are only ever run in the context you expect. It's pretty common to use `map` and `getOrElse` together for this.

```
  Option(params.username).map(function(username) {
  	Option(params.url).map(function(url) {
      console.log("You can learn more about " + username + " at " + url);
  	}).getOrElse(function() {
      console.log(username + " doesn't have a web page.");
  	};
  });
```

You can also chain operations together, for example:

```
  function isValidUsername(username) { return username.length > 0; }

  Option(params.username).filter(isValidUsername).map(function(validUsername) {
    console.log("Woohoo, your username is valid!");
  }).getOrElse(function() {
    console.log("Sorry, invalid username.");
  });

```

## Usage
Note: If you include option.js in your browser, it will be available as window.OptionJS. This is so it doesn't clobber the predefined Option function in browsers.

option.js exposes a single top level function called Option. Pass it a value to create either a `Some` or a `None`, depending on the value. `null` and `undefined` values will return `None`, all other values will return a `Some` instance containing the value.

### .get
On `None`, calling this will throw a `NoneGetError`.

On a `Some`, calling this will return its value.

This really isn't the preferred way of getting values out of options, but it is possible to use it safely:

```
  var theValue = anOption.isDefined ? anOption.get() : "some default value";
```

Consider using `.getOrElse` instead.

### .getOrElse

This lets you get a value out an option safely, because you provide a fallback value to use if it's empty. For example:

```
  var theValue = anOption.getOrElse("some default value");
```

You can pass any value you like as your fallback. If you provide a function, it will be invoked if the option is empty, and its return value will be returned:

```
  var theValue = anOption.getOrElse(function() {
    return "some default value";
  }
```

### .isDefined
On `None`, returns `false`.

On a `Some`, returns `true`.

### isEmpty
On `None`, returns `true`.

On a `Some`, returns `false`.

### .filter
On `None`, returns `None`.

On a `Some`, calls the given callback with the value, and either returns the original `Some` if the callback returned true, or `None` if the callback returned false.

For example:

```
function isEven(n) { return n % 2 == 0; }

Some(41).filter(isEven); // returns None
Some(42).filter(isEven); // returns Some(42)

```

### .forEach
On `None`, does nothing.

On a `Some`, calls the given callback with the value.

```
Some(41).forEach(function(n) {
  console.log("The value is " + n);
});
```



### .map
On `None`, returns `None`.

On a `Some`, calls the given callback with the value, and returns a new `Some` containing the callback's return value.

For example:

```
Some(41).map(function(n) {
  return 2 * n;
}); // returns Some(82)

```


### .toArray
On `None`, returns an empty array.

On a `Some`, returns an array containing the value.

# License
Option.js is provided under the [Creative Commons Attribution-ShareAlike](http://creativecommons.org/licenses/by-sa/4.0/) license. Feel free to do what you like with it, but please be sure to give attribution.
