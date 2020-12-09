import { bufferToString, isBufferObject } from '../src/buffer';

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

describe('buffer', () => {

  it('isBufferObject', () => {
    const items = [
      str2ab('test1'),
      new Uint16Array([12, 15]),
      Buffer.from('buffer'),
    ];

    items.forEach(item => expect(isBufferObject(item)).toBe(true));
  });

  it('bufferToString', () => {
    let test;

    test = str2ab('test1');
    expect(bufferToString(test)).toEqual('test1');

    test = new Uint8Array([0x74, 0x65, 0x73, 0x74]);
    expect(bufferToString(test)).toEqual('test');

    // only work in nodejs
    test = Buffer.from('test');
    expect(bufferToString(test)).toEqual('test');
  });
});