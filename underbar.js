(function(){
  /*
  Underbar.co, a port of http://documentcloud.github.com/underscore in Coco.
  (c) 2010 Jeremy Ashkenas, DocumentCloud Inc. + satyr
  Distributed under the MIT license.
  */
  var addToWrapper, bind, breaker, each, filter, flatten, functions, idCounter, identity, isArguments, isArray, isDate, isFunction, isNaN, isNumber, isRegExp, isString, keys, map, nativeEvery, nativeFilter, nativeForEach, nativeLastIndexOf, nativeMap, nativeReduce, nativeReduceRight, nativeSome, pluck, previousUnderbar, reduce, root, toArray, toString, unshift, wrapper, _ref, __owns = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(x){
    for (var i = this.length; i-- && this[i] !== x;); return i;
  }, __slice = Array.prototype.slice, __bind = function(me, fn){ return function(){ return fn.apply(me, arguments); }; }, __import = function(obj, src){
    var own = Object.prototype.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  };
  _.VERSION = '0.1.1.2';
  function _(it){
    return new wrapper(it);
  }
  previousUnderbar = this._;
  root = (this._ = _, this);
  if (typeof exports != "undefined" && exports !== null) {
    exports._ = _;
  }
  breaker = typeof StopIteration != "undefined" && StopIteration !== null ? StopIteration : '__break__';
  toString = Object.prototype.toString;
  _ref = Array.prototype, unshift = _ref.unshift, nativeForEach = _ref.forEach, nativeMap = _ref.map, nativeReduce = _ref.reduce, nativeReduceRight = _ref.reduceRight, nativeFilter = _ref.filter, nativeEvery = _ref.every, nativeSome = _ref.some, nativeLastIndexOf = _ref.lastIndexOf;
  _.each = _.forEach = each = function(obj, iterator, context){
    var i, k, _to;
    try {
      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (isNumber(obj.length)) {
        for (i = 0, _to = obj.length; i < _to; ++i) {
          iterator.call(context, obj[i], i, obj);
        }
      } else {
        for (k in obj) if (__owns.call(obj, k)) {
          iterator.call(context, obj[k], k, obj);
        }
      }
    } catch (e) {
      if (e !== breaker) {
        throw e;
      }
    }
    return obj;
  };
  _.map = map = function(obj, iterator, context){
    var results;
    if (nativeMap && obj.map === nativeMap) {
      return obj.map(iterator, context);
    }
    results = [];
    each(obj, function(value, index, list){
      return results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };
  _.reduce = _.foldl = _.inject = reduce = function(obj, iterator, memo, context){
    var index, initial, value, _len;
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) {
        iterator = bind(iterator, context);
      }
      if (memo === void 8) {
        return obj.reduce(iterator);
      } else {
        return obj.reduce(iterator, memo);
      }
    }
    initial = memo !== void 8;
    for (index = 0, _len = obj.length; index < _len; ++index) {
      value = obj[index];
      memo = initial || index ? iterator.call(context, memo, value, index, obj) : value;
    }
    return memo;
  };
  _.reduceRight = _.foldr = function(obj, iterator, memo, context){
    var reversed;
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) {
        iterator = bind(iterator, context);
      }
      if (memo === void 8) {
        return obj.reduceRight(iterator);
      } else {
        return obj.reduceRight(iterator, memo);
      }
    }
    reversed = (isArray(obj) ? obj.slice() : toArray(obj)).reverse();
    return reduce(reversed, iterator, memo, context);
  };
  _.find = _.detect = function(obj, iterator, context){
    var result;
    result = void 8;
    each(obj, function(value, index, list){
      if (iterator.call(context, value, index, list)) {
        result = value;
        throw breaker;
      }
    });
    return result;
  };
  _.filter = _.select = filter = function(obj, iterator, context){
    var results;
    if (nativeFilter && obj.filter === nativeFilter) {
      return obj.filter(iterator, context);
    }
    results = [];
    each(obj, function(value, index, list){
      if (iterator.call(context, value, index, list)) {
        return results[results.length] = value;
      }
    });
    return results;
  };
  _.reject = function(obj, iterator, context){
    var results;
    results = [];
    each(obj, function(value, index, list){
      if (!iterator.call(context, value, index, list)) {
        return results[results.length] = value;
      }
    });
    return results;
  };
  _.every = _.all = function(obj, iterator, context){
    var index, value, _len;
    iterator == null && (iterator = identity);
    if (nativeEvery && obj.every === nativeEvery) {
      return obj.every(iterator, context);
    }
    for (index = 0, _len = obj.length; index < _len; ++index) {
      value = obj[index];
      if (!iterator.call(context, value, index, obj)) {
        return false;
      }
    }
    return true;
  };
  _.some = _.any = function(obj, iterator, context){
    var index, value, _len;
    iterator == null && (iterator = identity);
    if (nativeSome && obj.some === nativeSome) {
      return obj.some(iterator, context);
    }
    for (index = 0, _len = obj.length; index < _len; ++index) {
      value = obj[index];
      if (iterator.call(context, value, index, obj)) {
        return true;
      }
    }
    return false;
  };
  _.include = _.contains = function(obj, target){
    var key, val;
    if (isArray(obj)) {
      return __indexOf.call(obj, target) >= 0;
    }
    for (key in obj) if (__owns.call(obj, key)) {
      val = obj[key];
      if (target === val) {
        return true;
      }
    }
    return false;
  };
  _.invoke = function(){
    var args, method, obj;
    obj = arguments[0], method = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    return map(obj, function(it){
      if (method) {
        return it[method].apply(it, args);
      } else {
        return it.apply(null, args);
      }
    });
  };
  _.pluck = pluck = function(obj, key){
    return map(obj, function(it){
      return it[key];
    });
  };
  _.max = function(obj, iterator, context){
    var result;
    if (!iterator && isArray(obj)) {
      return Math.max.apply(Math, obj);
    }
    result = {
      computed: -1 / 0
    };
    each(obj, function(value, index, list){
      var computed;
      computed = iterator ? iterator.call(context, value, index, list) : value;
      return computed > result.computed && (result.computed = computed, result.value = value, result);
    });
    return result.value;
  };
  _.min = function(obj, iterator, context){
    var result;
    if (!iterator && isArray(obj)) {
      return Math.min.apply(Math, obj);
    }
    result = {
      computed: 1 / 0
    };
    each(obj, function(value, index, list){
      var computed;
      computed = iterator ? iterator.call(context, value, index, list) : value;
      return computed < result.computed && (result.computed = computed, result.value = value, result);
    });
    return result.value;
  };
  _.sortBy = function(obj, iterator, context){
    return pluck(map(obj, function(value, index, list){
      return {
        value: value,
        key: iterator.call(context, value, index, list)
      };
    }).sort(function(_arg, _arg2){
      var a, b;
      a = _arg.key;
      b = _arg2.key;
      if (a < b) {
        return -1;
      } else {
        return a > b;
      }
    }), 'value');
  };
  _.sortedIndex = function(array, obj, iterator){
    var high, low, mid;
    iterator == null && (iterator = identity);
    low = 0;
    high = array.length;
    while (low < high) {
      mid = low + high >> 1;
      if (iterator(array[mid]) < iterator(obj)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  };
  _.toArray = toArray = function(it){
    if (!it) {
      return [];
    }
    if (it.toArray) {
      return it.toArray();
    }
    if (isArray(it)) {
      return it;
    }
    if (isArguments(it)) {
      return __slice.call(it);
    }
    return _.values(it);
  };
  _.size = function(it){
    return toArray(it).length;
  };
  _.first = _.head = function(array, n, guard){
    if (n && !guard) {
      return __slice.call(array, 0, n);
    } else {
      return array[0];
    }
  };
  _.rest = _.tail = function(array, index, guard){
    return __slice.call(array, (index != null) && !guard ? index : 1);
  };
  _.last = function(it){
    return it[it.length - 1];
  };
  _.compact = function(it){
    return filter(it, identity);
  };
  _.flatten = flatten = function(it){
    return reduce(it, function(memo, value){
      if (isArray(value)) {
        return memo.concat(flatten(value));
      }
      memo[memo.length] = value;
      return memo;
    }, []);
  };
  _.without = function(){
    var array, values;
    array = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return filter(array, function(it){
      return __indexOf.call(values, it) < 0;
    });
  };
  _.uniq = _.unique = function(array, isSorted){
    return reduce(array, function(memo, el, i){
      if (!(i && (isSorted ? memo[memo.length - 1] === el : __indexOf.call(memo, el) >= 0))) {
        memo[memo.length] = el;
      }
      return memo;
    }, []);
  };
  _.intersect = function(){
    var array, rest;
    array = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return filter(_.uniq(array), function(item){
      return _.every(rest, function(it){
        return __indexOf.call(it, item) >= 0;
      });
    });
  };
  _.zip = function(){
    var args, i, length, results;
    args = __slice.call(arguments);
    results = Array(length = Math.max.apply(Math, pluck(args, 'length')));
    for (i = 0; i < length; ++i) {
      results[i] = pluck(args, i);
    }
    return results;
  };
  _.indexOf = function(array, item){
    return __indexOf.call(array, item);
  };
  _.lastIndexOf = function(array, item){
    var i;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return array.lastIndexOf(item);
    }
    i = array.length;
    while (i-- && array[i] !== item) {}
    return i;
  };
  _.range = function(start, stop, step){
    var idx, len, range;
    step == null && (step = 1);
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
    idx = 0;
    range = Array(len = Math.max(0, Math.ceil((stop - start) / step)));
    while (idx < len) {
      range[idx++] = start;
      start += step;
    }
    return range;
  };
  _.bind = bind = function(){
    var args, func, obj;
    func = arguments[0], obj = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    obj == null && (obj = {});
    return function(){
      return func.apply(obj, args.concat.apply(args, arguments));
    };
  };
  _.bindAll = function(obj){
    var name, names, _i, _len;
    names = arguments.length < 2 ? functions(obj) : __slice.call(arguments, 1);
    for (_i = 0, _len = names.length; _i < _len; ++_i) {
      name = names[_i];
      obj[name] = __bind(obj, obj[name]);
    }
    return obj;
  };
  _.memoize = function(func, hasher, memo){
    hasher == null && (hasher = identity);
    memo == null && (memo = {});
    return function(){
      var key;
      if (__owns.call(memo, key = hasher.apply(this, arguments))) {
        return memo[key];
      } else {
        return memo[key] = func.apply(this, arguments);
      }
    };
  };
  _.delay = function(){
    var args, func, wait;
    func = arguments[0], wait = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };
  _.defer = function(){
    var args, func;
    func = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return setTimeout(function(){
      return func.apply(null, args);
    });
  };
  _.wrap = function(func, wrapper){
    return function(){
      return wrapper.apply(null, [func].concat(__slice.call(arguments)));
    };
  };
  _.compose = function(){
    var funcs;
    funcs = __slice.call(arguments);
    return function(){
      var args, fn, _i, _ref;
      args = __slice.call(arguments);
      for (_i = (_ref = funcs).length - 1; _i >= 0; --_i) {
        fn = _ref[_i];
        args = [fn.apply(this, args)];
      }
      return args[0];
    };
  };
  _.keys = keys = Object.keys || function(it){
    var key, _ref, _results = [];
    for (key in _ref = it) if (__owns.call(_ref, key)) {
      _results.push(key);
    }
    return _results;
  };
  _.values = function(it){
    return map(it, identity);
  };
  _.functions = _.methods = functions = function(obj){
    return filter(keys(obj), function(it){
      return isFunction(obj[it]);
    }).sort();
  };
  _.extend = function(it){
    var args, it, key, obj, _i, _len;
    obj = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = args.length; _i < _len; ++_i) {
      it = args[_i];
      for (key in it) if (__owns.call(it, key)) {
        obj[key] = it[key];
      }
    }
    return obj;
  };
  _.clone = function(it){
    var _obj;
    if (isArray(it)) {
      return it.slice();
    } else {
      return _obj = {}, __import(_obj, it);
    }
  };
  _.tap = function(obj, interceptor){
    interceptor(obj);
    return obj;
  };
  _.isEqual = function(a, b){
    var aKeys, atype, bKeys, btype, key;
    if (a === b) {
      return true;
    }
    atype = typeof a;
    btype = typeof b;
    if (atype != btype) {
      return false;
    }
    if (a == b) {
      return true;
    }
    if (!a && b || a && !b) {
      return false;
    }
    if (a.isEqual) {
      return a.isEqual(b);
    }
    if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    }
    if (isNaN(a) && isNaN(b)) {
      return false;
    }
    if (isRegExp(a) && isRegExp(b)) {
      return '' + a === '' + b;
    }
    if (atype !== 'object') {
      return false;
    }
    if (a.length && a.length !== b.length) {
      return false;
    }
    aKeys = keys(a);
    bKeys = keys(b);
    if (aKeys.length != bKeys.length) {
      return false;
    }
    for (key in a) {
      if (!(key in b) || !_.isEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  };
  _.isEmpty = function(it){
    var key, _ref;
    if (isString(it)) {
      return !it.length;
    }
    for (key in _ref = it) if (__owns.call(_ref, key)) {
      return false;
    }
    return true;
  };
  _.isElement = function(it){
    return (typeof it != "undefined" && it !== null ? it.nodeType : void 0) === 1;
  };
  _.isArray = isArray = Array.isArray || function(it){
    return '[object Array]' === toString.call(it);
  };
  _.isFunction = isFunction = function(it){
    return '[object Function]' === toString.call(it);
  };
  _.isNumber = isNumber = function(it){
    return it === +it || '[object Number]' === toString.call(it);
  };
  _.isBoolean = function(it){
    return it === true || it === false;
  };
  _.isString = isString = function(it){
    return '[object String]' === toString.call(it);
  };
  _.isRegExp = isRegExp = function(it){
    return '[object RegExp]' === toString.call(it);
  };
  _.isDate = isDate = function(it){
    return '[object Date]' === toString.call(it);
  };
  _.isNaN = isNaN = function(it){
    return it !== it;
  };
  _.isNull = function(it){
    return it === null;
  };
  _.isUndefined = function(it){
    return it === void 8;
  };
  _.isArguments = isArguments = function(it){
    return !!(typeof it != "undefined" && it !== null ? it.callee : void 0);
  };
  _.noConflict = function(){
    root._ = previousUnderbar;
    return this;
  };
  _.identity = identity = function(it){
    return it;
  };
  _.times = function(n, iterator, context){
    var i, _results = [];
    for (i = 0; i < n; ++i) {
      _results.push(iterator.call(context, i));
    }
    return _results;
  };
  _.breakLoop = function(){
    throw breaker;
  };
  _.mixin = function(obj){
    return each(functions(obj), function(it){
      return addToWrapper(it, _[it] = obj[it]);
    });
  };
  idCounter = 0;
  _.uniqueId = function(prefix){
    prefix == null && (prefix = 0);
    return prefix + ++idCounter;
  };
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g
  };
  _.template = function(str, data){
    var c, func;
    c = _.templateSettings;
    str = str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(c.interpolate, function(match, code){
      return "'," + code.replace(/\\'/g, "'") + ",'";
    });
    if (c.evaluate) {
      str = str.replace(c.evaluate, function(match, code){
        return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
      });
    }
    str = str.replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    func = Function('obj', "var __p = [], print = function(){ __p.push.apply(__p, arguments) }\nwith(obj || {}){ __p.push('" + str + "') }\nreturn __p.join('')");
    if (data) {
      return func(data);
    } else {
      return func;
    }
  };
  wrapper = (function(){
    var _ref;
    function wrapper(_wrapped){
      this._wrapped = _wrapped;
    } wrapper.name = "wrapper";
    _ref = wrapper.prototype;
    _ref.value = function(){
      return this._wrapped;
    };
    _ref.chain = function(){
      return this._chain = this;
    };
    _ref._result = function(it){
      if (this._chain) {
        this._wrapped = it;
        return this;
      } else {
        return it;
      }
    };
    return wrapper;
  }());
  addToWrapper = function(name, func){
    return wrapper.prototype[name] = function(){
      var args;
      args = __slice.call(arguments);
      unshift.call(args, this._wrapped);
      return this._result(func.apply(_, args));
    };
  };
  _.mixin(_);
  _.prototype = wrapper.prototype;
  each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(method){
    wrapper.prototype[method] = function(){
      method.apply(this._wrapped, arguments);
      return this._result(this._wrapped);
    };
    return method = this[method], this;
  }, Array.prototype);
  each(["concat", "join", "slice"], function(method){
    wrapper.prototype[method] = function(){
      return this._result(method.apply(this._wrapped, arguments));
    };
    return method = this[method], this;
  }, Array.prototype);
}).call(this);
