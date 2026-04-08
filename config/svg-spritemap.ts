import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'

const svgSpritemapOptions = {
  types: './types/components/icon.d.ts',
  svgo: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupIds: false,
          },
        },
      },
      {
        name: 'prefixIds',
        params: {
          prefix: false,
        },
      },
      {
        name: 'removeAttrs',
        params: {
          attrs: '(fill|stroke)',
        },
      },
    ],
  },
} as const

export function createSvgSpritemapPlugin(pattern: string) {
  return VitePluginSvgSpritemap(pattern, svgSpritemapOptions)
}

export { svgSpritemapOptions }
