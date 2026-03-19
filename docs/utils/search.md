# search utility

search is a small wrapper around Fuse.js that performs fuzzy search
and returns the matched items in the original type.

## Location
- Source: app/utils/search.ts

## API

### search<T>(items, searchPattern, options?)
Returns:
- Array<T>

Parameters:
- items: Array<T>
- searchPattern: string
- options?: IFuseOptions<T>

## Usage example

```ts
type User = {
  id: number
  name: string
  email: string
}

const users: Array<User> = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@site.dev' },
  { id: 2, name: 'Alan Turing', email: 'alan@site.dev' },
]

const result = search(users, 'Ada', {
  keys: ['name', 'email'],
  threshold: 0.3,
})
```

## Notes
- Uses `fuse.js` under the hood.
- When `options` are omitted, Fuse.js defaults apply.
