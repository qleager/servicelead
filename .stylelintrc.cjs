module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-prettier/recommended'
  ],
  plugins: [
    'stylelint-order'
  ],
  customSyntax: 'postcss-html',
  rules: {
    'block-no-empty': true
  }
};