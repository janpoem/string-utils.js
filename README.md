# php-trim-plus - PHP风格的trim函数加强版

[![Npm version](https://img.shields.io/npm/v/php-trim-plus.svg)](https://www.npmjs.com/package/php-trim-plus)
[![Build Status](https://img.shields.io/travis/janpoem/php-trim-plus/master.svg)](https://travis-ci.org/janpoem/php-trim-plus)
[![Dependencies Status](https://img.shields.io/david/janpoem/php-trim-plus.svg)](https://david-dm.org/janpoem/php-trim-plus)

PHP的trim比较好用，但默认trim如果指定了charList，则只截取charList中的文本，默认的空格（换行字符等）就不处理了。

## 安装说明

```shell
npm install php-trim-plus --save
// or
yarn add php-trim-plus
```

## 使用说明

```js
trim(str, charList, isPlus, mode)
trim.left(str, charList, isPlus)
trim.right(str, charList, isPlus)
```

`str: string` 要截取的字符串
`charList: string` 要额外截取的字符串
`isPlus: boolean` 对 charList 是在现有空字符的基础上追加 charList，默认为 true，`trim.Replace` or `trim.Plus`
`mode: number` 匹配的模式，默认模式位两边一起截取，`trim.left`, `trim.right`

```js
trim(' 开源中国 '); // '开源中国'
trim(' 红薯-- ', '-'); // '红薯'
```

增加了一个方法

```js
trim.toString(value)
```

基于 lodash 的 toString，如果 value 为字符串，则会执行 `value.normalize()` （[参考：阮一峰 - Unicode与JavaScript详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)）。

 