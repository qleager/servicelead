<script lang="ts" setup>
import type { TeleportProps } from 'vue'

interface Props {
  portal?: TeleportProps['to']
  transparent?: boolean
}

interface Emits {
  'click:backdrop': []
}

type Model = boolean

const props = withDefaults(defineProps<Props>(), {
  portal: 'body',
  transparent: false,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const classname = computed(() => ({
  'overlay': true,
  'overlay-transparent': props.transparent,
}))

export type { Props as OverlayProps, Emits as OverlayEmits, Model as OverlayModel }
</script>

<template>
  <Teleport
    v-if="model"
    :to="portal"
    :disabled="!portal"
  >
    <!-- TODO: добавить анимацию (после систематизации анимаций) -->
    <div
      :class="classname"
      @click.self="emits('click:backdrop')"
    >
      <slot />
    </div>
  </Teleport>
</template>

<style lang="scss">
.overlay {
  $this: &;
  $transparent: $this + '-transparent';

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba($color-neutral-light-700, 50%);

  &#{$transparent} {
    background-color: transparent;
  }
}
</style>
