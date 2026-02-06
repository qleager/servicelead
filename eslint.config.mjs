/*
 * Guide: https://eslint.nuxt.com/packages/module#auto-init
 */
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    rules: {
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
        alphabetical: true, // внутри групп — по алфавиту
        sortLineLength: false,
      }],
    },
  },
])
