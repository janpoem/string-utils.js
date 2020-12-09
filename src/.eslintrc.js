const { resolve } = require('path');
module.exports = {
  'env'          : {
    'browser' : true,
    'node'    : true,
    'commonjs': true,
    'jest'    : true,
    // 'es6'    : true
    'es2020'  : true
  },
  'extends'      : [
    'eslint:recommended',
  ],
  'plugins'      : [
    'flowtype'
  ],
  'settings'     : {},
  'parser'       : 'babel-eslint',
  'parserOptions': {
    'ecmaVersion' : 11,
    'ecmaFeatures': {
      experimentalObjectRestSpread: true,
      experimentalDecorators      : true
    },
    'sourceType'  : 'module',
  },
  'globals'      : {
    'process': true
  },
  'rules'        : {}
};
