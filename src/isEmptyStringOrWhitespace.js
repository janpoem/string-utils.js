import isEmptyString from './isEmptyString';
import { trim } from './trim';

/**
 * 是否空白文字，或者纯粹的空格字符串
 *
 * @param value
 * @param {string|string[]} charList
 * @return {boolean}
 */
export default function isEmptyStringOrWhitespace(value, charList) {
  if (isEmptyString(value)) {
    return true;
  }
  return trim(value, charList).length <= 0;
}