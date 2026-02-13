<script lang="ts" setup>
interface Props {
  visible?: boolean
}

defineProps<Props>()

export type { Props as BackdropProps }
</script>

<template>
  <Transition
    name="backdrop__transition"
  >
    <div
      v-if="visible"
      class="backdrop"
    />
  </Transition>
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

  &__transition {
    &-enter {
      &-from {
        opacity: 0;
      }

      &-to {
        animation: fadeIn $show-duration-lg ease-out forwards;
      }
    }

    &-leave {
      &-active {
        animation: fadeOut $hide-duration-lg ease-in forwards;
      }
    }
  }
}
</style>
