import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.ts'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2022,
    globals: { ...globals.browser, ...globals.node },
  },
  plugins: {
    prettier: prettier,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    ...prettierConfig.rules,
  },
});
