module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        semi: false,
        printWidth: 300,
        endOfLine: 'auto',
        singleQuote: true,
        arrowParens: 'avoid'
      }
    ],
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
