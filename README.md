# php-trim-plus - PHP风格的trim函数加强版

[![Npm version](https://img.shields.io/npm/v/php-trim-plus.svg)](https://www.npmjs.com/package/php-trim-plus)
[![Build Status](https://img.shields.io/travis/janpoem/php-trim-plus/master.svg)](https://travis-ci.org/janpoem/php-trim-plus)
[![Dependencies Status](https://img.shields.io/david/janpoem/php-trim-plus.svg)](https://david-dm.org/janpoem/php-trim-plus)

PHP的trim比较好用，但默认trim如果指定了charList，则只截取charList中的文本，默认的空格（换行字符等）就不处理了，修改了次模式，默认为追加模式，即whitespace + charList。

本类库代码优先发布 [码云 - Gitee](https://gitee.com/)，github只用作ci，用中国人自己的代码仓库，专业私有云代码托管。

## 安装说明

```shell
npm install php-trim-plus --save
// or
yarn add php-trim-plus
```

## 使用说明

默认打包的版本（index.js），已经将依赖的 lodash 整合打包。

trim.js 未打包 lodash

```js
const {trim, ltrim, rtrim, toSafeString, isSymbol, isString, isEmptyString, isEmptyStringOrWhitespace} = require('../php-trim-plus');
// or
import {trim, ltrim, rtrim, toSafeString, isSymbol, isString, isEmptyString, isEmptyStringOrWhitespace} from 'php-trim-plus';
```

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


```js
toSafeString(value)

toSafeString(['a', 'b', 'c'], '/'); // 'a/b/c'
```

将字符串转为安全字符串。

如果 value 为数组类型，会将数组打扁 [flattenDeep](https://lodash.com/docs/4.17.11#flattenDeep) 后，再join，可以指定第二参数 `spr`

字符串转换，默认增加了 `value.normalize()` 转换 unicode。

```js
isString(value); 
```

lodash.isString 的引用

```js
isEmptyString(value);

isEmptyString(null); // true
isEmptyString(undefined); // true
isEmptyString(''); // true
isEmptyString([]); // false
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
isEmptyStringOrWhitespace([]); // false
isEmptyStringOrWhitespace({}); // false
```

是否为空白字符串或者是只包含空格符号的空白字符串，这里对 `value` 进行trim。

```js
isSymbol(value); 
```

判断值是否为Symbol