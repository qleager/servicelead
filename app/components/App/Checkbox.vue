<script lang="ts" setup>
interface Props {
  label?: string
  value?: null | string | number | bigint | Record<string, any>
  name?: string // и все остальные своейтсвенные input checkbox
  // required
  // disabled
  // и больше нам ПОКА никакие не нужны
}

// Основное значение/состояние компоеннта – в нашем случае, выбран он или нет
const model = defineModel<boolean>({ default: false })

const classname = computed(() => ([
  'checkbox',
  // тут можно делать { 'checkbox-checked': model.value } так будет вешаться .checkbox-checked, когда model = true
]))
</script>

<template>
  <!--
   @click чтобы менять выбран/невыбран при клике по всему компоненту
  -->
  <div
    :class="classname"
    @click="model = !model"
  >
    <!-- Hidden - вешаем чтобы скрыть нативный инпут и заверстать свой нормальный
      так как мы будем использовать form.submit() то все атрибуты свойственные input мы вешаем на этот скрытый input
    -->
    <input
      v-model="model"
      class="checkbox__field"
      type="checkbox"
      hidden
    >
    <!-- Это будет квадратик из диза -->
    <span class="checkbox__bullet">
      <!-- Если выбран показываем иконку галочки внутри квдратика -->
      <!-- Тут v-if нужен чтобы не грузить инстанс AppIcon при ините, ведь зачастую чекбокс не выбран -->
      <AppIcon
        v-if="model"
      />
    </span>
    <!-- Тут пропс label выводим, это текст редяом
      Если его нет, будем делать display: none через псевдо :empty
    -->
    <span class="checkbox__label">
      {{ label }}
    </span>
  </div>
</template>

<style lang="scss">
.checkbox {
  $this: &;
  $hover: & + ':hover';
  $active: & + ':active';
  $field-checked: & + '__field:checked';

  &__bullet {
    #{$hover} & {
      background-color: $color-neutral-400;
    }

    // скомпилируется в .checkbox:active .checkbox__bullet
    #{$active} & {
      background-color: $color-primary;
    }

    // обратить внимание на ~
    // но можно и через classname вешать .checkbox-checked
    // тогда заведем переменную $checked: & + '-checked';
    #{$field-checked} ~ & {
      background-color: $color-primary;
    }
  }

  &__label {
    &:empty {
      // так чуть экономим на произволительности, не используя v-if
      // и темплейт выглядит чище
      display: none;
    }
  }
}
</style>
