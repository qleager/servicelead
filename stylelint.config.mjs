import stylelintFormatter from 'stylelint-formatter-pretty'

export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
  ],
  formatter: stylelintFormatter,
  /* TODO: отлично рабоает в .scss файлах
   *       не работает в .vue файлах
   *
   * Предположительно, проблема в плагине, так как clean-order
   * во .vue файлах отрабатывает
   */
  plugins: ['stylelint-prettier'],
  rules: {
    'order/order': null,
    'prettier/prettier': [true, { singleQuote: true, tabWidth: 2 }],
    'selector-class-pattern': '^[a-z](?:[a-z0-9]*)(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'prettier/prettier': [true, { singleQuote: true, tabWidth: 2 }],
      },
    },
  ],
}
