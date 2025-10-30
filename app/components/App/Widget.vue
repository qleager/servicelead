<script lang="ts" setup>
interface Props {
  icon?: IconProps['name']
  title?: string
  /*
   * Кнопка в header'e справа
   * [роут или действие, Текст перед кнопкой]
   * TODO: Добавить типизацию роутов (не на первом этапе)
   */
  action?: [string | (() => void), string | undefined] //
  // Card = Новости на дасшборде
  // section = Топ офферы на дасшборде
  variant?: 'card' | 'section' // def card
}
</script>

<template>
  <div class="widget">
    <div class="widget__header">
      <div class="widget__header-row">
        <button class="widget__action">
          <span>{{ action[1] }}</span>
          <AppButton class="widget__action-button" />
        </button>
      </div>
    </div>
    <div class="widget__slot widget__slot-header widget__header-slot widget__header-row">
      <slot name="header" />
    </div>
    <div class="widget__main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.widget {
  $this: &;

  // Игнор, что в дизе они все разные
  padding: $space-4;
}
</style>
