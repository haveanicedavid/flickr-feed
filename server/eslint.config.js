import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }
)
