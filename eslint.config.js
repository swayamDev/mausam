import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      // Disallow non-null assertions — prefer explicit checks
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // Prefer const over let where possible
      'prefer-const': 'error',
      // No console.log in production code (console.error/warn allowed)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Enforce consistent import order
      'import/no-duplicates': 'off', // handled by TS
    },
  },
])

