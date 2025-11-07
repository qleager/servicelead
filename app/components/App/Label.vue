<script lang="ts" setup>
interface Props {
  title?: string
  required?: boolean
  caption?: string
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  required: false,
  caption: '',
  error: '',
})

const classname = computed(() => [
  'label',
  { 'label-error': props.error },
])

const slotClassname = computed(() => [
  'label__slot',
  { 'label__slot-error': !!props.error },
])

const captionClassname = computed(() => [
  'label__caption',
  { 'label__caption-error': !!props.error },
])
</script>

<template>
  <label :class="classname">
    <div
      v-if="title"
      class="label__title"
    >
      {{ title }}<span v-if="required">*</span>
    </div>
    <div :class="slotClassname">
      <slot :required />
    </div>
    <div
      v-if="caption || error"
      :class="captionClassname"
    >
      {{ error || caption }}
    </div>
  </label>
</template>

<style lang="scss">
.label {
  $this: &;
  $slot-class: & + '__slot';

  width: fit-content;

  &__title {
    @include label(base, medium);

    margin-bottom: $space-2;
    color: $color-neutral-light-950;
  }

  &__slot {
    &#{$slot-class}-error {
      width: fit-content;
      outline: 1px solid $color-error;
    }
  }

  &__caption {
    @include text(regular, xs);

    margin-top: $space-2;
    color: $color-neutral-light-400;

    &-error {
      color: $color-error;
    }
  }
}
</style>
