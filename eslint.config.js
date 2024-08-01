import mocha from "@cto.af/eslint-config/mocha.js"
import mod from "@cto.af/eslint-config/module.js";

export default [
  {
    ignores: [
      "coverage/**",
      "node_modules/**",
      "**/*.d.ts",
    ],
  },
  ...mod,
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  ...mocha,
  {
    files: [
      "lib/widths.js",
    ],
    rules: {
      "@stylistic/object-curly-spacing": "off",
    },
  },
];
