'use strict';

var expect = require('chai').expect;
var cobj = require('../');

describe("base: _get", function(){
  var get = cobj._get;
  it("normal get", function(){
    var data = {
      a: 1,
      b: 2
    };

    expect(get(data, ['a'])).to.equal(1);
    expect(get(data, ['b'])).to.equal(2);
  });

  it("namespaces", function(){
    var data = {
      a: {
        b: 1
      }
    };

    expect(get(data, ['a', 'b'])).to.equal(1);
  });

  it("invalid data", function(){
    [
      undefined, 
      null, 
      1, 
      "1", 
      function(){}

    ].forEach(function (data) {
      [
        ['a'],
        ['a', 'b']
      ].forEach(function (keys) {
        expect(get(data, keys)).to.equal(undefined);
      });
    });
  });
});


describe("base: .get(key)", function(){
  var base = {
    data: {
      a: 1,
      b: {
        c: 1
      }
    },
    get: function (key) {
      return cobj.get(base.data, key);
    }
  }
  it(".get() -> undefined", function(){
    expect(base.get()).to.equal();
  });

  it(".get(key)", function(){
    expect(base.get('a')).to.equal(1);
    expect(base.get('c')).to.equal();
  });

  it(".get(namespaces)", function(){
    expect(base.get('b.c')).to.equal(1);
    expect(base.get('b.b')).to.equal();
  });

  it("invalid namespaces", function(){
    expect(base.get('')).to.equal();
    expect(base.get('.')).to.equal();
  });
});


describe("base: .set(key, value)", function(){
  var base = {};
  base.data = {
    a: 1,
    b: {
      c: 1
    },
    d: 1
  };

  base.set = function (key, value) {
    cobj.set(base.data, key, value);
  }

  var data = {
    a: 1,
    b: {
      c: 1
    },
    d: 1
  }

  it(".set(null, value)", function(){
    base.set(null, 1)
    expect(base.data).to.deep.equal(data);
  });

  it("invalid keys", function(){
    base.set('', 1)
    expect(base.data).to.deep.equal(data);

    base.set('.', 1)
    expect(base.data).to.deep.equal(data);
  });

  it("normal", function(){
    base.set('a', 2);
    data.a = 2;
    expect(base.data).to.deep.equal(data);

    base.set('b.c', 2);
    data.b.c = 2;
    expect(base.data).to.deep.equal(data);

    base.set('b.b', 2);
    data.b.b = 2;
    expect(base.data).to.deep.equal(data);

    base.set('e.f', 2);
    data.e = {
      f: 2
    };
    expect(base.data).to.deep.equal(data);
  });

  it(".set(object)", function(){
    base.set({
      f: {
        a: 1
      },
      b: {
        e: 1
      }
    });

    data.f = {a: 1};
    data.b = {e: 1};
    expect(base.data).to.deep.equal(data);
  });
});


describe("base: _set", function(){
  var set = cobj._set;
  it("normal", function(){
    var data = {};
    set(data, ['a'], 1);
    expect(data.a).to.equal(1);
  });

  it("namespaces", function(){
    var data = {};
    set(data, ['a', 'b'], 1);
    expect(data.a.b).to.equal(1);
  });

  it("override", function(){
    var data = {
      a: 1
    };

    set(data, ['a', 'b'], 1);
    expect(data.a.b).to.equal(1);
  });

  it("if a property is an object, not override", function(){
    var data = {
      a: {
        b: 1,
        c: 2
      }
    };

    set(data, ['a', 'b'], 2);
    expect(data.a.b).to.equal(2);
    expect(data.a.c).to.equal(2);
  });
});


describe("base: _remove(data, keys)", function(){
  var remove = cobj._remove;
  it("normal", function(){
    var data = {
      a: 1
    };
    remove(data, ['a']);
    expect(data.a).to.equal();
  });

  it("namespaces", function(){
    var data = {
      a: {
        b: 1,
        c: 2
      }
    };

    remove(data, ['a', 'b']);
    expect(data.a.b).to.equal();
    expect(data.a.c).to.equal(2);
  });

  it("if a property is not defined", function(){
    var data = {
      a: {
        b: 2,
        c: {
          d: 3
        }
      }
    };

    // not found
    remove(data, ['a', 'b', 'c']);
    remove(data, ['a', 'd']);
    remove(data, ['a', 'c', 'd', 'e']);
    expect(data).to.deep.equal({
      a: {
        b: 2,
        c: {
          d: 3
        }
      }
    });
  });
});