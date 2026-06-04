import type { Preview } from '@storybook-vue/nuxt'

type ThemeColorMode = 'light' | 'dark'

const themeColorModes: ThemeColorMode[] = ['light', 'dark']

const applyTheme = (theme: ThemeColorMode) => {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme-color-mode', theme)
}

const getInitialTheme = (): ThemeColorMode => {
  const theme = localStorage.getItem('theme-color-mode')

  return themeColorModes.includes(theme as ThemeColorMode) ? theme as ThemeColorMode : 'light'
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme color mode',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        title: 'Theme',
      },
    },
  },
  initialGlobals: {
    theme: getInitialTheme(),
  },
  decorators: [
    (_, context) => {
      const theme = context.globals.theme

      applyTheme(themeColorModes.includes(theme) ? theme : 'light')

      return {
        template: `
          <div id="teleports"></div>
          <story />
        `,
      }
    },
  ],
  parameters: {
    layout: 'centered',
    controls: {
      disableSaveFromUI: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: false,
    },
    options: {
      panelPosition: 'right',
    },
  },
}

export default preview
