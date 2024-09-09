'use strict';

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['lib/index.js'],
  out: 'docs',
  cleanOutputDir: true,
  sidebarLinks: {
    GitHub: 'https://github.com/cto-af/string-width./',
    Documentation: 'http://cto-af.github.io/string-width/',
  },
  navigation: {
    includeCategories: false,
    includeGroups: false,
  },
  categorizeByGroup: false,
  includeVersion: true,
  sort: ['static-first', 'alphabetical'],
  exclude: ['**/*.test.js'],
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: true,
  },
};
