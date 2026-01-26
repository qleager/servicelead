<!--
  TODO:
    1. добавить type Model
    2. экспорт типов props и model по аналогии с AppButton
-->
<script lang="ts" setup>
interface Props {
  /**
   * Initial height of content in px
   */
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
  fullHeight.value = contentRef.value?.scrollHeight ?? 0
})
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
          name="content"
          :is-collapsed="!model"
          :is-expanded="model"
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
