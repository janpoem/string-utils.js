# string-utils.js

[![Npm version](https://img.shields.io/npm/v/php-trim-plus.svg)](https://www.npmjs.com/package/php-trim-plus)
[![Build Status](https://img.shields.io/travis/janpoem/php-trim-plus/master.svg)](https://travis-ci.org/janpoem/php-trim-plus)
[![Dependencies Status](https://img.shields.io/david/janpoem/php-trim-plus.svg)](https://david-dm.org/janpoem/php-trim-plus)

[_原 php-trim-plus_](https://www.npmjs.com/package/php-trim-plus)

Javascript 字符串处理的实用程序。保留原 php-trim-plus 的所有特性，并扩展了对 Buffer、ArrayBuffer、TypedBuffer的支持。

目前主要提供如下的函数工具：

* toSafeString
* isBufferObject, bufferToString
* trim, ltrim, rtrim
* isEmptyString, isEmptyStringOrWhitespace
* isString, isSymbol (from lodash)

## 使用说明

### toSafeString

* unicode 正规化处理
* 传入数组打扁，实用 join 处理
* Symbol 提取字符
* 函数转为空字符
* 对象，优先尝试执行对象的 toString 方法

```js
toSafeString(value)

// 处理数组时，第二个字符为数组拼接的连接符
toSafeString(['a', 'b', 'c'], '/'); // 'a/b/c'

// 处理 buffer 时，第二个参数为 encoding
toSafeString(Buffer.from('hello'), 'base64');
```

### trim

```js
trim(str, charList, isPlus)
ltrim(str, charList, isPlus)
rtrim(str, charList, isPlus)
trim(' 开源中国 '); // '开源中国'
trim(' 红薯-- ', '-'); // '红薯'
```

`str: string` 要截取的字符串
`charList: string` 要额外截取的字符串
`isPlus: boolean` 对 charList 是在现有空字符的基础上追加 charList，默认为 true，`trim.Replace` or `trim.Plus`

### isEmptyString, isEmptyStringOrWhitespace

```js
isEmptyString(value);

isEmptyString(null); // true
isEmptyString(undefined); // true
isEmptyString(''); // true
isEmptyString([]); // true 当前版本修改
isEmptyString({}); // false
```

是否为空白字符串，这里不会对 `value` 进行trim，如果需要检查是否为纯粹的空格，请使用 `isEmptyStringOrWhitespace`。

```js
isEmptyStringOrWhitespace(value);

isEmptyStringOrWhitespace(null); // true
isEmptyStringOrWhitespace(undefined); // true
isEmptyStringOrWhitespace(''); // true
isEmptyStringOrWhitespace(' '); // true
isEmptyStringOrWhitespace('\t'); // true
isEmptyStringOrWhitespace('\n'); // true
isEmptyStringOrWhitespace([]); // true 当前版本修改
isEmptyStringOrWhitespace({}); // false
```

是否为空白字符串或者是只包含空格符号的空白字符串，这里对 `value` 进行trim。

```js
isSymbol(value); 
```

判断值是否为Symbol