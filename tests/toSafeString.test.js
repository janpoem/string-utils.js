import toSafeString from '../src/toSafeString';

class Test {

  toString() {
    return 'this is a test';
  }
}

describe('toSafeString', () => {

  it('normal string', () => {
    expect(toSafeString('test')).toEqual('test');
    expect(toSafeString(1)).toEqual('1');
  });

  it('unicode string', () => {
    expect('\u01D1').not.toEqual('\u004F\u030C');
    expect(toSafeString('\u01D1')).toEqual(toSafeString('\u004F\u030C'));
  });

  it('normal string', () => {
    expect(toSafeString('test')).toEqual('test');
    expect(toSafeString(1)).toEqual('1');
  });

  it('array', () => {
    expect(toSafeString(['test', '\u004F\u030C'])).toEqual(toSafeString(['test', '\u01D1']));
  });

  // 回归测试
  it('toSafeString test', () => {
    expect(toSafeString('\u004F\u030C\u004F\u030C ab\n\u01D1')).toBe('\u01D1\u01D1 ab\n\u01D1');
    expect(toSafeString(['a', 'b', 'c', 'd'])).toBe('abcd');
    expect(toSafeString(['a', 'b', 'c', 'd'], '/')).toBe('a/b/c/d');
    expect(toSafeString(['a', 'b', ['c1', 'c2'], ['d1', 'd2']], '/')).toBe('a/b/c1/c2/d1/d2');
    expect(toSafeString(new String('okokok'))).toBe('okokok');
    expect(toSafeString(Symbol('hello world'))).toBe('Symbol(hello world)');
    expect(toSafeString({})).toBe('[object Object]');
  });

  it('object', () => {
    expect(toSafeString(/a/)).toBe('/a/');

    const obj1 = new Test();
    expect(toSafeString(obj1)).toBe(obj1.toString());

    const obj2 = {a: 'a'};
    expect(toSafeString(obj2)).toBe('[object Object]');

  });
});