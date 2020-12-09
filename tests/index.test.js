import { isString, isSymbol, toSafeString } from '../index.es';

describe('index', () => {
  it('toSafeString', () => {
    expect(typeof toSafeString).toBe('function');
  });
});
