/*
 * Guide: https://eslint.nuxt.com/packages/module#auto-init
 */
import withNuxt from './.nuxt/eslint.config.mjs'
import perfectionist from 'eslint-plugin-perfectionist'

export default withNuxt([
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-interfaces': 'error',
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',

          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',

          'GLOBAL',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
        sortLineLength: false,
      }],
    },
  },
])
