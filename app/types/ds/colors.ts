const colors = [
  'primary',
  'neutral',
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'purple',
] as const

export type Colors = (typeof colors)[number]