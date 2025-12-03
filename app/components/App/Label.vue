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
   props.error || props.caption
)
</script>

<template>
  <label :class="classname">
    <div
      class="label__title"
    >
      {{ title }}<span v-if="required">*</span>
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
    @include label(md, medium);

    &:empty {
      display: none;
    }

    margin-bottom: $space-2;
    color: $color-neutral-light-950;
  }

  &__caption {
    @include text(regular, xs);

    &:empty {
      display: none;
    }

    margin-top: $space-2;
    color: $color-neutral-light-400;

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
