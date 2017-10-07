// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "arrow-spacing": 0,
    "comma-dangle": 1,
    "comma-spacing": 0,
    "eol-last": 0,
    // allow async-await
    'generator-star-spacing': 0,
    // @fixable
    'indent': [
        'error',
        2,
        {
            SwitchCase: 1,
            flatTernaryExpressions: true
        }
    ],
    "no-alert": 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-dupe-args": 2,
    'no-var': 2
  }
}
