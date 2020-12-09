import isEmptyString from '../src/isEmptyString';

describe('isEmptyString', () => {
  it('isEmptyString', () => {
    expect(isEmptyString('aa')).toBe(false);
    expect(isEmptyString(null)).toBe(true);
    expect(isEmptyString(undefined)).toBe(true);
    expect(isEmptyString('')).toBe(true);
    expect(isEmptyString('0')).toBe(false);
    expect(isEmptyString('  ')).toBe(false);
    expect(isEmptyString([])).toBe(true);
    expect(isEmptyString({'ok': 'ok'})).toBe(false);
  });
});
