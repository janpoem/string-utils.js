'use strict';

import isString from 'lodash/isString';
import toSafeString from './toSafeString';

const isArray = Array.isArray;

const TrimBoth = 0;
const TrimLeft = 1;
const TrimRight = -1;

const PlusCharList = true;
const ReplaceCharList = false;

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
const DefaultWhitespace = [
  ' ',
  '\t',
  '\n',
  '\r',
  '\0',
  '\v',
  '\f',
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

/**
 * 转换字符列表，只将数组和字符串输出，其他返回空白字符串
 *
 * @param {string|string[]} charList
 * @return {string}
 */
function convertCharList(charList) {
  if (isArray(charList)) {
    charList = charList.join('');
  }
  if (isString(charList) && charList !== '') {
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
export function trim(
  str,
  charList = null,
  isPlus   = PlusCharList,
  mode     = TrimBoth
) {
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
export function ltrim(
  str,
  charList = null,
  isPlus   = PlusCharList
) {
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
export function rtrim(
  str,
  charList = null,
  isPlus   = PlusCharList
) {
  return trim(str, charList, isPlus, TrimRight);
}