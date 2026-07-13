import stylelintFormatter from 'stylelint-formatter-pretty'

export default {
  extends: [
    'stylelint-config-standard-scss',
    '@stylistic/stylelint-config',
    'stylelint-config-clean-order',
  ],
  formatter: stylelintFormatter,
  rules: {
    'order/order': null,
    'at-rule-empty-line-before': ['always', {
      ignore: ['first-nested', 'blockless-after-same-name-blockless', 'after-comment'],
      ignoreAtRules: ['else'],
      severity: 'warning',
    }],
    '@stylistic/block-closing-brace-newline-after': null,
    '@stylistic/indentation': 2,
    '@stylistic/string-quotes': 'single',
    'selector-class-pattern': '^[a-z](?:[a-z0-9]*)(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}
