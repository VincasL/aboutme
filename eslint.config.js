import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    plugins: { react: reactPlugin },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { window: true, document: true, console: true, import: true, setInterval: true, clearInterval: true, setTimeout: true, clearTimeout: true },
    },
    rules: {
      'no-unused-vars': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/jsx-uses-react': 'warn',
    },
  },
]
