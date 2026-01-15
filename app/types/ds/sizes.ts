const sizes = [
  'sm',
  'md',
  'lg',
] as const

export type Sizes = (typeof sizes)[number]