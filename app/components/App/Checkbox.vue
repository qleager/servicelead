<script lang="ts" setup>
interface Props {
  label?: string
  value?: null | string | number | bigint | Record<string, any>
  name?: string // и все остальные своейтсвенные input checkbox
  required?: boolean
  disabled?: boolean
}
const props = defineProps<Props>()

// Основное значение/состояние компоеннта – в нашем случае, выбран он или нет
const model = defineModel<boolean>({ default: false })

const classname = computed(() => ([
  'checkbox',
  { 'checkbox-checked': model.value }, // связываем через класс корневой элемент с состоянием инпута и модели
]))
</script>

<template>
  <label :class="classname">  <!-- обычный div с @click="model = !model" ломает disable и он не срабатывает. -->
    <input
      v-model="model"
      class="checkbox__field"
      type="checkbox"
      :name="props.name"
      :value="props.value"
      :required="props.required"
      :disabled="props.disabled"
    >
    <!-- Это квадратик из диза -->
    <span class="checkbox__bullet">
      <!-- Если выбран показываем иконку галочки внутри квдратика -->
      <!-- Тут v-if нужен чтобы не грузить инстанс AppIcon при ините, ведь зачастую чекбокс не выбран -->
      <!-- <AppIcon
        v-if="model"
      /> -->
    </span>
    <span class="checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss">
.checkbox {
  /* состояния указанные в диз макете */

  /* default */
  cursor: pointer;

  display: inline-flex;
  gap: $space-4;
  align-items: center;

  width: auto;
  height: 40px;
  border-radius: 4px;

  &__field {  // Обычный input hidden убирает focus. Потому лучший способ сохранить полную функциональность элемента и сделать его .sr-only( только для чтения с экрана) в большинстве браузеров, согластно статье https://www.tpgi.com/the-anatomy-of-visually-hidden/?utm_source=chatgpt.com
    position: absolute;

    overflow: hidden;

    width: 1px;
    height: 1px;

    white-space: nowrap;

    clip-path: inset(50%);
  }

  &__bullet {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    border-radius: 4px;

    background-color: $color-neutral-light-100;
  }

  &__label {
    &:empty {
      display: none;
    }

    @include text(regular, sm);
  }

  $this: &;              // default
  $hover: & + ':hover';  // hover
  $active: & + ':active'; // hoverpress
  $checked: & + '-checked'; // enter
  $field-disabled: & + '__field:disabled'; // disabled
  $field-focus: & + '__field:focus'; // focus

  /* hover */
  #{$hover} &__bullet {
    background-color: $color-neutral-light-400;
  }

  /* hoverpress */
  #{$active} &__bullet {
    background-color: $color-primary-500;
  }

  /* enter */
  #{$checked} &__bullet {
    background-color: $color-green; // временно зеленый вместо галочки, а вообще $color-primary-500;
  }

  /* disabled */
  &:has(#{$field-disabled}) {
    cursor: default;
  }
  #{$field-disabled} ~ &__bullet {
    border: 1px solid $color-neutral-light-400;
    background-color: transparent;
  }
  #{$field-disabled} ~ &__label {
    color: $color-neutral-light-400;
  }

  /* focus */
  &:focus-within {
    box-shadow:
      0 0 0 2px rgb(255 255 255 / 100%),
      0 0 0 4px rgb(8 97 238 / 100%);
  }
  #{$field-focus} ~ &__bullet {
    background-color: $color-neutral-light-100;
  }
}
</style>
