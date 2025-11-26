<script lang="ts" setup>
interface Props {
  title?: string
  required?: boolean
  caption?: string
  error?: string
}

// TODO(YURA): не требуются тут withDefaults вообще
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

// TODO(YURA): состояния только на .label - убираем генераторы классов
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
    <!-- TODO(YURA): v-if убираем, в стилях label__title:empty { display: none } 
                    так чуть чище макет, и условились так прятать пустые элменты
    -->
    <div
      v-if="title"
      class="label__title"
    >
      {{ title }}<span v-if="required">*</span>
    </div>
    <!-- TODO(YURA): .label__slot -->
    <div :class="slotClassname">
      <slot :required />
    </div>
    <!-- TODO(YURA): v-if убираем, в стилях .label__caption:empty { display: none }
     class="label__caption"
     captionText как сomputed свойство, никаой условной логики в template быть не должно
    -->
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
  $error: & + '-error';

  width: fit-content;

  &__title {
    @include label(md, medium);
    // :empty

    margin-bottom: $space-2;
    color: $color-neutral-light-950;
  }

  &__caption {
    @include text(regular, xs);

    // :empty

    margin-top: $space-2;
    color: $color-neutral-light-400;

    #{$error} & {
      color: $color-error;
    }
  }
}
</style>
<!-- TODO(YURA): итого - чистый и изящный код получится -->
