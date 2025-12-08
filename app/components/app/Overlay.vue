<script lang="ts" setup>
interface Emits {
  'click:backdrop': []
}

type Model = boolean

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

export type { Emits as OverlayEmits, Model as OverlayModel }
</script>

<template>
  <Teleport to="body">
    <!-- TODO: добавить анимацию (после систематизации анимаций) -->
    <div
      v-if="model"
      class="overlay"
      @click.self="emits('click:backdrop')"
    >
      <slot />
    </div>
  </Teleport>
</template>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba($color-neutral-light-700, 50%);
}
</style>
