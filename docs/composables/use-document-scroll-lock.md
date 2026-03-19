# useDocumentScrollLock composable

useDocumentScrollLock is a shared composable that locks the document scroll
with a reference counter so multiple consumers can coordinate safely.

## Location
- Source: app/composables/useDocumentScrollLock.ts

## API

### useDocumentScrollLock()
Returns an object with:
- lock: () => void
- unlock: () => void
- isLocked: ComputedRef<boolean>

## Usage example

```ts
const { lock, unlock, isLocked } = useDocumentScrollLock()

onMounted(() => {
  lock()
})

onBeforeUnmount(() => {
  unlock()
})

watch(isLocked, (value) => {
  console.log('Scroll locked:', value)
})
```

## Notes
- Uses `@vueuse/core` useScrollLock(document) under the hood.
- The first lock enables scroll locking; the last unlock disables it.
- Keep lock/unlock calls balanced to avoid negative counters.
