// Runs before Nuxt hydrates to apply the saved theme and avoid a first-paint flash
export const colorModeHeadScript = `
  (function () {
    var storageKey = 'theme-color-mode'
    var fallback = 'light'

    try {
      var theme = localStorage.getItem(storageKey)

      if (theme !== 'light' && theme !== 'dark') {
        theme = fallback
      }

      document.documentElement.dataset.theme = theme
    } catch (_) {
      document.documentElement.dataset.theme = fallback
    }
  })()
`
