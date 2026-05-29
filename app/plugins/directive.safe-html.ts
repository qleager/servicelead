import DOMPurify, { type Config } from 'isomorphic-dompurify'
import type { DirectiveBinding } from 'vue'

type SafeHtmlValue
  = string
    | {
      config?: Config
      html?: string
    }
    | null
    | undefined

const codeConfig = {
  ALLOWED_ATTR: ['class'],
  ALLOWED_TAGS: ['span'],
} satisfies Config

const isSafeHtmlObject = (value: SafeHtmlValue): value is { config?: Config, html?: string } => (
  typeof value === 'object'
  && value !== null
  && 'html' in value
)

const getSafeHtml = (binding: DirectiveBinding<SafeHtmlValue>): string => {
  const html = isSafeHtmlObject(binding.value)
    ? binding.value.html
    : binding.value

  const config = binding.arg === 'code'
    ? codeConfig
    : isSafeHtmlObject(binding.value)
      ? binding.value.config
      : undefined

  return DOMPurify.sanitize(html ?? '', config)
}

export default defineNuxtPlugin({
  name: 'safe-html-directive-plugin',
  parallel: true,
  async setup(nuxtApp) {
    nuxtApp.vueApp.directive('safe-html', {
      getSSRProps: binding => ({
        innerHTML: getSafeHtml(binding),
      }),
      mounted: (element, binding) => {
        element.innerHTML = getSafeHtml(binding)
      },
      updated: (element, binding) => {
        element.innerHTML = getSafeHtml(binding)
      },
    })
  },
})
