import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import typescript from 'typescript-eslint';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    ...typescript.configs.strict,
    ...typescript.configs.stylistic,
    {
        name: 'recommended-js-rules',
        files: ['**/*.js'],
        plugins: {
            js,
        },
        extends: ['js/recommended'],
    },
    eslintConfigPrettier,
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
