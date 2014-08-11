# cobj [![NPM version](https://badge.fury.io/js/cobj.svg)](http://badge.fury.io/js/cobj) [![Build Status](https://travis-ci.org/kaelzhang/node-cobj.svg?branch=master)](https://travis-ci.org/kaelzhang/node-cobj) [![Dependency Status](https://gemnasium.com/kaelzhang/node-cobj.svg)](https://gemnasium.com/kaelzhang/node-cobj)

Utilities to manage cascading objects.

## Install

```sh
$ npm install cobj --save
```

## Usage

```js
var cobj = require('cobj');
```

### cobj.get(data, key)

```js
var obj = {
  a: 1,
  b: {
    c: 2
  }
};

cobj.get(obj, 'a'); // 1
cobj.get(obj, 'b.c'); // 2
cobj.get(obj, 'd'); // undefined
```

### cobj.set(data, key, value);

```js
var obj = {};
cobj.set(obj, 'a', 1); // obj.a -> 1
cobj.set(obj, 'b.c', 2); // obj.b.c -> 2
cobj.set(obj, 'b.d', 3); // obj.b.c -> 2, obj.b.c -> 3
```

### cobj.remove(data, key);

```js
var obj = {
  a: 1,
  b: {
    c: 2
  }
};
cobj.remove(obj, 'a'); // obj.a -> undefined
cobj.remove(obj, 'b.c'); // obj.b.c -> undefined, obj.b -> {}
cobj.remove(obj, 'd'); // do nothing
```

## License

MIT
