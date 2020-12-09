'use strict';

const bufferExists = typeof Buffer !== 'undefined';
const arrayBufferExists = typeof ArrayBuffer !== 'undefined';
const textDecoderExists = typeof TextDecoder === 'undefined';

export const isSupportBuffer = () => bufferExists || arrayBufferExists;

export function isBufferObject(obj) {
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

export function bufferToString(buf, encoding) {
  if (!isBufferObject(buf)) {
    return '';
  }
  encoding = encoding ?? 'utf-8';

  if (bufferExists) {
    return Buffer.from(buf).toString(encoding);
  }

  let view;
  if (buf instanceof ArrayBuffer) {
    view = new Uint16Array(buf);
  } else if (buf.BYTES_PER_ELEMENT) {
    view = buf;
  }

  if (encoding === 'hex') {
    let out = '';
    for (let i = 0, l = view.byteLength; i < l; ++i) {
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

  const decoder = new TextDecoder(encoding);
  return decoder.decode(view);
}
