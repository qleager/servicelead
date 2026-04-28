<script lang="ts" setup>
interface Props {
  caption?: string
  error?: string
  required?: boolean
  title?: string
}

const props = defineProps<Props>()

const classname = computed(() => [
  'label',
  { 'label-error': props.error },
])

const captionText = computed(() => props.error || props.caption)

export type { Props as LabelProps }
</script>

<template>
  <label :class="classname">
    <div
      v-if="title"
      class="label__title"
    >
      {{ title }}
      <span
        v-if="required"
        class="label__required"
      >*</span>
    </div>
    <slot :required />
    <div
      v-if="captionText"
      class="label__caption"
    >
      {{ captionText }}
    </div>
  </label>
</template>

<style lang="scss">
.label {
  $this: &;
  $error: & + '-error';

  width: fit-content;

  &__title {
    margin-bottom: $space-2;

    @include label(medium, md);

    color: $color-neutral-950;

    @include is($error) {
      color: $color-error;
    }
  }

  &__required {
    color: $color-red;;
  }

  &__caption {
    margin-top: $space-2;

    @include text(regular, xs);

    color: $color-neutral-400;

    @include is($error) {
      color: $color-error;
    }
  }
}
</style>
