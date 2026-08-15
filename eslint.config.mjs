import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: [
            'node_modules/',
            'dist/',
            'playwright-report/',
            'test-results/',
            'allure-results/',
            'allure-report/',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['tests/**/*.ts', 'src/fixtures/**/*.ts'],
        ...playwright.configs['flat/recommended'],
    },
    {
        // Root config files aren't in tsconfig's include — lint them without type info
        files: ['*.config.{js,mjs,ts}', 'eslint.config.mjs'],
        ...tseslint.configs.disableTypeChecked,
    },
    prettier,
);