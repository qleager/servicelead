<script lang="ts" setup>
import type { BackdropEmits } from '../Backdrop.vue'

interface Props {
  /**
   * Show backdrop
   *
   * @defaultvalue `true`
   */
  backdrod?: boolean
}

// TODO: Сделать недоступным эмит если backdrod = false
interface Emits {
  'click:backdrop': BackdropEmits['click']
}

withDefaults(defineProps<Props>(), {
  backdrod: true,
})

defineEmits<Emits>()

export type { Props as OverlayProps, Emits as OverlayEmits }
</script>

<template>
  <Teleport
    defer
    to="#teleports"
  >
    <AppBackdrop
      v-if="backdrod"
      @click="$emit('click:backdrop')"
    />
    <slot />
  </Teleport>
</template>
