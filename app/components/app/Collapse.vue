<script lang="ts" setup>
interface Props {
  /**
   * Initial height of content in px
   */
  initHeight?: number
}

type Model = boolean

const props = withDefaults(defineProps<Props>(), {
  initHeight: 0,
})

const model = defineModel<Model>()

const contentRef = ref<HTMLElement | null>(null)

const fullHeight = ref<number>(0)

const contentStyleVariables = computed(() => ({
  '--content-height': model.value
    ? `${fullHeight.value}px`
    : `${props.initHeight}px`,
}))

onMounted(() => {
  fullHeight.value = contentRef.value?.scrollHeight ?? 0
})

export type { Props as CollapseProps }
</script>

<template>
  <div class="collapse">
    <div
      class="collapse__slot collapse__slot-default"
      @click="model = !model"
    >
      <slot
        :is-collapsed="!model"
        :is-expanded="model"
      />
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
          :is-collapsed="!model"
          :is-expanded="model"
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
