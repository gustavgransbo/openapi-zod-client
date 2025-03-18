import path from 'node:path';
import { snakeToCamel, capitalize, kebabToCamel, get, getSum, sortObjKeysFromArray, sortBy, sortListFromRefArray, pick as pick$1 } from 'pastable/server';
import { match, P } from 'ts-pattern';
import { create } from 'handlebars';
import prettier from 'prettier';
import parserTypescript from 'prettier/parser-typescript';
import { ts, t } from 'tanu';
import { sync } from 'whence';
import { isReferenceObject as isReferenceObject$1, isSchemaObject } from 'openapi3-ts/oas31';

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}

var asComponentSchema = function asComponentSchema(name) {
  return "#/components/schemas/".concat(name);
};
function normalizeString(text) {
  var prefixed = prefixStringStartingWithNumberIfNeeded(text);
  return prefixed.normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
  .trim() // Remove whitespace from both sides of a string (optional)
  .replace(/\s+/g, "_") // Replace spaces with _
  .replace(/-+/g, "_") // Replace - with _
  .replace(/[^\w\-]+/g, "_") // Remove all non-word chars
  .replace(/--+/g, "-"); // Replace multiple - with single -
}
var wrapWithQuotesIfNeeded = function wrapWithQuotesIfNeeded(str) {
  if (/^[a-zA-Z]\w*$/.test(str)) {
    return str;
  }
  return "\"".concat(str, "\"");
};
var prefixStringStartingWithNumberIfNeeded = function prefixStringStartingWithNumberIfNeeded(str) {
  var firstAsNumber = Number(str[0]);
  if (typeof firstAsNumber === "number" && !Number.isNaN(firstAsNumber)) {
    return "_" + str;
  }
  return str;
};
var pathParamWithBracketsRegex = /({\w+})/g;
var wordPrecededByNonWordCharacter = /[^\w\-]+/g;
var pathParamToVariableName = function pathParamToVariableName(name) {
  // Replace all underscores with # to preserve them when doing snakeToCamel
  var preserveUnderscore = name.replaceAll("_", "#");
  return snakeToCamel(preserveUnderscore.replaceAll("-", "_")).replaceAll("#", "_");
};
var matcherRegex = /{(\b\w+(?:-\w+)*\b)}/g;
var replaceHyphenatedPath = function replaceHyphenatedPath(path) {
  var matches = path.match(matcherRegex);
  if (matches === null) {
    return path.replaceAll(matcherRegex, ":$1");
  }
  matches.forEach(function (match) {
    var replacement = pathParamToVariableName(match.replaceAll(matcherRegex, ":$1"));
    path = path.replaceAll(match, replacement);
  });
  return path;
};

/** @example turns `/media-objects/{id}` into `MediaObjectsId` */
var pathToVariableName = function pathToVariableName(path) {
  return capitalize(kebabToCamel(path).replaceAll("/", "")) // /media-objects/{id} -> MediaObjects{id}
  .replace(pathParamWithBracketsRegex, function (group) {
    return capitalize(group.slice(1, -1));
  }) // {id} -> Id
  .replace(wordPrecededByNonWordCharacter, "_");
}; // "/robots.txt" -> "/robots_txt"

var isPrimitiveType$1 = function isPrimitiveType(type) {
  return primitiveTypeList$1.includes(type);
};
var primitiveTypeList$1 = ["string", "number", "integer", "boolean", "null"];
var escapeControlCharacters = function escapeControlCharacters(str) {
  return str.replace(/\t/g, "\\t") // U+0009
  .replace(/\n/g, "\\n") // U+000A
  .replace(/\r/g, "\\r") // U+000D
  .replace(/([\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\uFFFE\uFFFF])/g, function (_m, p1) {
    var dec = p1.codePointAt();
    var hex = dec.toString(16);
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    if (dec <= 0xff) return "\\x".concat("00".concat(hex).slice(-2));
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    return "\\u".concat("0000".concat(hex).slice(-4));
  }).replace(/\//g, "\\/");
};
var toBoolean = function toBoolean(value, defaultValue) {
  return match(value)["with"](P.string.regex(/^false$/i), false, function () {
    return false;
  })["with"](P.string.regex(/^true$/i), true, function () {
    return true;
  }).otherwise(function () {
    return defaultValue;
  });
};

function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

var getHandlebars = function getHandlebars() {
  var instance = create();
  instance.registerHelper("ifeq", function (a, b, options) {
    if (a === b) {
      // @ts-expect-error
      return options.fn(this);
    }

    // @ts-expect-error
    return options.inverse(this);
  });
  instance.registerHelper("ifNotEmptyObj", function (obj, options) {
    if (_typeof(obj) === "object" && Object.keys(obj).length > 0) {
      // @ts-expect-error
      return options.fn(this);
    }

    // @ts-expect-error
    return options.inverse(this);
  });
  instance.registerHelper("toCamelCase", function (input) {
    // Check if input string is already in camelCase
    if (/^[a-z][a-zA-Z0-9]*$/.test(input)) {
      return input;
    }
    var words = input.split(/[\s_-]/);
    return words.map(function (word, index) {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join("");
  });
  return instance;
};

/** @see https://github.dev/stephenh/ts-poet/blob/5ea0dbb3c9f1f4b0ee51a54abb2d758102eda4a2/src/Code.ts#L231 */

function maybePretty(input, options) {
  try {
    return prettier.format(input.trim(), _objectSpread2({
      parser: "typescript",
      plugins: [parserTypescript]
    }, options));
  } catch (_unused) {
    return input; // assume it's invalid syntax and ignore
  }
}

function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

// taken from
// https://github.dev/metadevpro/openapi3-ts/blob/a62ff445207af599f591532ef776e671c456cc37/src/model/OpenApi.ts#L261-L269
// to avoid the runtime dependency on `openapi3-ts`
// which itself depends on `yaml` import (which use CJS `require` and thus can't be imported in a ESM module)

/**
 * A type guard to check if the given value is a `ReferenceObject`.
 * See https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
 *
 * @param obj The value to check.
 */
function isReferenceObject(obj) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, "$ref");
}

var getOpenApiDependencyGraph = function getOpenApiDependencyGraph(schemaRef, getSchemaByRef) {
  var visitedsRefs = {};
  var refsDependencyGraph = {};
  var _visit = function visit(schema, fromRef) {
    if (!schema) return;
    if (isReferenceObject(schema)) {
      if (!refsDependencyGraph[fromRef]) {
        refsDependencyGraph[fromRef] = new Set();
      }
      refsDependencyGraph[fromRef].add(schema.$ref);
      if (visitedsRefs[schema.$ref]) return;
      visitedsRefs[fromRef] = true;
      _visit(getSchemaByRef(schema.$ref), schema.$ref);
      return;
    }
    if (schema.allOf) {
      var _iterator = _createForOfIteratorHelper(schema.allOf),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var allOf = _step.value;
          _visit(allOf, fromRef);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return;
    }
    if (schema.oneOf) {
      var _iterator2 = _createForOfIteratorHelper(schema.oneOf),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var oneOf = _step2.value;
          _visit(oneOf, fromRef);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return;
    }
    if (schema.anyOf) {
      var _iterator3 = _createForOfIteratorHelper(schema.anyOf),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var anyOf = _step3.value;
          _visit(anyOf, fromRef);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return;
    }
    if (schema.type === "array") {
      if (!schema.items) return;
      return void _visit(schema.items, fromRef);
    }
    if (schema.type === "object" || schema.properties || schema.additionalProperties) {
      if (schema.properties) {
        for (var property in schema.properties) {
          _visit(schema.properties[property], fromRef);
        }
      }
      if (schema.additionalProperties && _typeof(schema.additionalProperties) === "object") {
        _visit(schema.additionalProperties, fromRef);
      }
    }
  };
  schemaRef.forEach(function (ref) {
    return _visit(getSchemaByRef(ref), ref);
  });
  var deepDependencyGraph = {};
  var visitedsDeepRefs = {};
  schemaRef.forEach(function (ref) {
    var deps = refsDependencyGraph[ref];
    if (!deps) return;
    if (!deepDependencyGraph[ref]) {
      deepDependencyGraph[ref] = new Set();
    }
    var _visit2 = function visit(dep) {
      deepDependencyGraph[ref].add(dep);
      if (refsDependencyGraph[dep] && ref !== dep) {
        refsDependencyGraph[dep].forEach(function (transitive) {
          if (visitedsDeepRefs[ref + "__" + transitive]) return;
          visitedsDeepRefs[ref + "__" + transitive] = true;
          _visit2(transitive);
        });
      }
    };
    deps.forEach(function (dep) {
      return _visit2(dep);
    });
  });
  return {
    refsDependencyGraph: refsDependencyGraph,
    deepDependencyGraph: deepDependencyGraph
  };
};

var autocorrectRef = function autocorrectRef(ref) {
  return ref[1] === "/" ? ref : "#/" + ref.slice(1);
};
var makeSchemaResolver = function makeSchemaResolver(doc) {
  // both used for debugging purpose
  // eslint-disable-next-line sonarjs/no-unused-collection
  var nameByRef = new Map();
  // eslint-disable-next-line sonarjs/no-unused-collection
  var refByName = new Map();
  var byRef = new Map();
  var byNormalized = new Map();
  var getSchemaByRef = function getSchemaByRef(ref) {
    var _get;
    // #components -> #/components
    var correctRef = autocorrectRef(ref);
    var split = correctRef.split("/");

    // "#/components/schemas/Something.jsonld" -> #/components/schemas
    var path = split.slice(1, -1).join("/");
    var map = (_get = get(doc, path.replace("#/", "").replace("#", "").replaceAll("/", "."))) !== null && _get !== void 0 ? _get : {};

    // "#/components/schemas/Something.jsonld" -> "Something.jsonld"
    var name = split[split.length - 1];
    var normalized = normalizeString(name);
    nameByRef.set(correctRef, normalized);
    refByName.set(normalized, correctRef);
    var infos = {
      ref: correctRef,
      name: name,
      normalized: normalized
    };
    byRef.set(infos.ref, infos);
    byNormalized.set(infos.normalized, infos);

    // doc.components.schemas["Something.jsonld"]
    return map[name];
  };
  return {
    getSchemaByRef: getSchemaByRef,
    resolveRef: function resolveRef(ref) {
      return byRef.get(autocorrectRef(ref));
    },
    resolveSchemaName: function resolveSchemaName(normalized) {
      return byNormalized.get(normalized);
    }
  };
};

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

var complexityByType = function complexityByType(schema) {
  var type = schema.type;
  if (!type) return 0;
  return match(type)["with"]("string", function () {
    return 1;
  })["with"]("number", function () {
    return 1;
  })["with"]("integer", function () {
    return 1;
  })["with"]("boolean", function () {
    return 1;
  })["with"]("null", function () {
    return 1;
  }).otherwise(function () {
    return 0;
  });
};
var complexityByComposite = function complexityByComposite(from) {
  if (!from) return 0;
  return match(from)["with"]("oneOf", function () {
    return 2;
  })["with"]("anyOf", function () {
    return 3;
  })["with"]("allOf", function () {
    return 2;
  })["with"]("enum", function () {
    return 1;
  })["with"]("array", function () {
    return 1;
  })["with"]("record", function () {
    return 1;
  })["with"]("empty-object", function () {
    return 1;
  })["with"]("object", function () {
    return 2;
  }).otherwise(function () {
    return 0;
  });
};
function getSchemaComplexity(_ref) {
  var current = _ref.current,
    schema = _ref.schema;
  if (!schema) return current;
  if (isReferenceObject(schema)) return current + 2;
  if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return complexityByComposite("oneOf") + getSchemaComplexity({
        current: current,
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: schema.type[0]
        })
      });
    }
    return current + complexityByComposite("oneOf") + getSum(schema.type.map(function (prop) {
      return getSchemaComplexity({
        current: 0,
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: prop
        })
      });
    }));
  }
  if (schema.type === "null") {
    return current + complexityByType(_objectSpread2(_objectSpread2({}, schema), {}, {
      type: "null"
    }));
  }
  if (schema.oneOf) {
    if (schema.oneOf.length === 1) {
      return complexityByComposite("oneOf") + getSchemaComplexity({
        current: current,
        schema: schema.oneOf[0]
      });
    }
    return current + complexityByComposite("oneOf") + getSum(schema.oneOf.map(function (prop) {
      return getSchemaComplexity({
        current: 0,
        schema: prop
      });
    }));
  }

  // anyOf = oneOf but with 1 or more = `T extends oneOf ? T | T[] : never`
  if (schema.anyOf) {
    if (schema.anyOf.length === 1) {
      return complexityByComposite("anyOf") + getSchemaComplexity({
        current: current,
        schema: schema.anyOf[0]
      });
    }
    return current + complexityByComposite("anyOf") + getSum(schema.anyOf.map(function (prop) {
      return getSchemaComplexity({
        current: 0,
        schema: prop
      });
    }));
  }
  if (schema.allOf) {
    if (schema.allOf.length === 1) {
      return complexityByComposite("allOf") + getSchemaComplexity({
        current: current,
        schema: schema.allOf[0]
      });
    }
    return current + complexityByComposite("allOf") + getSum(schema.allOf.map(function (prop) {
      return getSchemaComplexity({
        current: 0,
        schema: prop
      });
    }));
  }
  if (!schema.type) return current;
  if (isPrimitiveType$1(schema.type)) {
    if (schema["enum"]) {
      return current + complexityByType(schema) + complexityByComposite("enum") + getSum(schema["enum"].map(function (prop) {
        return getSchemaComplexity({
          current: 0,
          schema: prop
        });
      }));
    }
    return current + complexityByType(schema);
  }
  if (schema.type === "array") {
    if (schema.items) {
      return complexityByComposite("array") + getSchemaComplexity({
        current: current,
        schema: schema.items
      });
    }
    return complexityByComposite("array") + getSchemaComplexity({
      current: current,
      schema: undefined
    });
  }
  if (schema.type === "object" || schema.properties || schema.additionalProperties) {
    if (schema.additionalProperties) {
      if (schema.additionalProperties === true) {
        return complexityByComposite("record") + getSchemaComplexity({
          current: current,
          schema: undefined
        });
      }
      return complexityByComposite("record") + getSchemaComplexity({
        current: current,
        schema: schema.additionalProperties
      });
    }
    if (schema.properties) {
      var props = Object.values(schema.properties);
      return current + complexityByComposite("object") + getSum(props.map(function (prop) {
        return getSchemaComplexity({
          current: 0,
          schema: prop
        });
      }));
    }
    return complexityByComposite("empty-object") + getSchemaComplexity({
      current: current,
      schema: undefined
    });
  }
  return current;
}

var CodeMeta = /*#__PURE__*/function () {
  function CodeMeta(schema, ctx) {
    var _meta$referencedBy;
    var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, CodeMeta);
    _defineProperty(this, "children", []);
    this.schema = schema;
    this.ctx = ctx;
    if (isReferenceObject(schema)) {
      this.ref = schema.$ref;
    }

    // @ts-expect-error
    this.meta = _objectSpread2({}, meta);
    this.meta.referencedBy = _toConsumableArray((_meta$referencedBy = meta === null || meta === void 0 ? void 0 : meta.referencedBy) !== null && _meta$referencedBy !== void 0 ? _meta$referencedBy : []);
    if (this.ref) {
      this.meta.referencedBy.push(this);
    }
  }
  return _createClass(CodeMeta, [{
    key: "codeString",
    get: function get() {
      if (this.code) return this.code;
      return this.ctx ? this.ctx.resolver.resolveRef(this.ref).normalized : this.ref;
    }
  }, {
    key: "complexity",
    get: function get() {
      return getSchemaComplexity({
        current: 0,
        schema: this.schema
      });
    }
  }, {
    key: "assign",
    value: function assign(code) {
      this.code = code;
      return this;
    }
  }, {
    key: "inherit",
    value: function inherit(parent) {
      if (parent) {
        parent.children.push(this);
      }
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.codeString;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.codeString;
    }
  }]);
}();

var isBrokenAllOfItem = function isBrokenAllOfItem(item) {
  if (!isReferenceObject$1(item) && !!item.required && !item.type && !item.properties && !(item !== null && item !== void 0 && item.allOf) && !(item !== null && item !== void 0 && item.anyOf) && !item.oneOf) {
    return true;
  }
  return false;
};
function inferRequiredSchema(schema) {
  if (!schema.allOf) {
    throw new Error("function inferRequiredSchema is specialized to handle item with required only in an allOf array.");
  }
  var _schema$allOf$reduce = schema.allOf.reduce(function (acc, cur) {
      if (isBrokenAllOfItem(cur)) {
        var _acc$;
        var required = cur.required;
        (_acc$ = acc[0]).push.apply(_acc$, _toConsumableArray(required !== null && required !== void 0 ? required : []));
      } else {
        acc[1].push(cur);
      }
      return acc;
    }, [[], []]),
    _schema$allOf$reduce2 = _slicedToArray(_schema$allOf$reduce, 2),
    standaloneRequisites = _schema$allOf$reduce2[0],
    noRequiredOnlyAllof = _schema$allOf$reduce2[1];
  var composedRequiredSchema = {
    properties: standaloneRequisites.reduce(function (acc, cur) {
      acc[cur] = {
        // type: "unknown" as SchemaObject["type"],
      };
      return acc;
    }, {}),
    type: "object",
    required: standaloneRequisites
  };
  return {
    noRequiredOnlyAllof: noRequiredOnlyAllof,
    composedRequiredSchema: composedRequiredSchema,
    patchRequiredSchemaInLoop: function patchRequiredSchemaInLoop(prop, resolver) {
      if (isReferenceObject$1(prop)) {
        var refType = resolver.getSchemaByRef(prop.$ref);
        if (refType) {
          composedRequiredSchema.required.forEach(function (required) {
            var _refType$properties$r, _refType$properties;
            composedRequiredSchema.properties[required] = (_refType$properties$r = refType === null || refType === void 0 || (_refType$properties = refType.properties) === null || _refType$properties === void 0 ? void 0 : _refType$properties[required]) !== null && _refType$properties$r !== void 0 ? _refType$properties$r : {};
          });
        }
      } else {
        var _prop$properties;
        var properties = (_prop$properties = prop["properties"]) !== null && _prop$properties !== void 0 ? _prop$properties : {};
        composedRequiredSchema.required.forEach(function (required) {
          if (properties[required]) {
            var _properties$required;
            composedRequiredSchema.properties[required] = (_properties$required = properties[required]) !== null && _properties$required !== void 0 ? _properties$required : {};
          }
        });
      }
    }
  };
}

/**
 * @see https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject
 * @see https://github.com/colinhacks/zod
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function getZodSchema(_ref) {
  var _options$schemaRefine, _options$schemaRefine2;
  var $schema = _ref.schema,
    ctx = _ref.ctx,
    inheritedMeta = _ref.meta,
    options = _ref.options;
  if (!$schema) {
    throw new Error("Schema is required");
  }
  var schema = (_options$schemaRefine = options === null || options === void 0 || (_options$schemaRefine2 = options.schemaRefiner) === null || _options$schemaRefine2 === void 0 ? void 0 : _options$schemaRefine2.call(options, $schema, inheritedMeta)) !== null && _options$schemaRefine !== void 0 ? _options$schemaRefine : $schema;
  var code = new CodeMeta(schema, ctx, inheritedMeta);
  var meta = {
    parent: code.inherit(inheritedMeta === null || inheritedMeta === void 0 ? void 0 : inheritedMeta.parent),
    referencedBy: _toConsumableArray(code.meta.referencedBy)
  };
  var refsPath = code.meta.referencedBy.slice(0, -1).map(function (prev) {
    return ctx ? ctx.resolver.resolveRef(prev.ref).normalized : prev.ref;
  });
  if (isReferenceObject(schema)) {
    var _ctx$resolver$resolve;
    if (!ctx) throw new Error("Context is required");
    var schemaName = (_ctx$resolver$resolve = ctx.resolver.resolveRef(schema.$ref)) === null || _ctx$resolver$resolve === void 0 ? void 0 : _ctx$resolver$resolve.normalized;

    // circular(=recursive) reference
    if (refsPath.length > 1 && refsPath.includes(schemaName)) {
      return code.assign(ctx.zodSchemaByName[code.ref]);
    }
    var result = ctx.zodSchemaByName[schema.$ref];
    if (!result) {
      var actualSchema = ctx.resolver.getSchemaByRef(schema.$ref);
      if (!actualSchema) {
        throw new Error("Schema ".concat(schema.$ref, " not found"));
      }
      result = getZodSchema({
        schema: actualSchema,
        ctx: ctx,
        meta: meta,
        options: options
      }).toString();
    }
    if (ctx.zodSchemaByName[schemaName]) {
      return code;
    }
    ctx.zodSchemaByName[schemaName] = result;
    return code;
  }
  if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return getZodSchema({
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: schema.type[0]
        }),
        ctx: ctx,
        meta: meta,
        options: options
      });
    }
    // if (schema.type.length === 2 &&
    //     schema.type.some(item => item === "null")) {
    //     const nonNullType = schema.type.find(item => item !== "null");
    //     const type = getZodSchema({ schema: { ...schema, type: nonNullType }, ctx, meta, options });
    //     return code.assign(`${type.toString()}.nullable()`);
    // }

    return code.assign("z.union([".concat(schema.type.map(function (prop) {
      return getZodSchema({
        schema: _objectSpread2(_objectSpread2({}, schema), {}, {
          type: prop
        }),
        ctx: ctx,
        meta: meta,
        options: options
      });
    }).join(", "), "])"));
  }
  if (schema.type === "null") {
    return code.assign("z.null()");
  }
  if (schema.oneOf) {
    var _schema$oneOf;
    if (schema.oneOf.length === 1) {
      var type = getZodSchema({
        schema: schema.oneOf[0],
        ctx: ctx,
        meta: meta,
        options: options
      });
      return code.assign(type.toString());
    }

    /* when there are multiple allOf we are unable to use a discriminatedUnion as this library adds an
     *   'z.and' to the schema that it creates which breaks type inference */
    var hasMultipleAllOf = (_schema$oneOf = schema.oneOf) === null || _schema$oneOf === void 0 ? void 0 : _schema$oneOf.some(function (obj) {
      return isSchemaObject(obj) && ((obj === null || obj === void 0 ? void 0 : obj.allOf) || []).length > 1;
    });
    if (schema.discriminator && !hasMultipleAllOf) {
      var propertyName = schema.discriminator.propertyName;
      return code.assign("\n                z.discriminatedUnion(\"".concat(propertyName, "\", [").concat(schema.oneOf.map(function (prop) {
        return getZodSchema({
          schema: prop,
          ctx: ctx,
          meta: meta,
          options: options
        });
      }).join(", "), "])\n            "));
    }
    return code.assign("z.union([".concat(schema.oneOf.map(function (prop) {
      return getZodSchema({
        schema: prop,
        ctx: ctx,
        meta: meta,
        options: options
      });
    }).join(", "), "])"));
  }

  // anyOf = oneOf but with 1 or more = `T extends oneOf ? T | T[] : never`
  if (schema.anyOf) {
    if (schema.anyOf.length === 1) {
      var _type = getZodSchema({
        schema: schema.anyOf[0],
        ctx: ctx,
        meta: meta,
        options: options
      });
      return code.assign(_type.toString());
    }
    var types = schema.anyOf.map(function (prop) {
      return getZodSchema({
        schema: prop,
        ctx: ctx,
        meta: meta,
        options: options
      });
    }).map(function (type) {
      if ("type" in type.schema) {
        if (Array.isArray(type.schema.type)) ; else {
          var _schemaType = type.schema.type.toLowerCase();
          !isPrimitiveType$1(_schemaType);
        }
      }
      return type.toString();
    }).join(", ");
    return code.assign("z.union([".concat(types, "])"));
  }
  if (schema.allOf) {
    if (schema.allOf.length === 1) {
      var _type2 = getZodSchema({
        schema: schema.allOf[0],
        ctx: ctx,
        meta: meta,
        options: options
      });
      return code.assign(_type2.toString());
    }
    var _inferRequiredSchema = inferRequiredSchema(schema),
      patchRequiredSchemaInLoop = _inferRequiredSchema.patchRequiredSchemaInLoop,
      noRequiredOnlyAllof = _inferRequiredSchema.noRequiredOnlyAllof,
      composedRequiredSchema = _inferRequiredSchema.composedRequiredSchema;
    var _types = noRequiredOnlyAllof.map(function (prop) {
      var zodSchema = getZodSchema({
        schema: prop,
        ctx: ctx,
        meta: meta,
        options: options
      });
      (ctx === null || ctx === void 0 ? void 0 : ctx.resolver) && patchRequiredSchemaInLoop(prop, ctx.resolver);
      return zodSchema;
    });
    if (composedRequiredSchema.required.length) {
      _types.push(getZodSchema({
        schema: composedRequiredSchema,
        ctx: ctx,
        meta: meta,
        options: options
      }));
    }
    var first = _types.at(0);
    var rest = _types.slice(1).map(function (type) {
      return "and(".concat(type.toString(), ")");
    }).join(".");
    return code.assign("".concat(first.toString(), ".").concat(rest));
  }
  var schemaType = schema.type ? schema.type.toLowerCase() : undefined;
  if (schemaType && isPrimitiveType$1(schemaType)) {
    if (schema["enum"]) {
      if (schemaType === "string") {
        if (schema["enum"].length === 1) {
          var value = schema["enum"][0];
          var valueString = value === null ? "null" : "\"".concat(value, "\"");
          return code.assign("z.literal(".concat(valueString, ")"));
        }

        // eslint-disable-next-line sonarjs/no-nested-template-literals
        return code.assign("z.enum([".concat(schema["enum"].map(function (value) {
          return value === null ? "null" : "\"".concat(value, "\"");
        }).join(", "), "])"));
      }
      if (schema["enum"].some(function (e) {
        return typeof e === "string";
      })) {
        return code.assign("z.never()");
      }
      if (schema["enum"].length === 1) {
        var _value = schema["enum"][0];
        return code.assign("z.literal(".concat(_value === null ? "null" : _value, ")"));
      }
      return code.assign(// eslint-disable-next-line sonarjs/no-nested-template-literals
      "z.union([".concat(schema["enum"].map(function (value) {
        return "z.literal(".concat(value === null ? "null" : value, ")");
      }).join(", "), "])"));
    }
    if (schema["const"]) {
      var _value2 = schema["const"];
      var _valueString = "";
      if (schemaType === "string") {
        _valueString = _value2 === null ? "null" : "\"".concat(_value2, "\"");
      } else {
        _valueString = _value2 === null ? "null" : _value2;
      }
      return code.assign("z.literal(".concat(_valueString, ")"));
    }
    return code.assign(match(schemaType)["with"]("integer", function () {
      return "z.number()";
    })["with"]("string", function () {
      return match(schema.format)["with"]("binary", function () {
        return "z.instanceof(File)";
      }).otherwise(function () {
        return "z.string()";
      });
    }).otherwise(function (type) {
      return "z.".concat(type, "()");
    }));
  }
  var readonly = options !== null && options !== void 0 && options.allReadonly ? ".readonly()" : "";
  if (schemaType === "array") {
    if (schema.items) {
      return code.assign("z.array(".concat(getZodSchema({
        schema: schema.items,
        ctx: ctx,
        meta: meta,
        options: options
      }).toString()).concat(getZodChain({
        schema: schema.items,
        meta: _objectSpread2(_objectSpread2({}, meta), {}, {
          isRequired: true
        }),
        options: options
      }), ")").concat(readonly));
    }
    return code.assign("z.array(z.any())".concat(readonly));
  }
  if (schemaType === "object" || schema.properties || schema.additionalProperties) {
    var _schema$required;
    // additional properties default to true if additionalPropertiesDefaultValue not provided
    var additionalPropsDefaultValue = (options === null || options === void 0 ? void 0 : options.additionalPropertiesDefaultValue) !== undefined ? options === null || options === void 0 ? void 0 : options.additionalPropertiesDefaultValue : true;
    var additionalProps = schema.additionalProperties === null || schema.additionalProperties === undefined ? additionalPropsDefaultValue : schema.additionalProperties;
    var additionalPropsSchema = additionalProps === false ? "" : ".passthrough()";
    if (_typeof(schema.additionalProperties) === "object" && Object.keys(schema.additionalProperties).length > 0) {
      return code.assign("z.record(".concat((getZodSchema({
        schema: schema.additionalProperties,
        ctx: ctx,
        meta: meta,
        options: options
      }) + getZodChain({
        schema: schema.additionalProperties,
        meta: _objectSpread2(_objectSpread2({}, meta), {}, {
          isRequired: true
        }),
        options: options
      })).toString(), ")"));
    }
    var hasRequiredArray = schema.required && schema.required.length > 0;
    var isPartial = options !== null && options !== void 0 && options.withImplicitRequiredProps ? false : !((_schema$required = schema.required) !== null && _schema$required !== void 0 && _schema$required.length);
    var properties = "{}";
    if (schema.properties) {
      var propsMap = Object.entries(schema.properties).map(function (_ref2) {
        var _schema$required2;
        var _ref3 = _slicedToArray(_ref2, 2),
          prop = _ref3[0],
          propSchema = _ref3[1];
        var propMetadata = _objectSpread2(_objectSpread2({}, meta), {}, {
          isRequired: isPartial ? true : hasRequiredArray ? (_schema$required2 = schema.required) === null || _schema$required2 === void 0 ? void 0 : _schema$required2.includes(prop) : options === null || options === void 0 ? void 0 : options.withImplicitRequiredProps,
          name: prop
        });
        var propActualSchema = propSchema;
        if (isReferenceObject(propSchema) && ctx !== null && ctx !== void 0 && ctx.resolver) {
          propActualSchema = ctx.resolver.getSchemaByRef(propSchema.$ref);
          if (!propActualSchema) {
            throw new Error("Schema ".concat(propSchema.$ref, " not found"));
          }
        }
        var propCode = getZodSchema({
          schema: propSchema,
          ctx: ctx,
          meta: propMetadata,
          options: options
        }) + getZodChain({
          schema: propActualSchema,
          meta: propMetadata,
          options: options
        });
        return [prop, propCode.toString()];
      });
      properties = "{ " + propsMap.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          prop = _ref5[0],
          propSchema = _ref5[1];
        return "".concat(wrapWithQuotesIfNeeded(prop), ": ").concat(propSchema);
      }).join(", ") + " }";
    }
    var partial = isPartial ? ".partial()" : "";
    var strict = options !== null && options !== void 0 && options.strictObjects ? ".strict()" : "";
    return code.assign("z.object(".concat(properties, ")").concat(partial).concat(strict).concat(additionalPropsSchema).concat(readonly));
  }
  if (!schemaType) return code.assign("z.unknown()");

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error("Unsupported schema type: ".concat(schemaType));
}
var getZodChain = function getZodChain(_ref6) {
  var schema = _ref6.schema,
    meta = _ref6.meta,
    options = _ref6.options;
  var chains = [];
  match(schema.type)["with"]("string", function () {
    return chains.push(getZodChainableStringValidations(schema));
  })["with"]("number", "integer", function () {
    return chains.push(getZodChainableNumberValidations(schema));
  })["with"]("array", function () {
    return chains.push(getZodChainableArrayValidations(schema));
  }).otherwise(function () {
    return void 0;
  });
  if (typeof schema.description === "string" && schema.description !== "" && options !== null && options !== void 0 && options.withDescription) {
    if (["\n", "\r", "\r\n"].some(function (c) {
      return String.prototype.includes.call(schema.description, c);
    })) {
      chains.push("describe(`".concat(schema.description, "`)"));
    } else {
      chains.push("describe(\"".concat(schema.description, "\")"));
    }
  }
  var output = chains.concat(getZodChainablePresence(schema, meta), (options === null || options === void 0 ? void 0 : options.withDefaultValues) !== false ? getZodChainableDefault(schema) : []).filter(Boolean).join(".");
  return output ? ".".concat(output) : "";
};
var getZodChainablePresence = function getZodChainablePresence(schema, meta) {
  if (schema.nullable && !(meta !== null && meta !== void 0 && meta.isRequired)) {
    return "nullish()";
  }
  if (schema.nullable) {
    return "nullable()";
  }
  if (!(meta !== null && meta !== void 0 && meta.isRequired)) {
    return "optional()";
  }
  return "";
};

// TODO OA prefixItems -> z.tuple
var unwrapQuotesIfNeeded = function unwrapQuotesIfNeeded(value) {
  if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
};
var getZodChainableDefault = function getZodChainableDefault(schema) {
  if (schema["default"] !== undefined) {
    var value = match(schema.type)["with"]("number", "integer", function () {
      return unwrapQuotesIfNeeded(schema["default"]);
    }).otherwise(function () {
      return JSON.stringify(schema["default"]);
    });
    return "default(".concat(value, ")");
  }
  return "";
};
var formatPatternIfNeeded = function formatPatternIfNeeded(pattern) {
  if (pattern.startsWith("/") && pattern.endsWith("/")) {
    pattern = pattern.slice(1, -1);
  }
  pattern = escapeControlCharacters(pattern);
  return pattern.includes("\\u") || pattern.includes("\\p") ? "/".concat(pattern, "/u") : "/".concat(pattern, "/");
};
var getZodChainableStringValidations = function getZodChainableStringValidations(schema) {
  var validations = [];
  if (!schema["enum"]) {
    if (schema.minLength !== undefined) {
      validations.push("min(".concat(schema.minLength, ")"));
    }
    if (schema.maxLength !== undefined) {
      validations.push("max(".concat(schema.maxLength, ")"));
    }
  }
  if (schema.pattern) {
    validations.push("regex(".concat(formatPatternIfNeeded(schema.pattern), ")"));
  }
  if (schema.format) {
    var chain = match(schema.format)["with"]("email", function () {
      return "email()";
    })["with"]("hostname", function () {
      return "url()";
    })["with"]("uri", function () {
      return "url()";
    })["with"]("uuid", function () {
      return "uuid()";
    })["with"]("date-time", function () {
      return "datetime({ offset: true })";
    }).otherwise(function () {
      return "";
    });
    if (chain) {
      validations.push(chain);
    }
  }
  return validations.join(".");
};
var getZodChainableNumberValidations = function getZodChainableNumberValidations(schema) {
  var validations = [];

  // none of the chains are valid for enums
  if (schema["enum"]) {
    return "";
  }
  if (schema.type === "integer") {
    validations.push("int()");
  }
  if (schema.minimum !== undefined) {
    if (schema.exclusiveMinimum === true) {
      validations.push("gt(".concat(schema.minimum, ")"));
    } else {
      validations.push("gte(".concat(schema.minimum, ")"));
    }
  } else if (typeof schema.exclusiveMinimum === "number") {
    validations.push("gt(".concat(schema.exclusiveMinimum, ")"));
  }
  if (schema.maximum !== undefined) {
    if (schema.exclusiveMaximum === true) {
      validations.push("lt(".concat(schema.maximum, ")"));
    } else {
      validations.push("lte(".concat(schema.maximum, ")"));
    }
  } else if (typeof schema.exclusiveMaximum === "number") {
    validations.push("lt(".concat(schema.exclusiveMaximum, ")"));
  }
  if (schema.multipleOf) {
    validations.push("multipleOf(".concat(schema.multipleOf, ")"));
  }
  return validations.join(".");
};
var getZodChainableArrayValidations = function getZodChainableArrayValidations(schema) {
  var validations = [];
  if (schema.minItems) {
    validations.push("min(".concat(schema.minItems, ")"));
  }
  if (schema.maxItems) {
    validations.push("max(".concat(schema.maxItems, ")"));
  }
  return validations.join(".");
};

var voidSchema = "z.void()";

// eslint-disable-next-line sonarjs/cognitive-complexity
var getZodiosEndpointDefinitionList = function getZodiosEndpointDefinitionList(doc, options) {
  var _doc$components$schem, _doc$components, _options$complexityTh, _options$defaultStatu;
  var resolver = makeSchemaResolver(doc);
  var graphs = getOpenApiDependencyGraph(Object.keys((_doc$components$schem = (_doc$components = doc.components) === null || _doc$components === void 0 ? void 0 : _doc$components.schemas) !== null && _doc$components$schem !== void 0 ? _doc$components$schem : {}).map(function (name) {
    return asComponentSchema(name);
  }), resolver.getSchemaByRef);
  var endpoints = [];
  var isMainResponseStatus = match(options === null || options === void 0 ? void 0 : options.isMainResponseStatus)["with"](P.string, function (option) {
    return function (status) {
      return sync(option, {
        status: status
      }, {
        functions: true
      });
    };
  })["with"](P.nullish, function () {
    return function (status) {
      return status >= 200 && status < 300;
    };
  }).otherwise(function (fn) {
    return fn;
  });
  var isErrorStatus = match(options === null || options === void 0 ? void 0 : options.isErrorStatus)["with"](P.string, function (option) {
    return function (status) {
      return sync(option, {
        status: status
      }, {
        functions: true
      });
    };
  })["with"](P.nullish, function () {
    return function (status) {
      return !(status >= 200 && status < 300);
    };
  }).otherwise(function (fn) {
    return fn;
  });
  var isMediaTypeAllowed = match(options === null || options === void 0 ? void 0 : options.isMediaTypeAllowed)["with"](P.string, function (option) {
    return function (mediaType) {
      return sync(option, {
        mediaType: mediaType
      }, {
        functions: true
      });
    };
  })["with"](P.nullish, function () {
    return function (mediaType) {
      return mediaType === "application/json";
    };
  }).otherwise(function (fn) {
    return fn;
  });
  var getOperationAlias = match(options === null || options === void 0 ? void 0 : options.withAlias)["with"](P["boolean"], P.nullish, function () {
    return function (path, method, operation) {
      var _operation$operationI;
      return (_operation$operationI = operation.operationId) !== null && _operation$operationI !== void 0 ? _operation$operationI : method + pathToVariableName(path);
    };
  }).otherwise(function (fn) {
    return fn;
  });
  var ctx = {
    resolver: resolver,
    zodSchemaByName: {},
    schemaByName: {}
  };
  if (options !== null && options !== void 0 && options.exportAllNamedSchemas) {
    ctx.schemasByName = {};
  }
  var complexityThreshold = (_options$complexityTh = options === null || options === void 0 ? void 0 : options.complexityThreshold) !== null && _options$complexityTh !== void 0 ? _options$complexityTh : 4;
  var getZodVarName = function getZodVarName(input, fallbackName) {
    var result = input.toString();

    // special value, inline everything (= no variable used)
    if (complexityThreshold === -1) {
      return input.ref ? ctx.zodSchemaByName[result] : result;
    }
    if ((result.startsWith("z.") || input.ref === undefined) && fallbackName) {
      // result is simple enough that it doesn't need to be assigned to a variable
      if (input.complexity < complexityThreshold) {
        return result;
      }
      var safeName = normalizeString(fallbackName);

      // if schema is already assigned to a variable, re-use that variable name
      if (!(options !== null && options !== void 0 && options.exportAllNamedSchemas) && ctx.schemaByName[result]) {
        return ctx.schemaByName[result];
      }

      // result is complex and would benefit from being re-used
      var formatedName = safeName;

      // iteratively add suffix number to prevent overwriting
      var reuseCount = 1;
      var isVarNameAlreadyUsed = false;
      while (isVarNameAlreadyUsed = Boolean(ctx.zodSchemaByName[formatedName])) {
        if (isVarNameAlreadyUsed) {
          var _ctx$schemasByName;
          if (options !== null && options !== void 0 && options.exportAllNamedSchemas && (_ctx$schemasByName = ctx.schemasByName) !== null && _ctx$schemasByName !== void 0 && (_ctx$schemasByName = _ctx$schemasByName[result]) !== null && _ctx$schemasByName !== void 0 && _ctx$schemasByName.includes(formatedName)) {
            return formatedName;
          } else if (ctx.zodSchemaByName[formatedName] === safeName) {
            return formatedName;
          } else {
            reuseCount += 1;
            formatedName = "".concat(safeName, "__").concat(reuseCount);
          }
        }
      }
      ctx.zodSchemaByName[formatedName] = result;
      ctx.schemaByName[result] = formatedName;
      if (options !== null && options !== void 0 && options.exportAllNamedSchemas && ctx.schemasByName) {
        var _ctx$schemasByName$re;
        ctx.schemasByName[result] = ((_ctx$schemasByName$re = ctx.schemasByName[result]) !== null && _ctx$schemasByName$re !== void 0 ? _ctx$schemasByName$re : []).concat(formatedName);
      }
      return formatedName;
    }

    // result is a reference to another schema
    var schema = ctx.zodSchemaByName[result];
    if (!schema && input.ref) {
      var refInfo = ctx.resolver.resolveRef(input.ref);
      schema = ctx.zodSchemaByName[refInfo.name];
    }
    if (input.ref && schema) {
      var complexity = getSchemaComplexity({
        current: 0,
        schema: ctx.resolver.getSchemaByRef(input.ref)
      });

      // ref result is simple enough that it doesn't need to be assigned to a variable
      if (complexity < complexityThreshold) {
        return ctx.zodSchemaByName[result];
      }
      return result;
    }
    console.log({
      ref: input.ref,
      fallbackName: fallbackName,
      result: result
    });
    throw new Error("Invalid ref: " + input.ref);
  };
  var defaultStatusBehavior = (_options$defaultStatu = options === null || options === void 0 ? void 0 : options.defaultStatusBehavior) !== null && _options$defaultStatu !== void 0 ? _options$defaultStatu : "spec-compliant";
  var ignoredFallbackResponse = [];
  var ignoredGenericError = [];
  for (var path in doc.paths) {
    var _pathItemObj$paramete;
    var pathItemObj = doc.paths[path];
    var pathItem = pick(pathItemObj, ["get", "put", "post", "delete", "options", "head", "patch", "trace"]);
    var parametersMap = getParametersMap((_pathItemObj$paramete = pathItemObj.parameters) !== null && _pathItemObj$paramete !== void 0 ? _pathItemObj$paramete : []);
    for (var method in pathItem) {
      var _operation$parameters, _operation$responses;
      var operation = pathItem[method];
      if (!operation) continue;
      if (options !== null && options !== void 0 && options.withDeprecatedEndpoints ? false : operation.deprecated) continue;
      var parameters = Object.entries(_objectSpread2(_objectSpread2({}, parametersMap), getParametersMap((_operation$parameters = operation.parameters) !== null && _operation$parameters !== void 0 ? _operation$parameters : []))).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);
          _ref2[0];
          var param = _ref2[1];
        return param;
      });
      var operationName = getOperationAlias(path, method, operation);
      var endpointDefinition = _objectSpread2(_objectSpread2({
        method: method,
        path: replaceHyphenatedPath(path)
      }, (options === null || options === void 0 ? void 0 : options.withAlias) && {
        alias: operationName
      }), {}, {
        description: operation.description,
        requestFormat: "json",
        parameters: [],
        errors: [],
        response: ""
      });
      if (operation.requestBody) {
        var _requestBody$content, _requestBody$content2;
        var requestBody = isReferenceObject(operation.requestBody) ? ctx.resolver.getSchemaByRef(operation.requestBody.$ref) : operation.requestBody;
        var mediaTypes = Object.keys((_requestBody$content = requestBody.content) !== null && _requestBody$content !== void 0 ? _requestBody$content : {});
        var matchingMediaType = mediaTypes.find(isAllowedParamMediaTypes);
        var bodySchema = matchingMediaType && ((_requestBody$content2 = requestBody.content) === null || _requestBody$content2 === void 0 || (_requestBody$content2 = _requestBody$content2[matchingMediaType]) === null || _requestBody$content2 === void 0 ? void 0 : _requestBody$content2.schema);
        if (bodySchema) {
          var _requestBody$required;
          endpointDefinition.requestFormat = match(matchingMediaType)["with"]("application/octet-stream", function () {
            return "binary";
          })["with"]("application/x-www-form-urlencoded", function () {
            return "form-url";
          })["with"]("multipart/form-data", function () {
            return "form-data";
          })["with"](P.string.includes("json"), function () {
            return "json";
          }).otherwise(function () {
            return "text";
          });
          var bodyCode = getZodSchema({
            schema: bodySchema,
            ctx: ctx,
            meta: {
              isRequired: (_requestBody$required = requestBody.required) !== null && _requestBody$required !== void 0 ? _requestBody$required : true
            },
            options: options
          });
          endpointDefinition.parameters.push({
            name: "body",
            type: "Body",
            description: requestBody.description,
            schema: getZodVarName(bodyCode, operationName + "_Body") + getZodChain({
              schema: isReferenceObject(bodySchema) ? ctx.resolver.getSchemaByRef(bodySchema.$ref) : bodySchema,
              meta: bodyCode.meta
            })
          });
        }
      }
      var _iterator = _createForOfIteratorHelper(parameters),
        _step;
      try {
        var _loop = function _loop() {
          var param = _step.value;
          var paramItem = isReferenceObject(param) ? ctx.resolver.getSchemaByRef(param.$ref) : param;
          if (allowedPathInValues.includes(paramItem["in"])) {
            var _paramItem$required;
            var paramSchema;
            if (paramItem.content) {
              var _paramItem$content, _mediaTypeObject$sche;
              var _mediaTypes3 = Object.keys((_paramItem$content = paramItem.content) !== null && _paramItem$content !== void 0 ? _paramItem$content : {});
              var _matchingMediaType3 = _mediaTypes3.find(isAllowedParamMediaTypes);
              if (!_matchingMediaType3) {
                throw new Error("Unsupported media type for param ".concat(paramItem.name, ": ").concat(_mediaTypes3.join(", ")));
              }
              var mediaTypeObject = paramItem.content[_matchingMediaType3];
              if (!mediaTypeObject) {
                throw new Error("No content with media type for param ".concat(paramItem.name, ": ").concat(_matchingMediaType3));
              }

              // this fallback is needed to autofix openapi docs that put the $ref in the wrong place
              // (it should be in the mediaTypeObject.schema, not in the mediaTypeObject itself)
              // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#style-values (just above this anchor)
              // @ts-expect-error
              paramSchema = (_mediaTypeObject$sche = mediaTypeObject === null || mediaTypeObject === void 0 ? void 0 : mediaTypeObject.schema) !== null && _mediaTypeObject$sche !== void 0 ? _mediaTypeObject$sche : mediaTypeObject;
            } else {
              paramSchema = isReferenceObject(paramItem.schema) ? ctx.resolver.getSchemaByRef(paramItem.schema.$ref) : paramItem.schema;
            }
            if (options !== null && options !== void 0 && options.withDescription && paramSchema) {
              var _paramItem$descriptio;
              paramSchema.description = ((_paramItem$descriptio = paramItem.description) !== null && _paramItem$descriptio !== void 0 ? _paramItem$descriptio : "").trim();
            }

            // resolve ref if needed, and fallback to default (unknown) value if needed
            paramSchema = paramSchema ? isReferenceObject(paramSchema) ? ctx.resolver.getSchemaByRef(paramSchema.$ref) : paramSchema : {};
            var paramCode = getZodSchema({
              schema: paramSchema !== null && paramSchema !== void 0 ? paramSchema : {},
              ctx: ctx,
              meta: {
                isRequired: paramItem["in"] === "path" ? true : (_paramItem$required = paramItem.required) !== null && _paramItem$required !== void 0 ? _paramItem$required : false
              },
              options: options
            });
            endpointDefinition.parameters.push({
              name: match(paramItem["in"])["with"]("path", function () {
                return pathParamToVariableName(paramItem.name);
              }).otherwise(function () {
                return paramItem.name;
              }),
              type: match(paramItem["in"])["with"]("header", function () {
                return "Header";
              })["with"]("query", function () {
                return "Query";
              })["with"]("path", function () {
                return "Path";
              }).run(),
              schema: getZodVarName(paramCode.assign(paramCode.toString() + getZodChain({
                schema: paramSchema,
                meta: paramCode.meta,
                options: options
              })), paramItem.name)
            });
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (options !== null && options !== void 0 && options.withAllResponses) {
        endpointDefinition.responses = [];
      }
      for (var statusCode in operation.responses) {
        var _responseItem$content, _responseItem$content2;
        var responseItem = isReferenceObject(operation.responses[statusCode]) ? ctx.resolver.getSchemaByRef(operation.responses[statusCode].$ref) : operation.responses[statusCode];
        var _mediaTypes = Object.keys((_responseItem$content = responseItem.content) !== null && _responseItem$content !== void 0 ? _responseItem$content : {});
        var _matchingMediaType = _mediaTypes.find(isMediaTypeAllowed);
        var maybeSchema = _matchingMediaType ? (_responseItem$content2 = responseItem.content) === null || _responseItem$content2 === void 0 || (_responseItem$content2 = _responseItem$content2[_matchingMediaType]) === null || _responseItem$content2 === void 0 ? void 0 : _responseItem$content2.schema : null;
        var schemaString = _matchingMediaType ? undefined : voidSchema;
        var schema = void 0;
        if (maybeSchema) {
          schema = getZodSchema({
            schema: maybeSchema,
            ctx: ctx,
            meta: {
              isRequired: true
            },
            options: options
          });
          schemaString = (schema.ref ? getZodVarName(schema) : schema.toString()) + getZodChain({
            schema: isReferenceObject(maybeSchema) ? ctx.resolver.getSchemaByRef(maybeSchema.$ref) : maybeSchema,
            meta: schema.meta
          });
        }
        if (endpointDefinition.responses !== undefined) {
          endpointDefinition.responses.push({
            statusCode: statusCode,
            schema: schemaString !== null && schemaString !== void 0 ? schemaString : voidSchema,
            description: responseItem.description
          });
        }
        if (schemaString) {
          var status = Number(statusCode);
          if (isMainResponseStatus(status) && !endpointDefinition.response) {
            endpointDefinition.response = schemaString;
            if (!endpointDefinition.description && responseItem.description && options !== null && options !== void 0 && options.useMainResponseDescriptionAsEndpointDefinitionFallback) {
              endpointDefinition.description = responseItem.description;
            }
          } else if (statusCode !== "default" && isErrorStatus(status)) {
            endpointDefinition.errors.push({
              schema: schemaString,
              status: status,
              description: responseItem.description
            });
          }
        }
      }

      // use `default` as fallback for `response` undeclared responses
      // if no main response has been found, this should be considered it as a fallback
      // else this will be added as an error response
      if ((_operation$responses = operation.responses) !== null && _operation$responses !== void 0 && _operation$responses["default"]) {
        var _responseItem$content3, _responseItem$content4;
        var _responseItem = operation.responses["default"];
        var _mediaTypes2 = Object.keys((_responseItem$content3 = _responseItem.content) !== null && _responseItem$content3 !== void 0 ? _responseItem$content3 : {});
        var _matchingMediaType2 = _mediaTypes2.find(isMediaTypeAllowed);
        var _maybeSchema = _matchingMediaType2 && ((_responseItem$content4 = _responseItem.content) === null || _responseItem$content4 === void 0 || (_responseItem$content4 = _responseItem$content4[_matchingMediaType2]) === null || _responseItem$content4 === void 0 ? void 0 : _responseItem$content4.schema);
        var _schemaString = _matchingMediaType2 ? undefined : voidSchema;
        var _schema = void 0;
        if (_maybeSchema) {
          _schema = getZodSchema({
            schema: _maybeSchema,
            ctx: ctx,
            meta: {
              isRequired: true
            },
            options: options
          });
          _schemaString = (_schema.ref ? getZodVarName(_schema) : _schema.toString()) + getZodChain({
            schema: isReferenceObject(_maybeSchema) ? ctx.resolver.getSchemaByRef(_maybeSchema.$ref) : _maybeSchema,
            meta: _schema.meta
          });
        }
        if (_schemaString) {
          if (defaultStatusBehavior === "auto-correct") {
            if (endpointDefinition.response) {
              endpointDefinition.errors.push({
                schema: _schemaString,
                status: "default",
                description: _responseItem.description
              });
            } else {
              endpointDefinition.response = _schemaString;
            }
          } else {
            if (endpointDefinition.response) {
              ignoredFallbackResponse.push(operationName);
            } else {
              ignoredGenericError.push(operationName);
            }
          }
        }
      }
      if (!endpointDefinition.response) {
        endpointDefinition.response = voidSchema;
      }
      if (options !== null && options !== void 0 && options.endpointDefinitionRefiner) {
        // Refine the endpoint definition, in case consumer wants to add some specific fields
        // to be rendered in the Handlebars template.
        endpointDefinition = options.endpointDefinitionRefiner(endpointDefinition, operation);
      }
      endpoints.push(endpointDefinition);
    }
  }
  if ((options === null || options === void 0 ? void 0 : options.willSuppressWarnings) !== true) {
    if (ignoredFallbackResponse.length > 0) {
      console.warn("The following endpoints have no status code other than `default` and were ignored as the OpenAPI spec recommends. However they could be added by setting `defaultStatusBehavior` to `auto-correct`: ".concat(ignoredGenericError.join(", ")));
    }
    if (ignoredGenericError.length > 0) {
      console.warn("The following endpoints could have had a generic error response added by setting `defaultStatusBehavior` to `auto-correct` ".concat(ignoredGenericError.join(", ")));
    }
  }
  return _objectSpread2(_objectSpread2(_objectSpread2({}, ctx), graphs), {}, {
    endpoints: endpoints,
    issues: {
      ignoredFallbackResponse: ignoredFallbackResponse,
      ignoredGenericError: ignoredGenericError
    }
  });
};
var getParametersMap = function getParametersMap(parameters) {
  return Object.fromEntries((parameters !== null && parameters !== void 0 ? parameters : []).map(function (param) {
    return [isReferenceObject(param) ? param.$ref : param.name, param];
  }));
};
var allowedPathInValues = ["query", "header", "path"];
var allowedParamMediaTypes = ["application/octet-stream", "multipart/form-data", "application/x-www-form-urlencoded", "*/*"];
var isAllowedParamMediaTypes = function isAllowedParamMediaTypes(mediaType) {
  return mediaType.includes("application/") && mediaType.includes("json") || allowedParamMediaTypes.includes(mediaType) || mediaType.includes("text/");
};

/** Pick given properties in object */
function pick(obj, paths) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (!paths.includes(key)) return;
    // @ts-expect-error
    result[key] = obj[key];
  });
  return result;
}

function generateJSDocArray(schema) {
  var withTypesAndFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var comments = [];
  var mapping = {
    description: function description(value) {
      return "".concat(value);
    },
    example: function example(value) {
      return "@example ".concat(JSON.stringify(value));
    },
    examples: function examples(value) {
      return value.map(function (example, index) {
        return "@example Example ".concat(index + 1, ": ").concat(JSON.stringify(example));
      });
    },
    deprecated: function deprecated(value) {
      return value ? "@deprecated" : "";
    },
    "default": function _default(value) {
      return "@default ".concat(JSON.stringify(value));
    },
    externalDocs: function externalDocs(value) {
      return "@see ".concat(value.url);
    },
    // Additional attributes that depend on `withTypesAndFormat`
    type: withTypesAndFormat ? function (value) {
      return "@type {".concat(Array.isArray(value) ? value.join("|") : value, "}");
    } : undefined,
    format: withTypesAndFormat ? function (value) {
      return "@format ".concat(value);
    } : undefined,
    minimum: function minimum(value) {
      return "@minimum ".concat(value);
    },
    maximum: function maximum(value) {
      return "@maximum ".concat(value);
    },
    minLength: function minLength(value) {
      return "@minLength ".concat(value);
    },
    maxLength: function maxLength(value) {
      return "@maxLength ".concat(value);
    },
    pattern: function pattern(value) {
      return "@pattern ".concat(value);
    },
    "enum": function _enum(value) {
      return "@enum ".concat(value.join(", "));
    }
  };
  Object.entries(mapping).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      mappingFunction = _ref2[1];
    var schemaValue = schema[key];
    if (schemaValue !== undefined && mappingFunction) {
      var result = mappingFunction(schemaValue);
      if (Array.isArray(result)) {
        result.forEach(function (subResult) {
          return comments.push(subResult);
        });
      } else if (result) {
        comments.push(result);
      }
    }
  });

  // Add a space line after description if there are other comments
  if (comments.length > 1 && !!schema.description) {
    comments.splice(1, 0, "");
  }
  return comments;
}

var wrapReadOnly = function wrapReadOnly(options) {
  return function (theType) {
    if (options !== null && options !== void 0 && options.allReadonly) {
      return t.readonly(theType);
    }
    return theType;
  };
};
var _getTypescriptFromOpenApi = function getTypescriptFromOpenApi(_ref) {
  var schema = _ref.schema,
    inheritedMeta = _ref.meta,
    ctx = _ref.ctx,
    options = _ref.options;
  var meta = {};
  var isInline = !(inheritedMeta !== null && inheritedMeta !== void 0 && inheritedMeta.name);
  var doWrapReadOnly = wrapReadOnly(options);
  if (ctx !== null && ctx !== void 0 && ctx.visitedsRefs && inheritedMeta !== null && inheritedMeta !== void 0 && inheritedMeta.$ref) {
    ctx.rootRef = inheritedMeta.$ref;
    ctx.visitedsRefs[inheritedMeta.$ref] = true;
  }
  if (!schema) {
    throw new Error("Schema is required");
  }
  var canBeWrapped = !isInline;
  var getTs = function getTs() {
    if (isReferenceObject(schema)) {
      var _ctx$resolver$resolve;
      if (!(ctx !== null && ctx !== void 0 && ctx.visitedsRefs) || !(ctx !== null && ctx !== void 0 && ctx.resolver)) throw new Error("Context is required for OpenAPI $ref");
      var result = ctx.nodeByRef[schema.$ref];
      var schemaName = (_ctx$resolver$resolve = ctx.resolver.resolveRef(schema.$ref)) === null || _ctx$resolver$resolve === void 0 ? void 0 : _ctx$resolver$resolve.normalized;
      if (ctx.visitedsRefs[schema.$ref]) {
        return t.reference(schemaName);
      }
      if (!result) {
        var actualSchema = ctx.resolver.getSchemaByRef(schema.$ref);
        if (!actualSchema) {
          throw new Error("Schema ".concat(schema.$ref, " not found"));
        }
        ctx.visitedsRefs[schema.$ref] = true;
        result = _getTypescriptFromOpenApi({
          schema: actualSchema,
          meta: meta,
          ctx: ctx,
          options: options
        });
      }
      if (!schemaName) {
        var _ctx$resolver$resolve2;
        schemaName = (_ctx$resolver$resolve2 = ctx.resolver.resolveRef(schema.$ref)) === null || _ctx$resolver$resolve2 === void 0 ? void 0 : _ctx$resolver$resolve2.normalized;
      }
      return t.reference(schemaName);
    }
    if (Array.isArray(schema.type)) {
      if (schema.type.length === 1) {
        return _getTypescriptFromOpenApi({
          schema: _objectSpread2(_objectSpread2({}, schema), {}, {
            type: schema.type[0]
          }),
          ctx: ctx,
          meta: meta,
          options: options
        });
      }
      var types = schema.type.map(function (prop) {
        return _getTypescriptFromOpenApi({
          schema: _objectSpread2(_objectSpread2({}, schema), {}, {
            type: prop
          }),
          ctx: ctx,
          meta: meta,
          options: options
        });
      });
      return schema.nullable ? t.union([].concat(_toConsumableArray(types), [t.reference("null")])) : t.union(types);
    }
    if (schema.type === "null") {
      return t.reference("null");
    }
    if (schema.oneOf) {
      if (schema.oneOf.length === 1) {
        return _getTypescriptFromOpenApi({
          schema: schema.oneOf[0],
          ctx: ctx,
          meta: meta,
          options: options
        });
      }
      var _types = schema.oneOf.map(function (prop) {
        return _getTypescriptFromOpenApi({
          schema: prop,
          ctx: ctx,
          meta: meta,
          options: options
        });
      });
      return schema.nullable ? t.union([].concat(_toConsumableArray(_types), [t.reference("null")])) : t.union(_types);
    }

    // anyOf = oneOf but with 1 or more = `T extends oneOf ? T | T[] : never`
    if (schema.anyOf) {
      if (schema.anyOf.length === 1) {
        return _getTypescriptFromOpenApi({
          schema: schema.anyOf[0],
          ctx: ctx,
          meta: meta,
          options: options
        });
      }
      var oneOf = t.union(schema.anyOf.map(function (prop) {
        return _getTypescriptFromOpenApi({
          schema: prop,
          ctx: ctx,
          meta: meta,
          options: options
        });
      }));
      return schema.nullable ? t.union([oneOf, doWrapReadOnly(t.array(oneOf)), t.reference("null")]) : t.union([oneOf, doWrapReadOnly(t.array(oneOf))]);
    }
    if (schema.allOf) {
      if (schema.allOf.length === 1) {
        return _getTypescriptFromOpenApi({
          schema: schema.allOf[0],
          ctx: ctx,
          meta: meta,
          options: options
        });
      }
      var _inferRequiredSchema = inferRequiredSchema(schema),
        patchRequiredSchemaInLoop = _inferRequiredSchema.patchRequiredSchemaInLoop,
        noRequiredOnlyAllof = _inferRequiredSchema.noRequiredOnlyAllof,
        composedRequiredSchema = _inferRequiredSchema.composedRequiredSchema;
      var _types2 = noRequiredOnlyAllof.map(function (prop) {
        var type = _getTypescriptFromOpenApi({
          schema: prop,
          ctx: ctx,
          meta: meta,
          options: options
        });
        (ctx === null || ctx === void 0 ? void 0 : ctx.resolver) && patchRequiredSchemaInLoop(prop, ctx.resolver);
        return type;
      });
      if (Object.keys(composedRequiredSchema.properties).length > 0) {
        _types2.push(_getTypescriptFromOpenApi({
          schema: composedRequiredSchema,
          ctx: ctx,
          meta: meta,
          options: options
        }));
      }
      return schema.nullable ? t.union([t.intersection(_types2), t.reference("null")]) : t.intersection(_types2);
    }
    var schemaType = schema.type ? schema.type.toLowerCase() : undefined;
    if (schemaType && isPrimitiveType(schemaType)) {
      if (schema["enum"]) {
        if (schemaType !== "string" && schema["enum"].some(function (e) {
          return typeof e === "string";
        })) {
          return schema.nullable ? t.union([t.never(), t.reference("null")]) : t.never();
        }
        var hasNull = schema["enum"].includes(null);
        var withoutNull = schema["enum"].filter(function (f) {
          return f !== null;
        });
        return schema.nullable || hasNull ? t.union([].concat(_toConsumableArray(withoutNull), [t.reference("null")])) : t.union(withoutNull);
      }
      if (schemaType === "string") return schema.nullable ? t.union([t.string(), t.reference("null")]) : t.string();
      if (schemaType === "boolean") return schema.nullable ? t.union([t["boolean"](), t.reference("null")]) : t["boolean"]();
      if (schemaType === "number" || schemaType === "integer") return schema.nullable ? t.union([t.number(), t.reference("null")]) : t.number();
    }
    if (schemaType === "array") {
      if (schema.items) {
        var arrayOfType = _getTypescriptFromOpenApi({
          schema: schema.items,
          ctx: ctx,
          meta: meta,
          options: options
        });
        if (typeof arrayOfType === "string") {
          if (!ctx) throw new Error("Context is required for circular $ref (recursive schemas)");
          arrayOfType = t.reference(arrayOfType);
        }
        return schema.nullable ? t.union([doWrapReadOnly(t.array(arrayOfType)), t.reference("null")]) : doWrapReadOnly(t.array(arrayOfType));
      }
      return schema.nullable ? t.union([doWrapReadOnly(t.array(t.any())), t.reference("null")]) : doWrapReadOnly(t.array(t.any()));
    }
    if (schemaType === "object" || schema.properties || schema.additionalProperties) {
      var _schema$required;
      if (!schema.properties) {
        return {};
      }
      canBeWrapped = false;
      var isPartial = !((_schema$required = schema.required) !== null && _schema$required !== void 0 && _schema$required.length);
      var additionalProperties;
      if (schema.additionalProperties) {
        var additionalPropertiesType;
        if (typeof schema.additionalProperties === "boolean" && schema.additionalProperties || _typeof(schema.additionalProperties) === "object" && Object.keys(schema.additionalProperties).length === 0) {
          additionalPropertiesType = t.any();
        } else if (_typeof(schema.additionalProperties) === "object") {
          additionalPropertiesType = _getTypescriptFromOpenApi({
            schema: schema.additionalProperties,
            ctx: ctx,
            meta: meta,
            options: options
          });
        }
        additionalProperties = ts.factory.createTypeLiteralNode([ts.factory.createIndexSignature(undefined, [ts.factory.createParameterDeclaration(undefined, undefined, ts.factory.createIdentifier("key"), undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))], additionalPropertiesType)]);
      }
      var props = Object.fromEntries(Object.entries(schema.properties).map(function (_ref2) {
        var _schema$required2;
        var _ref3 = _slicedToArray(_ref2, 2),
          prop = _ref3[0],
          propSchema = _ref3[1];
        var propType = _getTypescriptFromOpenApi({
          schema: propSchema,
          ctx: ctx,
          meta: meta,
          options: options
        });
        if (typeof propType === "string") {
          if (!ctx) throw new Error("Context is required for circular $ref (recursive schemas)");
          // TODO Partial ?
          propType = t.reference(propType);
        }
        var isRequired = Boolean(isPartial ? true : (_schema$required2 = schema.required) === null || _schema$required2 === void 0 ? void 0 : _schema$required2.includes(prop));
        return ["".concat(wrapWithQuotesIfNeeded(prop)), isRequired ? propType : t.optional(propType)];
      }));
      var objectType = additionalProperties ? t.intersection([props, additionalProperties]) : props;
      if (isInline) {
        return isPartial ? t.reference("Partial", [doWrapReadOnly(objectType)]) : doWrapReadOnly(objectType);
      }
      if (!(inheritedMeta !== null && inheritedMeta !== void 0 && inheritedMeta.name)) {
        throw new Error("Name is required to convert an object schema to a type reference");
      }
      if (!isPartial) {
        return t.type(inheritedMeta.name, doWrapReadOnly(objectType));
      }
      return t.type(inheritedMeta.name, t.reference("Partial", [doWrapReadOnly(objectType)]));
    }
    if (!schemaType) return t.unknown();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error("Unsupported schema type: ".concat(schemaType));
  };
  var tsResult = getTs();

  // Add JSDoc comments
  if (options !== null && options !== void 0 && options.withDocs && !isReferenceObject(schema)) {
    var jsDocComments = generateJSDocArray(schema);
    if (jsDocComments.length > 0 && _typeof(tsResult) === "object" && tsResult.kind !== ts.SyntaxKind.TypeAliasDeclaration) {
      tsResult = t.comment(tsResult, jsDocComments);
    }
  }
  return canBeWrapped ? wrapTypeIfInline({
    isInline: isInline,
    name: inheritedMeta === null || inheritedMeta === void 0 ? void 0 : inheritedMeta.name,
    typeDef: tsResult
  }) : tsResult;
};
var isPrimitiveType = function isPrimitiveType(type) {
  return primitiveTypeList.includes(type);
};
var primitiveTypeList = ["string", "number", "integer", "boolean", "null"];
var wrapTypeIfInline = function wrapTypeIfInline(_ref4) {
  var isInline = _ref4.isInline,
    name = _ref4.name,
    typeDef = _ref4.typeDef;
  if (!isInline) {
    if (!name) {
      throw new Error("Name is required to convert a schema to a type reference");
    }
    return t.type(name, typeDef);
  }
  return typeDef;
};

/** @see https://gist.github.com/RubyTuesdayDONO/5006455 */
function topologicalSort(graph) {
  var sorted = [],
    // sorted list of IDs ( returned value )
    visited = {}; // hash: id of already visited node => true

  function visit(name, ancestors) {
    if (!Array.isArray(ancestors)) ancestors = [];
    ancestors.push(name);
    visited[name] = true;
    if (graph[name]) {
      graph[name].forEach(function (dep) {
        if (ancestors.includes(dep)) {
          // if already in ancestors, a closed chain (recursive relation) exists
          return;
          // throw new Error(
          //     'Circular dependency "' + dep + '" is required by "' + name + '": ' + ancestors.join(" -> ")
          // );
        }

        // if already exists, do nothing
        if (visited[dep]) return;
        visit(dep, ancestors.slice(0)); // recursive call
      });
    }
    if (!sorted.includes(name)) sorted.push(name);
  }

  // 2. topological sort
  Object.keys(graph).forEach(function (name) {
    return visit(name, []);
  });
  return sorted;
}

var file = ts.createSourceFile("", "", ts.ScriptTarget.ESNext, true);
var printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
});
var printTs = function printTs(node) {
  return printer.printNode(ts.EmitHint.Unspecified, node, file);
};
var getZodClientTemplateContext = function getZodClientTemplateContext(openApiDoc, options) {
  var _openApiDoc$component, _openApiDoc$component2, _options$groupStrateg;
  var result = getZodiosEndpointDefinitionList(openApiDoc, options);
  var data = makeTemplateContext();
  var docSchemas = (_openApiDoc$component = (_openApiDoc$component2 = openApiDoc.components) === null || _openApiDoc$component2 === void 0 ? void 0 : _openApiDoc$component2.schemas) !== null && _openApiDoc$component !== void 0 ? _openApiDoc$component : {};
  var depsGraphs = getOpenApiDependencyGraph(Object.keys(docSchemas).map(function (name) {
    return asComponentSchema(name);
  }), result.resolver.getSchemaByRef);
  if (options !== null && options !== void 0 && options.shouldExportAllSchemas) {
    Object.entries(docSchemas).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        schema = _ref2[1];
      if (!result.zodSchemaByName[name]) {
        result.zodSchemaByName[name] = getZodSchema({
          schema: schema,
          ctx: result,
          options: options
        }).toString();
      }
    });
  }
  var wrapWithLazyIfNeeded = function wrapWithLazyIfNeeded(schemaName) {
    var _result$resolver$reso, _depsGraphs$deepDepen;
    var code = result.zodSchemaByName[schemaName],
      ref = (_result$resolver$reso = result.resolver.resolveSchemaName(schemaName)) === null || _result$resolver$reso === void 0 ? void 0 : _result$resolver$reso.ref;
    var isCircular = ref && ((_depsGraphs$deepDepen = depsGraphs.deepDependencyGraph[ref]) === null || _depsGraphs$deepDepen === void 0 ? void 0 : _depsGraphs$deepDepen.has(ref));
    if (isCircular) {
      data.circularTypeByName[schemaName] = true;
    }
    return isCircular ? "z.lazy(() => ".concat(code, ")") : code;
  };
  for (var name in result.zodSchemaByName) {
    data.schemas[normalizeString(name)] = wrapWithLazyIfNeeded(name);
  }
  for (var ref in depsGraphs.deepDependencyGraph) {
    var _depsGraphs$deepDepen2;
    var isCircular = ref && ((_depsGraphs$deepDepen2 = depsGraphs.deepDependencyGraph[ref]) === null || _depsGraphs$deepDepen2 === void 0 ? void 0 : _depsGraphs$deepDepen2.has(ref));
    var ctx = {
      nodeByRef: {},
      resolver: result.resolver,
      visitedsRefs: {}
    };

    // Specifically check isCircular if shouldExportAllTypes is false. Either should cause shouldGenerateType to be true.
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    var shouldGenerateType = (options === null || options === void 0 ? void 0 : options.shouldExportAllTypes) || isCircular;
    var schemaName = shouldGenerateType ? result.resolver.resolveRef(ref).normalized : undefined;
    if (shouldGenerateType && schemaName && !data.types[schemaName]) {
      var _depsGraphs$deepDepen3;
      var node = _getTypescriptFromOpenApi({
        schema: result.resolver.getSchemaByRef(ref),
        ctx: ctx,
        meta: {
          name: schemaName
        },
        options: options
      });
      data.types[schemaName] = printTs(node).replace("export ", "");
      data.emittedType[schemaName] = true;
      var _iterator = _createForOfIteratorHelper((_depsGraphs$deepDepen3 = depsGraphs.deepDependencyGraph[ref]) !== null && _depsGraphs$deepDepen3 !== void 0 ? _depsGraphs$deepDepen3 : []),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _depsGraphs$deepDepen4;
          var depRef = _step.value;
          var depSchemaName = result.resolver.resolveRef(depRef).normalized;
          var isDepCircular = (_depsGraphs$deepDepen4 = depsGraphs.deepDependencyGraph[depRef]) === null || _depsGraphs$deepDepen4 === void 0 ? void 0 : _depsGraphs$deepDepen4.has(depRef);
          if (!isDepCircular && !data.types[depSchemaName]) {
            var nodeSchema = result.resolver.getSchemaByRef(depRef);
            var _node = _getTypescriptFromOpenApi({
              schema: nodeSchema,
              ctx: ctx,
              meta: {
                name: depSchemaName
              },
              options: options
            });
            data.types[depSchemaName] = printTs(_node).replace("export ", "");
            // defining types for strings and using the `z.ZodType<string>` type for their schema
            // prevents consumers of the type from adding zod validations like `.min()` to the type
            if (options !== null && options !== void 0 && options.shouldExportAllTypes && nodeSchema.type === "object") {
              data.emittedType[depSchemaName] = true;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }

  // TODO
  var schemaOrderedByDependencies = topologicalSort(depsGraphs.deepDependencyGraph).map(function (ref) {
    return result.resolver.resolveRef(ref).ref;
  });
  data.schemas = sortObjKeysFromArray(data.schemas, schemaOrderedByDependencies);
  var groupStrategy = (_options$groupStrateg = options === null || options === void 0 ? void 0 : options.groupStrategy) !== null && _options$groupStrateg !== void 0 ? _options$groupStrateg : "none";
  var dependenciesByGroupName = new Map();
  result.endpoints.forEach(function (endpoint) {
    if (!endpoint.response) return;
    data.endpoints.push(endpoint);
    if (groupStrategy !== "none") {
      var _openApiDoc$paths$end;
      var operationPath = getOriginalPathWithBrackets(endpoint.path);
      var pathItemObject = (_openApiDoc$paths$end = openApiDoc.paths[endpoint.path]) !== null && _openApiDoc$paths$end !== void 0 ? _openApiDoc$paths$end : openApiDoc.paths[operationPath];
      if (!pathItemObject) {
        console.warn("Missing path", endpoint.path);
        return;
      }
      var operation = pathItemObject[endpoint.method];
      var baseName = match(groupStrategy)["with"]("tag", "tag-file", function () {
        var _operation$tags$, _operation$tags;
        return (_operation$tags$ = (_operation$tags = operation.tags) === null || _operation$tags === void 0 ? void 0 : _operation$tags[0]) !== null && _operation$tags$ !== void 0 ? _operation$tags$ : "Default";
      })["with"]("method", "method-file", function () {
        return endpoint.method;
      }).exhaustive();
      var groupName = normalizeString(baseName);
      if (!data.endpointsGroups[groupName]) {
        data.endpointsGroups[groupName] = makeEndpointTemplateContext();
      }
      var group = data.endpointsGroups[groupName];
      group.endpoints.push(endpoint);
      if (!dependenciesByGroupName.has(groupName)) {
        dependenciesByGroupName.set(groupName, new Set());
      }
      var dependencies = dependenciesByGroupName.get(groupName);
      var addDependencyIfNeeded = function addDependencyIfNeeded(schemaName) {
        if (!schemaName) return;
        if (schemaName.startsWith("z.")) return;
        // Sometimes the schema includes a chain that should be removed from the dependency
        var _schemaName$split = schemaName.split("."),
          _schemaName$split2 = _slicedToArray(_schemaName$split, 1),
          normalizedSchemaName = _schemaName$split2[0];
        dependencies.add(normalizedSchemaName);
      };
      addDependencyIfNeeded(endpoint.response);
      endpoint.parameters.forEach(function (param) {
        return addDependencyIfNeeded(param.schema);
      });
      endpoint.errors.forEach(function (param) {
        return addDependencyIfNeeded(param.schema);
      });
      dependencies.forEach(function (schemaName) {
        return group.schemas[schemaName] = data.schemas[schemaName];
      });

      // reduce types/schemas for each group using prev computed deep dependencies
      if (groupStrategy.includes("file")) {
        _toConsumableArray(dependencies).forEach(function (schemaName) {
          var _depsGraphs$deepDepen5, _result$resolver$reso2;
          if (data.types[schemaName]) {
            group.types[schemaName] = data.types[schemaName];
          }
          group.schemas[schemaName] = data.schemas[schemaName];
          (_depsGraphs$deepDepen5 = depsGraphs.deepDependencyGraph[(_result$resolver$reso2 = result.resolver.resolveSchemaName(schemaName)) === null || _result$resolver$reso2 === void 0 ? void 0 : _result$resolver$reso2.ref]) === null || _depsGraphs$deepDepen5 === void 0 || _depsGraphs$deepDepen5.forEach(function (transitiveRef) {
            var transitiveSchemaName = result.resolver.resolveRef(transitiveRef).normalized;
            addDependencyIfNeeded(transitiveSchemaName);
            group.types[transitiveSchemaName] = data.types[transitiveSchemaName];
            group.schemas[transitiveSchemaName] = data.schemas[transitiveSchemaName];
          });
        });
      }
    }
  });
  data.endpoints = sortBy(data.endpoints, "path");
  if (groupStrategy.includes("file")) {
    var dependenciesCount = new Map();
    dependenciesByGroupName.forEach(function (deps) {
      deps.forEach(function (dep) {
        var _dependenciesCount$ge;
        dependenciesCount.set(dep, ((_dependenciesCount$ge = dependenciesCount.get(dep)) !== null && _dependenciesCount$ge !== void 0 ? _dependenciesCount$ge : -1) + 1);
      });
    });
    var commonSchemaNames = new Set();
    Object.keys(data.endpointsGroups).forEach(function (groupName) {
      var group = data.endpointsGroups[groupName];
      group.imports = {};
      var groupSchemas = {};
      var groupTypes = {};
      Object.entries(group.schemas).forEach(function (_ref3) {
        var _dependenciesCount$ge2;
        var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          schema = _ref4[1];
        var count = (_dependenciesCount$ge2 = dependenciesCount.get(name)) !== null && _dependenciesCount$ge2 !== void 0 ? _dependenciesCount$ge2 : 0;
        if (count >= 1) {
          group.imports[name] = "common";
          commonSchemaNames.add(name);
        } else {
          groupSchemas[name] = schema;
          if (group.types[name]) {
            groupTypes[name] = group.types[name];
          }
        }
      });
      group.schemas = sortObjKeysFromArray(groupSchemas, getPureSchemaNames(schemaOrderedByDependencies));
      group.types = groupTypes;
    });
    data.commonSchemaNames = new Set(sortListFromRefArray(Array.from(commonSchemaNames), getPureSchemaNames(schemaOrderedByDependencies)));
  }
  return data;
};
var makeEndpointTemplateContext = function makeEndpointTemplateContext() {
  return {
    schemas: {},
    endpoints: [],
    types: {}
  };
};
var makeTemplateContext = function makeTemplateContext() {
  return _objectSpread2(_objectSpread2({}, makeEndpointTemplateContext()), {}, {
    circularTypeByName: {},
    endpointsGroups: {},
    emittedType: {},
    options: {
      withAlias: false,
      baseUrl: ""
    }
  });
};
var originalPathParam = /:(\w+)/g;
var getOriginalPathWithBrackets = function getOriginalPathWithBrackets(path) {
  return path.replaceAll(originalPathParam, "{$1}");
};
// Example full schema name is like: #/components/schemas/Category.
// We only want to get the "Category".
//
// This is because when using `sortObjKeysFromArray`, the string array needs to be exactly the same
// like the object keys. Otherwise, the object keys won't be re-ordered.
var getPureSchemaNames = function getPureSchemaNames(fullSchemaNames) {
  return fullSchemaNames.map(function (name) {
    return name.split("/").at(-1);
  });
};

var generateZodClientFromOpenAPI = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var _options$groupStrateg, _options$apiClientNam;
    var openApiDoc, distPath, templatePath, prettierConfig, options, disableWriteToFile, handlebars, data, groupStrategy, fs, source, hbs, template, willWriteToFile, _data$commonSchemaNam, outputByGroupName, groupNames, indexSource, indexTemplate, indexOutput, commonSource, commonTemplate, commonSchemaNames, commonOutput, groupName, groupOutput, prettyGroupOutput, output, prettyOutput;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          openApiDoc = _ref.openApiDoc, distPath = _ref.distPath, templatePath = _ref.templatePath, prettierConfig = _ref.prettierConfig, options = _ref.options, disableWriteToFile = _ref.disableWriteToFile, handlebars = _ref.handlebars;
          data = getZodClientTemplateContext(openApiDoc, options);
          groupStrategy = (_options$groupStrateg = options === null || options === void 0 ? void 0 : options.groupStrategy) !== null && _options$groupStrateg !== void 0 ? _options$groupStrateg : "none";
          if (!templatePath) {
            templatePath = match(groupStrategy)["with"]("none", "tag-file", "method-file", function () {
              return path.join(__dirname, "../src/templates/default.hbs");
            })["with"]("tag", "method", function () {
              return path.join(__dirname, "../src/templates/grouped.hbs");
            }).exhaustive();
          }
          _context.next = 6;
          return import('@liuli-util/fs-extra');
        case 6:
          fs = _context.sent;
          _context.next = 9;
          return fs.readFile(templatePath, "utf8");
        case 9:
          source = _context.sent;
          hbs = handlebars !== null && handlebars !== void 0 ? handlebars : getHandlebars();
          template = hbs.compile(source);
          willWriteToFile = !disableWriteToFile && distPath; // TODO parallel writes ? does it really matter here ?
          if (!groupStrategy.includes("file")) {
            _context.next = 52;
            break;
          }
          outputByGroupName = {};
          if (!willWriteToFile) {
            _context.next = 18;
            break;
          }
          _context.next = 18;
          return fs.ensureDir(distPath);
        case 18:
          groupNames = Object.fromEntries(Object.keys(data.endpointsGroups).map(function (groupName) {
            return ["".concat(capitalize(groupName), "Api"), groupName];
          }));
          _context.next = 21;
          return fs.readFile(path.join(__dirname, "../src/templates/grouped-index.hbs"), "utf8");
        case 21:
          indexSource = _context.sent;
          indexTemplate = hbs.compile(indexSource);
          indexOutput = maybePretty(indexTemplate({
            groupNames: groupNames
          }), prettierConfig);
          outputByGroupName["__index"] = indexOutput;
          if (!willWriteToFile) {
            _context.next = 28;
            break;
          }
          _context.next = 28;
          return fs.writeFile(path.join(distPath, "index.ts"), indexOutput);
        case 28:
          _context.next = 30;
          return fs.readFile(path.join(__dirname, "../src/templates/grouped-common.hbs"), "utf8");
        case 30:
          commonSource = _context.sent;
          commonTemplate = hbs.compile(commonSource);
          commonSchemaNames = _toConsumableArray((_data$commonSchemaNam = data.commonSchemaNames) !== null && _data$commonSchemaNam !== void 0 ? _data$commonSchemaNam : []);
          if (!(commonSchemaNames.length > 0)) {
            _context.next = 39;
            break;
          }
          commonOutput = maybePretty(commonTemplate({
            schemas: pick$1(data.schemas, commonSchemaNames),
            types: pick$1(data.types, commonSchemaNames)
          }), prettierConfig);
          outputByGroupName["__common"] = commonOutput;
          if (!willWriteToFile) {
            _context.next = 39;
            break;
          }
          _context.next = 39;
          return fs.writeFile(path.join(distPath, "common.ts"), commonOutput);
        case 39:
          _context.t0 = _regeneratorRuntime().keys(data.endpointsGroups);
        case 40:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 51;
            break;
          }
          groupName = _context.t1.value;
          groupOutput = template(_objectSpread2(_objectSpread2(_objectSpread2({}, data), data.endpointsGroups[groupName]), {}, {
            options: _objectSpread2(_objectSpread2({}, options), {}, {
              groupStrategy: "none",
              apiClientName: "".concat(capitalize(groupName), "Api")
            })
          }));
          prettyGroupOutput = maybePretty(groupOutput, prettierConfig);
          outputByGroupName[groupName] = prettyGroupOutput;
          if (!willWriteToFile) {
            _context.next = 49;
            break;
          }
          console.log("Writing to", path.join(distPath, "".concat(groupName, ".ts")));
          _context.next = 49;
          return fs.writeFile(path.join(distPath, "".concat(groupName, ".ts")), prettyGroupOutput);
        case 49:
          _context.next = 40;
          break;
        case 51:
          return _context.abrupt("return", outputByGroupName);
        case 52:
          output = template(_objectSpread2(_objectSpread2({}, data), {}, {
            options: _objectSpread2(_objectSpread2({}, options), {}, {
              apiClientName: (_options$apiClientNam = options === null || options === void 0 ? void 0 : options.apiClientName) !== null && _options$apiClientNam !== void 0 ? _options$apiClientNam : "api"
            })
          }));
          prettyOutput = maybePretty(output, prettierConfig);
          if (!willWriteToFile) {
            _context.next = 57;
            break;
          }
          _context.next = 57;
          return fs.writeFile(distPath, prettyOutput);
        case 57:
          return _context.abrupt("return", prettyOutput);
        case 58:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function generateZodClientFromOpenAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export { _asyncToGenerator as _, _regeneratorRuntime as a, getHandlebars as b, getOpenApiDependencyGraph as c, getZodiosEndpointDefinitionList as d, getZodSchema as e, getZodClientTemplateContext as f, generateZodClientFromOpenAPI as g, maybePretty as m, toBoolean as t };
