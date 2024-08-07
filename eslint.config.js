import cjs from '@cto.af/eslint-config/cjs.js';
import js from '@cto.af/eslint-config/js.js';
import mocha from '@cto.af/eslint-config/mocha.js';
import mod from '@cto.af/eslint-config/module.js';

export default [
  {
    ignores: [
      'coverage/**',
      'node_modules/**',
      '**/*.d.ts',
    ],
  },
  ...js,
  ...mod,
  ...cjs,
  ...mocha,
  {
    files: [
      'lib/widths.js',
    ],
    rules: {
      '@stylistic/object-curly-spacing': 'off',
    },
  },
];
