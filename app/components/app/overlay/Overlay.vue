<script lang="ts" setup>
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
  'click:backdrop': []
}

withDefaults(defineProps<Props>(), {
  backdrod: true,
})

defineEmits<Emits>()

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
