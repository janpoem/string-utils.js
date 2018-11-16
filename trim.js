// reference: http://locutus.io/php/strings/trim/
'use strict';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
const symbolProto = Symbol ? Symbol.prototype : undefined;
const symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * @see https://github.com/lodash/lodash/blob/master/isSymbol.js
 * @param value
 * @return {boolean}
 */
function isSymbol(value) {
	const type = typeof value;
	return type === 'symbol' || (type === 'object' && value != null && Object.prototype.toString.call(value) === '[object Symbol]')
}

/**
 * @see https://github.com/lodash/lodash/blob/master/toString.js
 * @param value
 * @return {string}
 */
function toString(value) {
	if (typeof value === 'undefined' || value === null) {
		return ''
	}
	// Exit early for strings to avoid a performance hit in some environments.
	if (typeof value === 'string') {
		return value.normalize(); // 修复特殊文字
	}
	if (Array.isArray(value)) {
		// Recursively convert values (susceptible to call stack limits).
		return value.toString();
	}
	if (isSymbol(value)) {
		return symbolToString ? symbolToString.call(value) : ''
	}
	const result = value + '';
	return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result;
}

const TrimBoth = 0;
const TrimLeft = 1;
const TrimRight = -1;

/*
 *	@see http://php.net/manual/en/function.trim.php
 *
 *	" " (ASCII 32 (0x20)), an ordinary space.
 *	"\t" (ASCII 9 (0x09)), a tab.
 *	"\n" (ASCII 10 (0x0A)), a new line (line feed).
 *	"\r" (ASCII 13 (0x0D)), a carriage return.
 *	"\0" (ASCII 0 (0x00)), the NUL-byte.
 *	"\x0B" (ASCII 11 (0x0B)), a vertical tab.
 */
const TRIM_WHITESPACE = [
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


// reference: http://locutus.io/php/strings/trim/
/**
 * PHP的字符串截取函数
 *
 * @see http://locutus.io/php/strings/trim/
 * @see http://php.net/manual/en/function.trim.php
 *
 * @param {string} str 字符串
 * @param {string|null|undefined} charList 要截取的字符列表
 * @param {boolean} isPlus 字符列表是否为追加模式，默认为True，即以追加模式进行截取。默认PHP的模式，为指定了charlist后，就会替换掉默认的charlist
 * @param {number} mode 截取模式，是两边截取，还是只截取左边 或 右边。
 * @returns {string}
 */
function trim(str, charList = null, isPlus = true, mode = TrimBoth) {
	var whitespace = TRIM_WHITESPACE;
	var l = 0;
	var i = 0;
	// @todo how about 0xD800 ~ 0xDBFF ?
	str = toString(str); // http://www.ruanyifeng.com/blog/2014/12/unicode.html
	if (!!charList) {
		// 这里进行了修改，isPlus = true时为追加模式
		if (!isPlus) {
			whitespace = toString(charList).replace(/([[\]().?/*{}+$^:])/g, '$1');
		} else {
			whitespace += toString(charList).replace(/([[\]().?/*{}+$^:])/g, '$1');
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

trim.left = (str, charList, isPlus = true) => trim(str, charList, isPlus, TrimLeft);

trim.right = (str, charList, isPlus = true) => trim(str, charList, isPlus, TrimRight);

trim.toString = toString;

/**
 * charList 追加模式
 * @type {boolean}
 */
trim.Plus = true;

/**
 * charList 替换模式
 * @type {boolean}
 */
trim.Replace = false;

/**
 * 两边都清除
 * @type {number}
 */
trim.Both = TrimBoth;
/**
 * 只清除左边
 * @type {number}
 */
trim.Left = TrimLeft;
/**
 * 只清理右边
 * @type {number}
 */
trim.Right = TrimRight;

module.exports = trim;