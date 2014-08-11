'use strict';

exports.get = get;
exports._get = _get;
exports.set = set;
exports._set = _set;
exports.remove = remove;
exports._remove = _remove;


var mix = require('mix2');


function is_object (subject) {
  return Object(subject) === subject;
}


function _keys (key) {
  if (typeof key !== 'string') {
    return;
  }
  
  var keys = key.split('.').filter(Boolean);
  if (!keys.length) {
    return;
  }

  return keys;
};



// .get() -> undefined
// .get('a')
// .get('a.b')
function get (data, key) {
  var keys = _keys(key);
  return keys && _get(data, keys);
};


function _get (data, keys) {
  var result = data;
  keys.forEach(function (key) {
    result = Object(result) === result
      ? result[key]
      : undefined;
  });

  return result;
};


// .set('a', 1);
// .set('a.b', 1);
function set (data, key, value) {
  if (Object(key) === key) {
    mix(data, key);
    return;
  }

  var keys = _keys(key);
  keys && _set(data, keys, value);
};


// For better testing
function _set (data, keys, value) {
  var i = 0;
  var prop;
  var length = keys.length;
  for(; i < length; i ++){
    prop = keys[i];
    if (i === length - 1) {
      // if the last key, set value
      data[prop] = value;
      return;
    }

    if (
      !(prop in data)

      // If the current value is not an object, we will override it.
      // The logic who invoke `.set()` method should make sure `data[prop]` is an object,
      // which `.set()` doesn't concern
      || !is_object(data[prop])
    ) {
      data[prop] = {};
    }

    data = data[prop];
  }
};


function remove (data, key) {
  var keys = _keys(key);
  keys && _remove(data, keys);
};


function _remove (data, keys) {
  var length = keys.length;
  var i = 0;
  var key;

  for (; i < length; i ++){
    if (!is_object(data)) {
      break;
    }
    
    key = keys[i];
    if (i === length - 1) {
      delete data[key];
    } else {
      data = data[key];
    }
  }
};
