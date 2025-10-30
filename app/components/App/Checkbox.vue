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
  <label :class="classname">  <!-- обычный div с @click="model = !model" ломает disable и он не срабатывает. label же связвывается с input через id или как тут через вложенность ловит для него ckick от всех вложенных елементов -->

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
  cursor: pointer;

  display: inline-flex;
  gap: $space-4;
  align-items: center;

  width: auto;
  height: 40px;
  border-radius: 4px;

  $this: &;
  $hover: & + ':hover';  // hover
  $active: & + ':active'; // hoverpress
  $focus: & + ':focus'; // focus
  $checked: & + '-checked'; // enter     // состояние true определяем через класс корневого элемента, а не инпута, так как у нас оно меняется по клику на весь корневой элемент включая текст. Считаю что более правильно.
  $field-disabled: & + '__field:disabled'; // disabled
  $field-focus: & + '__field:focus'; // focus

  &:has(#{$field-focus})  { // обводка при фокусе
    box-shadow:
      0 0 0 2px rgb(255 255 255 / 100%),
      0 0 0 4px rgb(8 97 238 / 100%);
  }

  &__field {  // лучший способ сохранить полную функциональность элемента и сделать его .sr-only( только для чтения с экрана) в большинстве браузеров, согластно статье https://www.tpgi.com/the-anatomy-of-visually-hidden/?utm_source=chatgpt.com
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

    #{$hover} & {
      background-color: $color-neutral-light-400;
    }

    // скомпилируется в .checkbox:active .checkbox__bullet
    #{$active} & {
      background-color: $color-primary-500;
    }

    // но можно и через $field-checked ~ &;, если состояние будет меняеться только по клику на инпут
    // тогда заведем переменную  $field-checked: & + '__field:checked';
    #{$checked} > & {
      background-color: $color-green; // временно зеленый вместо галочки
    }

    #{$field-disabled} ~ & {
      border: 1px solid $color-neutral-light-400;
      background-color: transparent;
    }

    #{$field-focus} ~ & {
      background-color: $color-neutral-light-100;
    }
  }

  &__label {
    &:empty {
      display: none;
    }

    @include text(regular, sm);

    #{$field-disabled} ~ & {
      color: $color-neutral-light-400;
    }
  }
}
</style>
