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
      '@next/next/no-html-link-for-pages': 'off',
    },
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
