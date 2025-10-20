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
  customSyntax: 'postcss-scss',
  rules: {
    'block-no-empty': true
  }
};