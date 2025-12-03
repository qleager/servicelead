<script lang="ts" setup>
interface Props {
  mode?: FloaterProps['mode']
}

const props = defineProps<Props>()

const classname = computed(() => [
  'dropdown',
  `dropdown-mode-${props.mode}`,
])
</script>

<template>
  <div :class="classname">
    <AppFloater
      :mode
    >
      <div class="dropdown__slot dropdown__slot-default">
        <slot />
      </div>
      <template #content>
        <div class="dropdown__slot">
          <slot name="content" />
        </div>
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.dropdown {
  $this: &;

  width: fit-content;

  &__slot {
    padding: $space-4 $space-2;
    border-radius: $radius-2;
    background: white;
    box-shadow: $shadow-light-mode;
  }
}
</style>
