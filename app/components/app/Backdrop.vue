<script lang="ts" setup>
</script>

<template>
  <!-- TODO: добавить анимацию (после систематизации анимаций) -->
  <div
    class="backdrop"
  />
</template>

<style lang="scss">
.backdrop {
  position: fixed;
  z-index: inherit;
  top: 0;
  left: 0;

  width: 100dvw;
  height: 100dvh;

  background-color: rgba($color-neutral-700, 50%);
}
</style>
