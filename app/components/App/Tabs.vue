<script lang="ts" setup>
import type { ButtonProps } from './Button.vue'
import type { IconProps } from './Icon.vue'

interface Props {
  items: Item[]
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  // TODO(YURA): этот компонент именно повторяет кнопку
  // не требовалось придумавыть специфисные значения color для этого (tab-lined/tab-filled)
  // Это универсальные/глобальные компоненты, не делаем ничего специфичного/уникального под задачу или что либо
  // там есть квадратная таб = его игнорим - он как раз специфичный
  color?: ButtonProps['color']
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

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'filled',
})

const model = defineModel<Model>({ required: false })

const classname = computed(() => [
  'tabs',
])

// убираем
const tabColor = computed(() => {
  if (props.variant === 'lined') {
    return 'tab-lined'
  }
  else if (props.variant === 'filled') {
    return 'tab-filled'
  }
  else {
    return 'tab-nofilled'
  }
})

const onClick = (newValue: Model) => {
  model.value = newValue
}

export type { Props as TabsProps, Item as TabsItem }
</script>

<template>
  <div :class="classname">
    <div class="tabs__nav">
      <!-- TODO(YURA): просто :size, :color, :variant -->
      <AppButton
        v-for="tab in items"
        :key="tab.value"
        class="tabs__nav-item"
        :size="size"
        :color="tabColor"
        :variant="variant"
        :icon="tab.icon"
        :trailing-icon="tab.trailingIcon"
        :disabled="tab.disabled"
        :active="model === tab.value"
        @click="onClick(tab.value)"
      >
        {{ tab.label }}
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.tabs {
  $this: &;

  &__nav {
    display: inline-flex;
    gap: $space-2;
  }
}
</style>
