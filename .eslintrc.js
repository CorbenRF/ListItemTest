module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off', // disables line length check
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'no-unused-vars': 'off',
        'no-plusplus': 'off',
      },
    },
  ],
};
