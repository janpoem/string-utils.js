const trim = require('../trim.js');

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

	it('trim.left test', () => {
		expect(trim.left(' aa--你好--aa ', '-a')).toBe('你好--aa ');
		expect(trim.left('　　  \t中文全角空格　　 ', '　')).toBe('中文全角空格　　 ');
		expect(trim.left("00--bbb b b\t\n\r", '0-', trim.Replace)).toBe('bbb b b\t\n\r');
	});

	it('trim.right test', () => {
		expect(trim.right(' aa--你好--aa ', '-a')).toBe(' aa--你好');
		expect(trim.right('　　  \t中文全角空格　　 ', '　')).toBe('　　  \t中文全角空格');
		expect(trim.right("00--bbb b b00--00\t\n\r", '0-')).toBe('00--bbb b b');
		expect(trim.right("/a/b/c///\\\\", '/\\')).toBe('/a/b/c');

	});
});