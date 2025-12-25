import Fuse, { type IFuseOptions } from 'fuse.js'

export function search<T>(
  items: Array<T>,
  searchPattern: string,
  // options?: Omit<IFuseOptions<T>, 'keys'> & { keys: Array<keyof T> },
  options?: IFuseOptions<T>,
) {
  const fuse = new Fuse<T>(items, options)

  return fuse.search(searchPattern).map(r => r.item)
}
