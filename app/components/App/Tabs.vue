<script lang="ts" setup>
import type { ButtonProps } from './Button.vue'
import type { IconProps } from './Icon.vue'

interface Props {
  items: Item[]
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
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

const onClick = (val: Model) => {
  model.value = val
}

export type { Props as TabsProps, Item as TabsItem }
</script>

<template>
  <div :class="classname">
    <div class="tabs__nav">
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
