import stylelintFormatter from 'stylelint-formatter-pretty'

export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
  ],
  formatter: stylelintFormatter,
  plugins: ['stylelint-prettier'],
  rules: {
    'order/order': null,
    'prettier/prettier': [true, { singleQuote: true, tabWidth: 2 }],
  },
  overrides: [
    {
      files: ['./**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'prettier/prettier': [true, { singleQuote: true, tabWidth: 2 }],
      },
    },
  ],
}
