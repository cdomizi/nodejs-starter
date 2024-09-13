import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/dist-ssr/",
      "*.local",
      "**/.yarn/",
      ".pnp*.*js",
      "vitest.config.ts",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      globals: { ...globals.es2021, ...globals.node },
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { ["@typescript-eslint"]: tseslint.plugin },
    rules: {
      "no-unused-vars": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/prefer-nullish-coalescing": 0,
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/no-namespace": [2, { allowDeclarations: true }],
    },
  },
  // Test files
  {
    files: ["/test/**", "**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  // Disable type-aware linting for JS files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  // Prettier config
  eslintPluginPrettierRecommended,
];
