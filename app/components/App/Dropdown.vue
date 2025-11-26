<script lang="ts" setup>
// TODO(YURA): FloaterProps['mode']
interface Props {
  mode?: 'click' | 'hover'
}

const props = defineProps<Props>()

const classname = computed(() => [
  'dropdown',
  `dropdown-mode-${props.mode}`,
])
</script>

<template>
  <div :class="classname">
    <!-- TODO(YURA): достаточно просто :mode, и плейсмент уберем, пусть будет авто пока  -->
    <AppFloater
      :mode="mode"
      placement="bottom"
    >
      <div class="dropdown__slot dropdown__slot-default">
        <slot />
      </div>
      <template #content>
        <!-- TODO(YURA): .dropdown__slot -->
        <div class="dropdown__content">
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

  &__content {
    padding: $space-4 $space-2;
    border-radius: $radius-2;
    background: white;

    // TODO(YURA): вижу по макету, что вынесены в стили тени
    // давай в ds под них сделаем файл
    box-shadow: 0 0 35px 0 #1C265A1A;
  }
}
</style>
