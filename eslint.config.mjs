import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["projects/**/*", "**/karma.conf.js", "**/karma.conf.ci.js"],
  },
  ...compat
    .extends(
      "eslint:recommended",
      "plugin:@angular-eslint/recommended",
      "plugin:@angular-eslint/template/process-inline-templates",
      "plugin:@ngrx/all",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/stylistic",
      "prettier",
    )
    .map((config) => ({
      ...config,
      files: ["**/*.ts"],
    })),
  {
    files: ["**/*.ts"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: ["tsconfig.eslint.json"],
      },
    },

    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-generic-constructors": "off",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/prefer-for-of": "off",

      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],

      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  ...compat
    .extends(
      "eslint:recommended",
      "plugin:@angular-eslint/recommended",
      "plugin:@angular-eslint/template/process-inline-templates",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/stylistic",
      "prettier",
    )
    .map((config) => ({
      ...config,
      files: ["**/*.spec.ts"],
    })),
  {
    files: ["**/*.spec.ts"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: ["tsconfig.eslint.json"],
      },
    },

    rules: {
      "no-sparse-arrays": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  ...compat
    .extends(
      "eslint:recommended",
      "plugin:@angular-eslint/recommended",
      "plugin:@ngrx/all",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/stylistic",
      "plugin:eslint-plugin-cypress/recommended",
      "prettier",
    )
    .map((config) => ({
      ...config,
      files: ["**/*.cy.ts"],
    })),
  {
    files: ["**/*.cy.ts"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: ["tsconfig.eslint.json"],
      },
    },

    rules: {
      "no-unused-vars": "off",
      "@ngrx/avoid-dispatching-multiple-actions-sequentially": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  },
  ...compat
    .extends("plugin:@angular-eslint/template/recommended")
    .map((config) => ({
      ...config,
      files: ["**/*.html"],
    })),
  {
    files: ["**/*.html"],

    rules: {
      "@angular-eslint/template/prefer-control-flow": "warn",
    },
  },
];
