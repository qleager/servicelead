# useOverlay composable

useOverlay is a shared composable for managing dynamic overlays (modals, drawers, dialogs) across the app.
It keeps a global list of overlay entries and exposes helpers to open, close, and patch them.
Rendering is handled by the OverlayProvider component.

## Location
- Source: app/composables/UseOverlay.ts
- Provider: app/components/app/OverlayProvider.vue

## Core ideas
- Call create(component, options) once and keep the returned handle.
- Overlay entries are stored in overlays and rendered by OverlayProvider.
- open() merges props, marks the overlay as mounted and open, and returns a Promise that resolves when close() is called.
- destroyOnClose removes the entry after unmount (OverlayProvider uses @after:leave).

## API

### useOverlay()
Returns an object with:
- overlays: shallow reactive array of overlay entries
- create(component, options?)
- open(id, props?)
- close(id, value?)
- closeAll()
- patch(id, props)
- unmount(id)
- isOpen(id)

### create(component, options?)
Options:
- defaultOpen: boolean (opens immediately and mounts the component)
- props: initial props for the component
- destroyOnClose: boolean (remove entry after unmount)

Returns an OverlayInstance with:
- id: symbol
- isOpen: boolean
- isMounted: boolean
- props: current merged props
- originalProps: the initial props passed in options
- open(props?)
- close(value?)
- patch(partialProps)

### open(props?)
Marks the overlay as mounted and open. If props are passed, they are merged with originalProps.
Returns a Promise that resolves when close() is called. The resolved type is inferred from the component's
'close' event payload, if present.
The returned Promise is also an object with id, isOpen, isMounted, and result (a self reference).

### close(value?)
Closes the overlay and resolves the pending Promise with value, if one exists.

### patch(props)
Merges the provided props into the current props without reopening the overlay.

### unmount()
Marks the overlay as unmounted. If destroyOnClose is true, removes it from overlays.

### closeAll()
Closes every overlay (does not unmount them).

### isOpen(id)
Returns the current open state for a given overlay.

## Usage example

### 1) Add the provider once (root layout or App)
```vue
<template>
  <OverlayProvider />
</template>
```

### 2) Create and open an overlay
```ts
import ConfirmDialog from '~/components/app/ConfirmDialog.vue'

const { create } = useOverlay()

const confirmLogoutModal = create(Modal, {
  props: { title: 'Are you sure you want to logut?' },
  destroyOnClose: true,
})

const onClickButton = async () => {
  const result = await confirmLogoutModal.open()

  if (result === 'accept') {
    try {
      await $api.auth.logout()
    }
    ...
  }
}
```

### 3) Emit close from the overlay component
```ts
const emit = defineEmits<{ close: 'accept' | 'reject' }>()

const onConfirm = () => emit('close', 'accept')
const onCancel = () => emit('close', 'reject')
```

## Notes
- OverlayProvider listens to the component's close event and calls close(id) for you.
- If you use transitions, emit or forward after:leave so OverlayProvider can unmount and optionally destroy.
