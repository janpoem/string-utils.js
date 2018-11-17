const {trim, ltrim, rtrim, toSafeString, isString, isEmptyString, isEmptyStringOrWhitespace} = require('../index');

describe('trim test', () => {

	it('trim basic test', () => {
		expect(trim(' 你好 ')).toBe('你好');
		expect(trim(' aaaa')).toBe('aaaa');
		expect(trim('bbb ')).toBe('bbb');
		expect(trim('   bbb b b   ')).toBe('bbb b b');

		expect(trim("bbb b b\t\t")).toBe('bbb b b');
		expect(trim("bbb b b\t\n\r")).toBe('bbb b b');
	});

	it('trim custom charlist test', () => {
		expect(trim(' 你好--aa ', '-a')).toBe('你好');
		expect(trim(' 中文全角空格　　 ', '　')).toBe('中文全角空格');
		expect(trim(' kkkkkkÂ\tâ', 'â')).toBe('kkkkkkÂ');
		expect(trim(' a✓☒', '✓☒')).toBe('a');

		expect(trim(' ab\u1d30', '\u1d30')).toBe('ab');

		expect(trim(' ab\u01D1', '\u004F\u030C')).toBe('ab');
	});

	it('trim no plus test', () => {
		expect(trim(' 你好 --aa', '-a', trim.Replace)).toBe(' 你好 ');
		expect(trim('   bbb b b   ', 'b', trim.Replace)).toBe('   bbb b b   ');
		expect(trim("  kkkkkkÂ\tâ", 'â', trim.Replace)).toBe('  kkkkkkÂ\t');
		expect(trim(' ab\u1d30', '\u1d30', trim.Replace)).toBe(' ab');

		expect(trim('\u004F\u030C\u004F\u030C ab\n\u01D1', '\u004F\u030C', trim.Replace)).toBe(' ab\n');
	});

	it('ltrim', () => {
		expect(ltrim(' aa--你好--aa ', '-a')).toBe('你好--aa ');
		expect(ltrim('　　  \t中文全角空格　　 ', '　')).toBe('中文全角空格　　 ');
		expect(ltrim("00--bbb b b\t\n\r", '0-', trim.Replace)).toBe('bbb b b\t\n\r');
	});

	it('trim.right test', () => {
		expect(rtrim(' aa--你好--aa ', '-a')).toBe(' aa--你好');
		expect(rtrim('　　  \t中文全角空格　　 ', '　')).toBe('　　  \t中文全角空格');
		expect(rtrim("00--bbb b b00--00\t\n\r", '0-')).toBe('00--bbb b b');
		expect(rtrim("/a/b/c///\\\\", '/\\')).toBe('/a/b/c');
	});

	it('toSafeString test', () => {
		expect(toSafeString('\u004F\u030C\u004F\u030C ab\n\u01D1')).toBe('\u01D1\u01D1 ab\n\u01D1');
		expect(toSafeString(['a', 'b', 'c', 'd'])).toBe('abcd');
		expect(toSafeString(['a', 'b', 'c', 'd'], '/')).toBe('a/b/c/d');
		expect(toSafeString(['a', 'b', ['c1', 'c2'], ['d1', 'd2']], '/')).toBe('a/b/c1/c2/d1/d2');
		expect(toSafeString(new String('okokok'))).toBe('okokok');
		expect(toSafeString(Symbol('hello world'))).toBe('Symbol(hello world)');
		expect(toSafeString({})).toBe('[object Object]');
	});

	it('isString', () => {
		expect(isString('aa')).toBe(true);
		expect(isString(null)).toBe(false);
		expect(isString(new String('okokok'))).toBe(true);
		expect(isString({ok: 'ok'})).toBe(false);
		expect(isString(['a', 'b', 'c', 'd'])).toBe(false);
		expect(isString(Symbol('okokok'))).toBe(false);
	});

	it('isEmptyString', () => {
		expect(isEmptyString('aa')).toBe(false);
		expect(isEmptyString(null)).toBe(true);
		expect(isEmptyString(undefined)).toBe(true);
		expect(isEmptyString('')).toBe(true);
		expect(isEmptyString('0')).toBe(false);
		expect(isEmptyString('  ')).toBe(false);
		expect(isEmptyString([])).toBe(false);
		expect(isEmptyString({'ok': 'ok'})).toBe(false);
	});

	it('isEmptyStringOrWhitespace', () => {
		expect(isEmptyStringOrWhitespace('aa')).toBe(false);
		expect(isEmptyStringOrWhitespace(null)).toBe(true);
		expect(isEmptyStringOrWhitespace(undefined)).toBe(true);
		expect(isEmptyStringOrWhitespace('')).toBe(true);
		expect(isEmptyStringOrWhitespace('  ')).toBe(true);
		expect(isEmptyStringOrWhitespace('\t')).toBe(true);
		expect(isEmptyStringOrWhitespace('\n')).toBe(true);
		expect(isEmptyStringOrWhitespace([])).toBe(false);
		expect(isEmptyStringOrWhitespace({'ok': 'ok'})).toBe(false);
	});
});