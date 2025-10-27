<script lang="ts" setup>
/* TODO:
 * Завязан на комопненте-кнопки
 * Нет контента, только кнопки и model – то есть при клике по табам получаем активный таб и в родителе профодим какую то манипулмяцию
 * На этом компоненте можно увидеть как раз дизайн-систему и как все между собой может(должно) дружить
 */

interface Props {
  items: Item[]
  size: ButtonProps['size']
}

interface Item {
  label: string
  icon?: IconProps['name']
  trailingIcon?: ButtonProps['trailingIcon']
  value: ButtonProps['value']
  disabled?: ButtonProps['disabled']
  // slot: string // в дальнейшем привязка к слоту из вне
}

type Model = Item['value']

const model = defineModel<Model>({ required: false })

export type { Props as TabsProps, Item as TabsItem }
</script>

<template>
  <div :class="classname">
    <div class="tabs__nav">
      <AppButton
        v-for
        class="tabs__nav-item"
        :size
        :icon="tab.icon"
        :disabled="tab.disabled"
        :active="model === tab.value"
      >
        {{ label }}
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.tabs {
  $this: &;
}
</style>
