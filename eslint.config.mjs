import TypeScriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import EslintParser from '@typescript-eslint/parser'

export default [
  {
    languageOptions: {
      parser: EslintParser,
      globals: {
        NonFunctionProperties: true,
        React: true,
      },
    },
    plugins: { TypeScriptEslintPlugin },
    ignores: ['dist', '.next'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
    // env: {
    //   node: true,
    //   es6: true,
    //   browser: true,
    //   jest: true,
    // },
    // parserOptions: {
    //   ecmaVersion: 2018,
    //   sourceType: 'module',
    // },
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
      'react/display-name': ['off'],
      '@typescript-eslint/no-extra-semi': ['off'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
