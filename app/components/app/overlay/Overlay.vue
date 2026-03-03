<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { useDocumentScrollLock } from '~/composables/useDocumentScrollLock'

interface Props {
  /**
   * Show backdrop
   *
   * @defaultvalue `true`
   */
  backdrod?: boolean
  /**
   * Lock document scroll while overlay is active
   *
   * @defaultvalue `false`
   */
  lockScroll?: boolean
}

// TODO: Сделать недоступным эмит если backdrod = false
interface Emits {
  'click:backdrop': []
}

const props = withDefaults(defineProps<Props>(), {
  backdrod: true,
  lockScroll: true,
})

defineEmits<Emits>()

const { lock, unlock } = useDocumentScrollLock()

watch(() => props.lockScroll, value => value ? lock() : unlock())

onBeforeMount(() => {
  if (props.lockScroll) {
    lock()
  }
})

onBeforeUnmount(() => {
  if (props.lockScroll) {
    unlock()
  }
})

export type { Props as OverlayProps, Emits as OverlayEmits }
</script>

<template>
  <Teleport
    to="#teleports"
  >
    <AppBackdrop
      :visible="backdrod"
      @click="$emit('click:backdrop')"
    />
    <slot />
  </Teleport>
</template>
