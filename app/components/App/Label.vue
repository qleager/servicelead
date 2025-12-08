<script lang="ts" setup>
interface Props {
  title?: string
  required?: boolean
  caption?: string
  error?: string
}

const props = defineProps<Props>()

const classname = computed(() => [
  'label',
  { 'label-error': props.error },
])

const captionText = computed(() =>
  props.error || props.caption,
)
</script>

<template>
  <label :class="classname">
    <div
      class="label__title"
    >
      {{ title }}
      <sup
        v-if="required"
        class="label__title-required"
      >*</sup>
    </div>
    <div class="label__slot">
      <slot :required />
    </div>
    <div
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

    @include label(md, medium);

    color: $color-neutral-light-950;

    &:empty {
      display: none;
    }

    #{$error} & {
      color: $color-error;
    }

    &-required {
      position: relative;
      top: .40em;

      @include text(medium, sm);
    }
  }

  &__caption {
    margin-top: $space-2;

    @include text(regular, xs);

    color: $color-neutral-light-400;

    &:empty {
      display: none;
    }

    #{$error} & {
      color: $color-error;
    }
  }

  &-error {
    #{$this} {
      &__caption {
        color: $color-error;
      }

      &__slot {
        // если нужно, можно стилизовать slot при ошибке
        border-color: $color-error;
      }

      &__title {
        color: $color-error;
      }
    } 
    

  }
}
</style>
