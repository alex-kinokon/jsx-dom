// @ts-check
import { defineConfig } from "eslint/config"
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import _import from "eslint-plugin-import"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __dirname = path.dirname(import.meta.filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/typescript",
        "plugin:react-hooks/recommended",
        "prettier"
      )
    ),

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },

      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      "@typescript-eslint/ban-ts-comment": "off",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: false,
        },
      ],

      "@typescript-eslint/ban-types": [
        "error",
        {
          extendDefaults: false,

          types: {
            String: {
              message: "Use string instead",
              fixWith: "string",
            },

            Number: {
              message: "Use number instead",
              fixWith: "number",
            },

            Boolean: {
              message: "Use boolean instead",
              fixWith: "boolean",
            },

            Symbol: {
              message: "Use symbol instead",
              fixWith: "symbol",
            },
          },
        },
      ],

      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "arrow-body-style": ["error", "as-needed"],
      "class-methods-use-this": "off",

      complexity: [
        "warn",
        {
          max: 100,
        },
      ],

      curly: ["error", "multi-line", "consistent"],
      eqeqeq: ["error", "smart"],
      "no-async-promise-executor": "off",
      "no-case-declarations": "off",

      "no-constant-condition": [
        "error",
        {
          checkLoops: false,
        },
      ],

      "no-debugger": "off",

      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],

      "no-inner-declarations": "off",
      "no-lonely-if": "error",
      "no-template-curly-in-string": "error",
      "no-var": "error",
      "import/export": "off",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external"],
        },
      ],

      "object-shorthand": [
        "error",
        "always",
        {
          ignoreConstructors: true,
        },
      ],

      "one-var": [
        "error",
        {
          var: "never",
          let: "never",
        },
      ],

      "prefer-arrow-callback": "error",

      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],

      "prefer-destructuring": "warn",
      "prefer-object-spread": "error",
      "prefer-rest-params": "warn",
      "prefer-spread": "warn",
      "quote-props": ["error", "as-needed"],
      "react/display-name": "off",
      "react/no-children-prop": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["/"],
        },
      ],

      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
        },
      ],

      yoda: [
        "error",
        "never",
        {
          exceptRange: true,
        },
      ],
    },
  },
])
