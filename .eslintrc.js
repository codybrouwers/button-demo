const fs = require("fs");
const path = require("path");

const tsconfigPath = path.resolve(__dirname, "./tsconfig.json");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: tsconfigPath,
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: ["node_modules", ".next", "next.config.js", ".eslintrc.js", "types/**/*"],
  plugins: ["promise", "react", "react-hooks", "import", "@typescript-eslint"],
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:promise/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "next",
    "prettier",
  ],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/core-modules": ["react"],
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/extensions": [".js", ".ts", ".tsx"],
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: tsconfigPath,
      },
    },
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["**/*.page.tsx", "**/*.api.ts", "**/*.api.tsx"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
      },
    },
    {
      files: ["index.tsx", "index.js"],
      rules: {
        "padding-line-between-statements": ["error", { blankLine: "never", prev: "export", next: "export" }],
      },
    },
    {
      files: ["*.stories.tsx"],
      rules: {
        "import/no-default-export": "off",
        "react/function-component-definition": "off",
        "import/prefer-default-export": "error",
      },
    },
  ],
  rules: {
    "no-unused-expressions": "off",
    "no-unused-vars": "off", // TypeScript already warns on unused variables
    "no-undef": "off", // TypeScript already warns on undefined variables
    "no-magic-numbers": "off", // Covered by @typescript-eslint/no-magic-numbers
    "no-return-await": "off", // Covered by @typescript-eslint/return-await
    "no-shadow": "off", // Covered by @typescript-eslint/no-shadow
    camelcase: "off",
    "global-require": "off",
    "no-underscore-dangle": "off",
    "max-classes-per-file": "off",
    "arrow-body-style": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "prefer-const": "error",
    "no-void": ["error", { allowAsStatement: true }],
    eqeqeq: "error",
    "no-console": "off",
    "no-else-return": "error",
    "no-unexpected-multiline": "error",
    "object-shorthand": ["error", "always"],
    "eol-last": ["error", "always"],
    "comma-dangle": ["error", "only-multiline"],
    "no-restricted-syntax": [
      "error",
      {
        selector: "SequenceExpression",
        message: "The comma operator is confusing and a common mistake. Don’t use it!",
      },
    ],
    "max-len": [
      "error",
      {
        code: 110,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    // == eslint-plugin-promise ==============================================================
    "promise/always-return": "off",
    "promise/catch-or-return": ["error", { allowFinally: true }],
    // == @typescript-eslint/eslint-plugin ===================================================
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }], // Requires type information
    "@typescript-eslint/restrict-plus-operands": "error", // Requires type information
    "@typescript-eslint/prefer-regexp-exec": "error", // Requires type information
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "function",
        format: ["camelCase", "StrictPascalCase"],
      },
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
      {
        selector: "accessor",
        types: ["boolean"],
        format: ["StrictPascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        prefix: ["I"],
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
        prefix: ["T"],
      },
      {
        selector: "typeParameter",
        format: ["PascalCase"],
        prefix: ["T"],
      },
    ],
    // == eslint-plugin-jsx-ally ==========================================================
    "jsx-a11y/accessible-emoji": "off",
    "jsx-a11y/anchor-is-valid": ["error", { components: ["NextLink"] }],
    // == eslint-plugin-react-hooks ==========================================================
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // == eslint-plugin-react ================================================================
    "react/default-props-match-prop-types": "off",
    "react/prop-types": "off",
    "react/static-property-placement": "off",
    "react/state-in-constructor": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/destructuring-assignment": "off",
    "react/display-name": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-multi-comp": "off",
    "react/require-default-props": "off",
    "react/jsx-sort-default-props": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prefer-stateless-function": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-sort-props": ["error", { callbacksLast: true, shorthandFirst: true, ignoreCase: true }],
    "react/no-redundant-should-component-update": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-fragments": ["error", "syntax"],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
    // == eslint-plugin-import ===============================================================
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-absolute-path": "error",
    "import/no-unresolved": "error",
    "import/no-default-export": "off",
    "import/no-cycle": "warn",
    "import/no-deprecated": "warn",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/extensions": ["warn", "ignorePackages", { tsx: "never", ts: "never", js: "never" }],
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "never",
      },
    ],
  },
};
