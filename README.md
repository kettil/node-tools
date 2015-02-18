# kettil-tools

## Description

The Module is a collection of helper functions


## Install

```
$ npm install kettil-tools
```

## Usage

### Path
 
#### root([path1[, path2[, ...]]])

Returns the path of the main project.

There is the folder "node_modules" used to find out the path.
The path to the application there must be no folder with this name. 

You can optionally pass multiple paths.


Examples
```
// path_to/project1/node_modules/kettil_tools
var r1 = tools.root() // => path_to/project1

// path_to/project1/node_modules/kettil_tools
var r2 = tools.root('lib') // => path_to/project1/lib

// path_to/project2/node_modules/project1/node_modules/kettil_tools 
var r3 = tools.root() // => path_to/project2

// path_to/project2/node_modules/project1/node_modules/kettil_tools 
var r4 = tools.root('lib') // => path_to/project2/lib

// path_to/project2/node_modules/project1/node_modules/kettil_tools 
var r5 = tools.root('/lib', '..', './public') // => path_to/project2/public
```

### Crypto

#### hash([value[, encoding[, [algorithm]]])

The function returns a hash.
The [node.js crypto module](http://nodejs.org/api/crypto.html#crypto_class_hash) is used.

When the function is called without `value`, a random value is used. 

```
// various possible options
// encoding  = [hex  | binary | base64]
// algorithm = [sha1 | sha256 | sha512]

// tools.hash(value [= random], encoding [= 'hex'], algorithm [= 'sha1']);
var h = tools.hash('name'); 
```

### Object

#### defaults(object, default)

The function is an extension of [defaults-function](http://underscorejs.org/#defaults) 
of the [underscore library](http://underscorejs.org).
It is extended by a recursive mode.

```
var o = tools.defaults({ a: { b: 1 } }, { a: { b: 0, c: 't' }, d: true });
// o = { a: { b: 1, c: 't' }, d: true }
```

#### get(options, key)

The function extracted from a deeply nested object the value and returns it.

```
var o = tools.get({ a: { b: { c: { d: 1 }}}}, 'a.b');
// o = { c: { d: 1 }}

var o = tools.get({ a: { b: { c: { d: 1 }}}}, 'a.b.c');
// o = { d: 1 }
```

#### removedUndefined(object)

The function removes all undefined entries from an object.

```
var o = tools.removedUndefined({a: 1, b: undefined, c: true});
// o = {a: 1, c: true}
```

## Test

```
npm test
```
  
## License
MIT
