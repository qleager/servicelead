# useBreakpoints composable

useBreakpoints is a shared composable that exposes the app breakpoints and convenience flags for responsive logic.
It wraps `@vueuse/core` useBreakpoints with the shared BREAKPOINTS map and a max-width strategy.

## Location
- Source: app/composables/useBreakpoints.ts
- Constants: shared/constants/breakpoints.ts

## Breakpoint ranges
The current range is derived from these max-width breakpoints:

| Key | Range (px) |
| --- | ---------- |
| xs  | 0-639      |
| sm  | 640-767    |
| md  | 768-1023   |
| lg  | 1024-1279  |
| xl  | 1280-1535  |
| 2xl | 1536-9999  |

## API

### useBreakpoints()
Returns an object with:
- current: ComputedRef<BreakpointKey>
- isXs
- isSm
- isMd
- isLg
- isXl
- is2xl
- isSmAndSmaller
- isMdAndSmaller
- isLgAndSmaller
- isXlAndSmaller
- isSmAndGreater
- isMdAndGreater
- isLgAndGreater
- isXlAndGreater

## Usage example

```ts
const {
  current,
  isMdAndGreater,
  isSmAndSmaller,
} = useBreakpoints()

watchEffect(() => {
  if (isSmAndSmaller.value) {
    // mobile behavior
  }

  if (isMdAndGreater.value) {
    // tablet/desktop behavior
  }

  console.log('Current breakpoint:', current.value)
})
```

## Notes
- The composable uses `strategy: 'max-width'` and `ssrWidth: 1024` for SSR.
- The `current` value matches keys from shared `BREAKPOINTS`.
