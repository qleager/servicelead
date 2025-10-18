// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // ВАЖНО: включаем type-aware режим
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.eslint.json'],
      extraFileExtensions: ['.vue']
    }
  },
  
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'vue/html-indent': ['error', 2],
  },
})
