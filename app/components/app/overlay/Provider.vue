<script setup lang="ts">
const { overlays, unmount, close } = useOverlay()

const mountedOverlays = computed(() => overlays.filter((overlay: Overlay) => overlay.isMounted))

const onAfterLeave = (id: symbol) => {
  close(id)
  unmount(id)
}

const onClose = (id: symbol, payload?: unknown) => {
  close(id, payload)
}
</script>

<template>
  <component
    :is="overlay.component"
    v-for="overlay in mountedOverlays"
    :key="overlay.id"
    v-model="overlay.isOpen"
    v-bind="overlay.props"
    @close="onClose(overlay.id, $event)"
    @after:leave="onAfterLeave(overlay.id)"
  />
</template>
