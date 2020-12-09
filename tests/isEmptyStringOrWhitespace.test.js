import isEmptyStringOrWhitespace from '../src/isEmptyStringOrWhitespace';

describe('isEmptyStringOrWhitespace', () => {

  it('isEmptyStringOrWhitespace', () => {
    expect(isEmptyStringOrWhitespace('aa')).toBe(false);
    expect(isEmptyStringOrWhitespace(null)).toBe(true);
    expect(isEmptyStringOrWhitespace(undefined)).toBe(true);
    expect(isEmptyStringOrWhitespace('')).toBe(true);
    expect(isEmptyStringOrWhitespace('  ')).toBe(true);
    expect(isEmptyStringOrWhitespace('\t')).toBe(true);
    expect(isEmptyStringOrWhitespace('\n')).toBe(true);
    expect(isEmptyStringOrWhitespace([])).toBe(true);
    expect(isEmptyStringOrWhitespace({'ok': 'ok'})).toBe(false);
  });
});