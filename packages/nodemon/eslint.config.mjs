import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  {
    ignores: ['dist/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    // files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  }
)
