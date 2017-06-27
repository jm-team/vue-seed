// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js',
      },
    },
  },
  /**
   * add your custom rules here
   * 0 或'off'：关闭规则。
   * 1 或'warn'：打开规则，并且作为一个警告（并不会导致检查不通过）。
   * 2 或'error'：打开规则，并且作为一个错误 (退出码为1，检查不通过)。
   */
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': [
      'error', 'always', {
        'js': 'never',
        'vue': 'never',
      }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error', {
        'optionalDependencies': ['test/unit/index.js'],
      }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': [
      'error', {
        'props': true,
        'ignorePropertyModificationsFor': ['Vue', 'state', 'config'],
      }],
    'no-console': 'off',
    'no-plusplus': ['error', {'allowForLoopAfterthoughts': true}],
    'linebreak-style': 'off'
  },
}
