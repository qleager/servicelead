<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { ButtonProps } from './Button.vue'
import type { IconProps } from './Icon.vue'

interface Props {
  color?: ButtonProps['color']
  items: Item[]
  /**
   * Size of Buttons
   *
   * * @defaultvalue `'md'`
   */
  size?: ButtonProps['size']
}

type Model = Item['value']

interface Slots {
  /**
   * As Item content
   */
  default: (props: { item: Item, index: number }) => VNodeChild
  /**
   * Before Item content, instead of Item icon
   */
  leading: (props: { item: Item, index: number }) => VNodeChild
  /**
   * Before list of Item's
   */
  listLeading: () => VNodeChild
  /**
   * After list of Item's
   */
  listTrailing: () => VNodeChild
  /**
   * After Item content
   */
  trailing: (props: { item: Item, index: number }) => VNodeChild
}

interface Item {
  disabled?: ButtonProps['disabled']
  icon?: IconProps['name']
  label: string
  trailingIcon?: ButtonProps['trailingIcon']
  value?: ButtonProps['value']
  // TODO: в дальнейшем привязка к слоту из вне
  // slot: string
  // Подразумевается передача данных Item наверх, через scoped-slots, по имени слота (slot: string)
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const model = defineModel<Model>()

defineSlots<Slots>()

const classname = computed(() => [
  'items',
])

onMounted(() => {
  if (model.value === undefined) {
    model.value = props.items[0]?.value || 0
  }
})

const getActiveItemBind = (value: Item['value']) => {
  if (isActiveItem(value)) {
    return {
      variant: 'filled' as const,
      color: props.color,
      class: 'items__nav-item items__nav-item--active',
    }
  }
}

const isActiveItem = (value: Item['value']) => model.value == value

const onItemClick = (event: MouseEvent) => {
  model.value = (event.currentTarget as HTMLButtonElement).value
}

export type { Props as TabsProps, Model as TabsModel, Item as TabsItem }
</script>

<template>
  <div :class="classname">
    <div class="items__nav">
      <slot name="listLeading" />
      <AppButton
        v-for="(item, index) in items"
        :key="item.label+index"
        :active="model === item.value"
        class="items__nav-item"
        color="neutral"
        :disabled="item.disabled"
        :icon="item.icon"
        :size
        :trailing-icon="item.trailingIcon"
        :value="item.value || index"
        variant="lined"
        v-bind="getActiveItemBind(item.value || index)"
        @click="(e: MouseEvent) => onItemClick(e)"
      >
        <slot
          :index
          :item
          name="leading"
        />
        <slot
          :index
          :item
          name="default"
        >
          {{ item.label }}
        </slot>
        <slot
          :index
          :item
          name="trailing"
        />
      </AppButton>
      <slot name="listTrailing" />
    </div>
  </div>
</template>

<style lang="scss">
.items {
  $this: &;

  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;

    &-item {
      &--active {
        pointer-events: none;
      }
    }
  }
}
</style>
