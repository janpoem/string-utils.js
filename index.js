'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
}

var isString_1 = isString;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

var bufferExists = typeof Buffer !== 'undefined';
function isBufferObject(obj) {
  if (obj instanceof ArrayBuffer) {
    return true;
  }

  if (obj.BYTES_PER_ELEMENT) {
    return true;
  }

  if (bufferExists) {
    return Buffer.isBuffer(obj);
  }

  return false;
}

function toHex(n) {
  if (n < 16) {
    return '0' + n.toString(16);
  }

  return n.toString(16);
}

function bufferToString(buf, encoding) {
  var _encoding;

  if (!isBufferObject(buf)) {
    return '';
  }

  encoding = (_encoding = encoding) !== null && _encoding !== void 0 ? _encoding : 'utf-8';

  if (bufferExists) {
    return Buffer.from(buf).toString(encoding);
  }

  var view;

  if (buf instanceof ArrayBuffer) {
    view = new Uint16Array(buf);
  } else if (buf.BYTES_PER_ELEMENT) {
    view = buf;
  }

  if (encoding === 'hex') {
    var out = '';

    for (var i = 0, l = view.byteLength; i < l; ++i) {
      if (view[i]) {
        out += toHex(view[i]);
      }
    }

    return out;
  }

  if (encoding === 'base64') {
    return btoa(String.fromCharCode.apply(null, view));
  }

  if (typeof TextDecoder === 'undefined') {
    return String.fromCharCode.apply(null, view);
  }

  var decoder = new TextDecoder(encoding);
  return decoder.decode(view);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$1.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Recursively flattens `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array) {
  var length = array == null ? 0 : array.length;
  return length ? _baseFlatten(array, INFINITY) : [];
}

var flattenDeep_1 = flattenDeep;

var isArray$1 = Array.isArray;
/** Used as references for various `Number` constants. */

var INFINITY$1 = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = typeof Symbol !== 'undefined' && Symbol.prototype ? Symbol.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 *
 * 将字符串转为 Unicode 正规形式
 *
 * @param value
 * @return {string}
 */

var normalize = function normalize(value) {
  if (typeof value.normalize === 'function') {
    return value.normalize();
  }

  return value;
};
/**
 *
 * @param {string} value
 * @param {string} arg
 * @return {string}
 */


function toSafeString(value, arg) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  } // Exit early for strings to avoid a performance hit in some environments.


  if (isString_1(value)) {
    return normalize(value); // 增加 normalize : http://www.ruanyifeng.com/blog/2014/12/unicode.html
  }

  if (isArray$1(value)) {
    if (value.length <= 0) {
      return '';
    }

    return normalize(flattenDeep_1(value).join(arg !== null && arg !== void 0 ? arg : ''));
  }

  if (symbolProto && isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  if (isBufferObject(value)) {
    return normalize(bufferToString(value, arg));
  }

  var type = _typeof(value);

  if (type === 'function') {
    return ''; // @todo function 要如何转为 安全的字符串 来表达？
  }

  if (type === 'object' && typeof value.toString === 'function') {
    return normalize(value.toString());
  }

  var result = "".concat(value); // 改用回 lodash 原来的写法

  return result === '0' && 1 / value === -INFINITY$1 ? '-0' : result;
}

var isArray$2 = Array.isArray;
var TrimBoth = 0;
var TrimLeft = 1;
var TrimRight = -1;
var PlusCharList = true;
var ReplaceCharList = false;
/**
 * default white space char list
 *
 * @see http://php.net/manual/en/function.trim.php
 *
 * " " (ASCII 32 (0x20)), an ordinary space.
 * "\t" (ASCII 9 (0x09)), a tab.
 * "\n" (ASCII 10 (0x0A)), a new line (line feed).
 * "\r" (ASCII 13 (0x0D)), a carriage return.
 * "\0" (ASCII 0 (0x00)), the NUL-byte.
 * "\x0B" (ASCII 11 (0x0B)), a vertical tab.
 */

var DefaultWhitespace = [' ', '\t', '\n', '\r', '\0', '\v', '\f', '\x0b', '\xa0', "\u2000", "\u2001", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200A", "\u200B", "\u2028", "\u2029", "\u3000"].join('');
/**
 * 转换字符列表，只将数组和字符串输出，其他返回空白字符串
 *
 * @param {string|string[]} charList
 * @return {string}
 */

function convertCharList(charList) {
  if (isArray$2(charList)) {
    charList = charList.join('');
  }

  if (isString_1(charList) && charList !== '') {
    return toSafeString(charList);
  }

  return '';
}
/**
 * PHP的字符串截取函数
 *
 * @see http://locutus.io/php/strings/trim/
 * @see http://php.net/manual/en/function.trim.php
 *
 * @param {string} str 要截取的字符串
 * @param {string|null|undefined|array} charList 要截取的字符列表
 * @param {boolean} isPlus 字符列表是否为追加模式，默认为True，即以追加模式进行截取。默认PHP的模式，为指定了charlist后，就会替换掉默认的charlist
 * @param {number} mode 截取模式，是两边截取，还是只截取左边 或 右边。
 * @returns {string}
 */


function trim(str) {
  var charList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var isPlus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PlusCharList;
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TrimBoth;
  var whitespace = DefaultWhitespace;
  var l = 0;
  var i = 0; // @todo how about 0xD800 ~ 0xDBFF ?

  str = toSafeString(str);
  charList = convertCharList(charList);

  if (charList !== '') {
    charList = charList.replace(/([[\]().?/*{}+$^:])/g, '$1'); // 这里进行了修改，isPlus = true时为追加模式

    if (isPlus) {
      whitespace += charList;
    } else {
      whitespace = charList;
    }
  } // 0 or > 0


  l = str.length;

  if (mode >= TrimBoth && l > 0) {
    for (i = 0; i < l; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
  }

  l = str.length;

  if (mode <= TrimBoth && l > 0) {
    for (i = l - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
  }

  if (mode >= TrimBoth) {
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
  }

  return whitespace.indexOf(str.charAt(str.length - 1)) === -1 ? str : '';
}
trim.Replace = ReplaceCharList;
trim.Plus = PlusCharList;
/**
 * 左截取
 *
 * @see http://php.net/manual/en/function.rtrim.php
 * @param {string} str 要截取的字符串
 * @param {string|null|undefined|array} charList 要截取的字符列表
 * @param {boolean} isPlus 字符列表是否为追加模式，默认为True，即以追加模式进行截取。默认PHP的模式，为指定了 charList 后，就会替换掉默认的charlist
 * @return {string}
 */

function ltrim(str) {
  var charList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var isPlus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PlusCharList;
  return trim(str, charList, isPlus, TrimLeft);
}
/**
 * 右截取
 *
 * @see http://php.net/manual/en/function.ltrim.php
 * @param {string} str 要截取的字符串
 * @param {string|null|undefined|array} charList 要截取的字符列表
 * @param {boolean} isPlus 字符列表是否为追加模式，默认为True，即以追加模式进行截取。默认PHP的模式，为指定了 charList 后，就会替换掉默认的charlist
 * @return {string}
 */

function rtrim(str) {
  var charList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var isPlus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PlusCharList;
  return trim(str, charList, isPlus, TrimRight);
}

function isEmptyString(value) {
  if (value === null || typeof value === 'undefined') {
    return true;
  }

  return toSafeString(value).length <= 0;
}

/**
 * 是否空白文字，或者纯粹的空格字符串
 *
 * @param value
 * @param {string|string[]} charList
 * @return {boolean}
 */

function isEmptyStringOrWhitespace(value, charList) {
  if (isEmptyString(value)) {
    return true;
  }

  return trim(value, charList).length <= 0;
}

exports.bufferToString = bufferToString;
exports.isBufferObject = isBufferObject;
exports.isEmptyString = isEmptyString;
exports.isEmptyStringOrWhitespace = isEmptyStringOrWhitespace;
exports.isString = isString_1;
exports.isSymbol = isSymbol_1;
exports.ltrim = ltrim;
exports.rtrim = rtrim;
exports.toSafeString = toSafeString;
exports.trim = trim;
//# sourceMappingURL=index.js.map
