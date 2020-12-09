'use strict';

/**
 * 是否为空字符串
 *
 * @param value
 * @return {boolean}
 */
import toSafeString from './toSafeString';

export default function isEmptyString(value) {
  if (value === null || typeof value === 'undefined') {
    return true;
  }
  return toSafeString(value).length <= 0;
}