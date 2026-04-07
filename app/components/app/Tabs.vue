<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'
import type { TabsItemProps } from './TabsItem.vue'
import type { Subset, Color } from '~/types/ds'

interface Props {
  /**
   * Colors of Indicator
   *
   * * @defaultvalue `'white'`
   */
  color?: Subset<Color, 'neutral'> | 'white'
  items: Item[] | (string | number)[]
  /**
   * Size of Buttons
   *
   * * @defaultvalue `'md'`
   */
  size?: TabsItemProps['size']
  /**
   * Variant of Buttons
   *
   * - `'pill'` - like Outline button
   * - `'link'` - like Link button
   *
   * @defaultvalue `'pill'`
   */
  variant?: TabsItemProps['variant']
}

type Model = Item['value'] | number

interface Slots {
  /**
   * As Item content
   */
  default: (props: { item: Item, index: number }) => VNodeChild
  /**
   * Before Item content
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
  disabled?: boolean
  icon?: IconProps['name']
  label: string
  trailingIcon?: boolean
  value?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'white',
  size: 'md',
  variant: 'pill',
})

const model = defineModel<Model>()

defineSlots<Slots>()

const indicatorStyle = ref({})
const navRef = ref<HTMLElement | null>(null)

const classname = computed(() => [
  'tabs',
  `tabs-variant-${props.variant}`,
  `tabs-size-${props.size}`,
  `tabs-color-${props.color}`,
])

const items = computed(() => (
  props.items.map((item, index) => {
    if (typeof item === 'object') {
      return {
        ...item,
        value: item.value ?? index,
      }
    }

    return {
      label: String(item),
      value: index,
    }
  })
))

watch(() => model.value, () => {
  updateIndicator()
}, { flush: 'post' })

onMounted(() => {
  if (model.value === undefined) {
    model.value = items.value.find(item => !item.disabled)?.value
  }

  updateIndicator()
})

const updateIndicator = async () => {
  await nextTick()

  const el = navRef.value?.querySelector<HTMLElement>('.tabs-item-active')

  if (!el) return

  indicatorStyle.value = {
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`,
  }
}

const onItemClick = (item: Item) => {
  model.value = item.value
}

export type { Props as TabsProps, Model as TabsModel, Item as TabsItem, Slots as TabsSlots }
</script>

<template>
  <div :class="classname">
    <slot name="listLeading" />
    <div
      ref="navRef"
      class="tabs__nav"
    >
      <AppTabsItem
        v-for="(item, index) in items"
        :key="item.label+index"
        v-bind="item"
        :active="model === item.value"
        :size
        :variant
        @click="onItemClick(item)"
      >
        <template #leading>
          <slot
            :index
            :item
            name="leading"
          />
        </template>
        <template #default>
          <slot
            :index
            :item
            name="default"
          />
        </template>
        <template #trailing>
          <slot
            :index
            :item
            name="trailing"
          />
        </template>
      </AppTabsItem>
      <div
        class="tabs__indicator"
        :style="indicatorStyle"
      />
    </div>
    <slot name="listTrailing" />
  </div>
</template>

<style lang="scss">
.tabs {
  $this: &;
  $variant-link: $this + '-variant-link';
  $variant-pill: $this + '-variant-pill';
  $white-color: $this + '-color-white';
  $neutral-color: $this + '-color-neutral';
  $size-xs: $this + '-size-xs';
  $size-sm: $this + '-size-sm';
  $size-md: $this + '-size-md';

  z-index: 0;
  overflow: auto;
  display: flex;

  &__nav {
    position: relative;
    display: flex;
    flex-shrink: 0;

    @include is($variant-pill) {
      gap: $space-2;
    }

    @include is($variant-link) {
      gap: $space-6;
    }
  }

  &__indicator {
    pointer-events: none;

    position: absolute;
    z-index: 2;
    bottom: 0;

    transition: $hover-duration-sm ease-in-out;

    @include is($variant-pill) {
      height: 100%;
      border-radius: 50px;
    }

    @include is($variant-link) {
      height: 1px;
      background-color: $color-neutral-900;
    }

    @include is($neutral-color + $variant-pill) {
      background-color: $color-neutral-100;
    }

    @include is($white-color + $variant-pill) {
      background-color: white;
    }
  }
}
</style>
