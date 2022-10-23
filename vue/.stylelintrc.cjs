module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
    'stylelint-config-recommended-vue',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier', 'stylelint-order'],
  rules: {
    'prettier/prettier': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'alpha-value-notation': 'number',
    'selector-class-pattern': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'else',
          'use',
          'return',
          'each',
          'include',
          'mixin',
          'for',
        ],
      },
    ],
    'function-no-unknown': null,
  },
}
