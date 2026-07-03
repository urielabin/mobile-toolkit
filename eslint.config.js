import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/android/**',
      '**/ios/**',
      '**/.detox/**',
      '**/artifacts/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // React Native's own tooling (babel/jest/metro) ships plain CommonJS
    // config files at the sample-app's root, and Jest manual mocks are
    // conventionally CommonJS too — give them Node globals rather than the
    // browser/ESM assumptions the rest of the monorepo runs under.
    files: [
      'packages/sample-app/*.config.js',
      'packages/sample-app/test/mocks/**/*.js',
      'packages/e2e-detox/.detoxrc.js',
      'packages/e2e-detox/jest.config.js',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Detox's `by`, `element`, `device`, `waitFor`, `expect` are ambient globals
    // (typed via detox/types, referenced in tsconfig's "types" array) rather than
    // imports, unlike WDIO which imports `$`/`browser`/`expect` from
    // `@wdio/globals` explicitly — so only this package needs a globals exception.
    files: ['packages/e2e-detox/**/*.ts'],
    languageOptions: {
      globals: {
        by: 'readonly',
        element: 'readonly',
        device: 'readonly',
        waitFor: 'readonly',
        expect: 'readonly',
      },
    },
  },
)
