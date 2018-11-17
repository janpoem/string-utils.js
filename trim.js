'use strict';

// lodash 的 isString 和 isSymbol 以及其背后的 baseGetTag 方法，实现得比较扎实，而且面向未来特性兼容，所以考虑直接引入，打包编译时，会直接将 lodash 这部分代码合并打包
/**
 * @see https://lodash.com/docs/4.17.11#isString
 * @see https://github.com/lodash/lodash/blob/master/isString.js
 */
import isString from 'lodash/isString';

/**
 * @see https://lodash.com/docs/4.17.11#isSymbol
 * @see https://github.com/lodash/lodash/blob/master/isSymbol.js
 */
import isSymbol from 'lodash/isSymbol';

/**
 * @see https://lodash.com/docs/4.17.11#flattenDeep
 * @see https://github.com/lodash/lodash/blob/master/flattenDeep.js
 */
import flattenDeep from 'lodash/flattenDeep';

const isArray = Array.isArray;

/**
 * default white space char list
 *
 *    @see http://php.net/manual/en/function.trim.php
 *
 *    " " (ASCII 32 (0x20)), an ordinary space.
 *    "\t" (ASCII 9 (0x09)), a tab.
 *    "\n" (ASCII 10 (0x0A)), a new line (line feed).
 *    "\r" (ASCII 13 (0x0D)), a carriage return.
 *    "\0" (ASCII 0 (0x00)), the NUL-byte.
 *    "\x0B" (ASCII 11 (0x0B)), a vertical tab.
 */
const DefaultWhitespace = [
	' ',
	'\n',
	'\r',
	'\t',
	'\f',
	'\0',
	'\x0b',
	'\xa0',
	'\u2000',
	'\u2001',
	'\u2002',
	'\u2003',
	'\u2004',
	'\u2005',
	'\u2006',
	'\u2007',
	'\u2008',
	'\u2009',
	'\u200a',
	'\u200b',
	'\u2028',
	'\u2029',
	'\u3000'
].join('');

const TrimBoth = 0;
const TrimLeft = 1;
const TrimRight = -1;

const PlusCharList = true;
const ReplaceCharList = false;

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
const symbolProto = Symbol ? Symbol.prototype : undefined;
const symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * 将给定值转换为安全字符串
 *
 * @param {*} value
 * @param {string} spr
 * @return {string}
 */
function toSafeString(value, spr = '') {
	if (typeof value === 'undefined' || value === null) {
		return ''
	}
	// Exit early for strings to avoid a performance hit in some environments.
	if (isString(value)) {
		return value.normalize(); // 增加 normalize : http://www.ruanyifeng.com/blog/2014/12/unicode.html
	}
	if (isArray(value)) {
		// @todo 这里仍有待优化，这个也不算是最好的方案
		if (value.length <= 0) return '';
		return flattenDeep(value).join(spr).normalize(); // 这里，选择 flattenDeep ，然后join
	}
	if (isSymbol(value)) {
		return symbolToString ? symbolToString.call(value) : ''
	}
	const result = `${value}`; // 改用回 lodash 原来的写法
	return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result;
}

/**
 * 转换字符列表，只将数组和字符串输出，其他返回空白字符串
 *
 * @param {string|array} charList
 * @return {string}
 */
function convertCharList(charList) {
	if (isArray(charList))
		charList = charList.join('');
	if (isString(charList) && charList !== '')
		return toSafeString(charList);
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
function trim(str, charList = null, isPlus = PlusCharList, mode = TrimBoth) {
	var whitespace = DefaultWhitespace;
	var l = 0;
	var i = 0;
	// @todo how about 0xD800 ~ 0xDBFF ?
	str = toSafeString(str);
	charList = convertCharList(charList);

	if (charList !== '') {
		charList = charList.replace(/([[\]().?/*{}+$^:])/g, '$1');
		// 这里进行了修改，isPlus = true时为追加模式
		if (!!isPlus) {
			whitespace += charList;
		} else {
			whitespace = charList;
		}
	}
	// 0 or > 0
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

	if (mode >= TrimBoth)
		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
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
 * @param {boolean} isPlus 字符列表是否为追加模式，默认为True，即以追加模式进行截取。默认PHP的模式，为指定了charlist后，就会替换掉默认的charlist
 * @return {string}
 */
function ltrim(str, charList = null, isPlus = PlusCharList) {
	return trim(str, charList, isPlus, TrimLeft);
}

/**
 * 右截取
 *
 * @see http://php.net/manual/en/function.ltrim.php
 * @param {string} str 要截取的字符串
 * @param {string|null|undefined|array} charList 要截取的字符列表
 * @param {boolean} isPlus 字符列表是否为追加模式，默认为True，即以追加模式进行截取。默认PHP的模式，为指定了charlist后，就会替换掉默认的charlist
 * @return {string}
 */
function rtrim(str, charList = null, isPlus = PlusCharList) {
	return trim(str, charList, isPlus, TrimRight);
}

/**
 * 是否为空字符串
 *
 * @param value
 * @return {boolean}
 */
function isEmptyString(value) {
	if (value === null || typeof value === 'undefined') return true;
	if (!isString(value)) return false;
	return value.length <= 0;
}

/**
 * 是否空白文字，或者纯粹的空格字符串
 *
 * @param value
 * @return {boolean}
 */
function isEmptyStringOrWhitespace(value) {
	if (isEmptyString(value)) return true;
	if (!isString(value)) return false;
	return trim(value) === '';
}

export {
	isString,
	isEmptyString,
	isEmptyStringOrWhitespace,
	isSymbol,
	toSafeString,
	trim,
	ltrim,
	rtrim
};