'use strict';

import isString from './isString';
import isSymbol from './isSymbol';
import flattenDeep from './flattenDeep';
import { bufferToString, isBufferObject } from './buffer';

const isArray = Array.isArray;

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
const symbolProto = typeof Symbol !== 'undefined' && Symbol.prototype ? Symbol.prototype : undefined;
const symbolToString = symbolProto ? symbolProto.toString : undefined;

const arrayBufferExists = typeof ArrayBuffer !== 'undefined';

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 *
 * 将字符串转为 Unicode 正规形式
 *
 * @param value
 * @return {string}
 */
const normalize = (value) => {
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
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (isString(value)) {
    return normalize(value); // 增加 normalize : http://www.ruanyifeng.com/blog/2014/12/unicode.html
  }
  if (isArray(value)) {
    if (value.length <= 0) {
      return '';
    }
    return normalize(flattenDeep(value).join(arg ?? ''));
  }
  if (symbolProto && isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  if (isBufferObject(value)) {
    return normalize(bufferToString(value, arg));
  }
  const type = typeof value;
  if (type === 'function') {
    return ''; // @todo function 要如何转为 安全的字符串 来表达？
  }
  if (type === 'object' && typeof value.toString === 'function') {
    return normalize(value.toString());
  }
  const result = `${value}`; // 改用回 lodash 原来的写法
  return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result;
}

export default toSafeString;