import type { Icons } from '@app/types/components/icon'

const iconModules = import.meta.glob('../../app/assets/icons/*.svg')

export const iconNames = Object.keys(iconModules)
  .map((path) => path.match(/\/([^/]+)\.svg$/)?.[1])
  .filter((name): name is Icons => Boolean(name))
  .sort()
