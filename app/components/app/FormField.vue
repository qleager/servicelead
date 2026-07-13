<script lang="ts" setup>
import { formFieldInjectionKey, formInjectionKey, type FormFieldInjection } from '~/composables/useFormField'

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

const injection = inject(formInjectionKey, null)

const props = defineProps<Props>()

const classname = computed(() => [
  'label',
  { 'label-error': errorMessage.value },
])

const captionText = computed(() => errorMessage.value || props.caption)

const errorMessage = computed(() => (
  props.error || injection?.errors.value.find(item => item.name === props.name)?.message[0]
))

provide<FormFieldInjection>(formFieldInjectionKey, {
  name: computed(() => props.name),
  errorMessage,
})

export type { Props as FormFieldProps }
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
    color: $color-red;
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
