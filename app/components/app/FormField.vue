<script lang="ts" setup>
import type { FormInjection } from './Form.vue'

interface Props {
  caption?: string
  error?: string
  /**
   * The name of the FormField. Also used to match form errors and assigned to inputs nested in the slot
   */
  name?: string
  required?: boolean
  title?: string
}

type Injection = ComputedRef<{
  name: typeof props.name
  error?: string
}>

const injection = inject('formState') as FormInjection

const props = defineProps<Props>()

const classname = computed(() => [
  'label',
  { 'label-error': errorMessage.value },
])

const captionText = computed(() => errorMessage.value || props.caption)

const errorMessage = computed(() => {
  return props.error || injection.value.errors.value.find(item => item.name === props.name)?.message.toString()
})

provide<Injection>('formFieldState', computed(() => ({
  name: props.name,
  error: errorMessage.value,
})))

export type { Props as FormFieldProps, Injection as FormFieldInjection }
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
