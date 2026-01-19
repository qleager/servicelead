<script lang="ts" setup>
interface Props {
  initHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  initHeight: 0,
})

const model = defineModel<boolean>()

const contentRef = ref<HTMLElement | null>(null)

const fullHeight = ref<number>(0)

const contentStyleVariables = computed(() => ({
  '--content-height': model.value
    ? `${fullHeight.value}px`
    : `${props.initHeight}px`,
}))

onMounted(() => {
  if (contentRef.value) {
    fullHeight.value = contentRef.value.scrollHeight
  }
})
</script>

<template>
  <div class="collapse">
    <div
      class="collapse__slot collapse__slot-default"
      @click="model = !model"
    >
    </div>
    <div
      class="collapse__content"
      :style="contentStyleVariables"
    >
      <div
        ref="contentRef"
        class="collapse__slot collapse__slot-content"
      >
        <slot
          name="content"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.collapse {
  $this: &;

  &__slot {
    &-default {
      cursor: pointer;
    }
  }

  &__content {
    overflow: hidden;
    height: var(--content-height);
  }
}
</style>
