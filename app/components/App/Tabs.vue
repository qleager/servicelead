<script lang="ts" setup>
import type { ButtonProps } from './Button.vue'
import type { IconProps } from './Icon.vue'

interface Props {
  items: Item[]
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
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

onBeforeMount(() => {
  if (!model.value) {
    model.value = props.items[0]?.value
  }
})

const onItemClick = (value: Item['value']) => {
  model.value = value
}

export type { Props as TabsProps, Item as TabsItem, Model as TabsModel }
</script>

<template>
  <div :class="classname">
    <div class="tabs__nav">
      <AppButton
        v-for="tab in items"
        :key="tab.value"
        class="tabs__nav-item"
        :size
        :color
        :variant
        :icon="tab.icon"
        :trailing-icon="tab.trailingIcon"
        :disabled="tab.disabled"
        :active="model === tab.value"
        @click="onItemClick(tab.value)"
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
    flex-wrap: wrap;
    gap: $space-2;
  }
}
</style>
