<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'
import type { Size, Subset } from '~/types/ds'

interface Props {
  items: Item[] | (string | number)[]
  /**
   * Size of Buttons
   *
   * * @defaultvalue `'md'`
   */
  size?: Subset<Size, 'md'>
  /**
   * Variant of Buttons
   *
   * - `'pill'` - like Outline button
   * - `'link'` - like Link button
   *
   * @defaultvalue `'pill'`
   */
  variant?: 'pill' | 'link'
}

type Model = Item['value'] | number

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
  disabled?: boolean
  icon?: IconProps['name']
  label: string
  trailingIcon?: boolean
  value?: string | number
}

const props = withDefaults(defineProps<Props>(), {
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

  const el = navRef.value?.querySelector<HTMLElement>('.tabs__item-active')

  if (!el) return

  indicatorStyle.value = {
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`,
  }
}

const onItemClick = (item: Item) => {
  model.value = item.value
}

export type { Props as TabsProps, Model as TabsModel, Item as TabsItem }
</script>

<template>
  <div :class="classname">
    <slot name="listLeading" />
    <div
      ref="navRef"
      class="tabs__nav"
    >
      <!-- IDEA: вынести в вспомогательный _Item.vue(TabsItem) -->
      <button
        v-for="(item, index) in items"
        :key="item.label+index"
        :class="{
          'tabs__item': true,
          'tabs__item-active': model === item.value,
          'tabs__item-trailing-icon': item.trailingIcon,
        }"
        :disabled="item.disabled"
        @click="onItemClick(item)"
      >
        <span class="tabs__item-content">
          <slot
            :index
            :item
            name="leading"
          />
          <div class="tabs__item-content-group">
            <AppIcon
              v-if="item.icon"
              class="tabs__item-icon"
              :name="item.icon"
            />
            <slot
              :index
              :item
              name="default"
            >
              {{ item.label }}
            </slot>
          </div>
          <slot
            :index
            :item
            name="trailing"
          />
        </span>
      </button>
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
  $variant-link: & + '-variant-link';
  $variant-pill: & + '-variant-pill';

  overflow: auto;
  display: flex;

  $this: &;

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

  &__item {
    $this: &;
    $trailing-icon: $this + '-trailing-icon';

    cursor: pointer;
    position: relative;
    flex-shrink: 0;

    @include text(regular, md);

    @include is($variant-pill) {
      display: flex;
      gap: $space-2;
      align-items: center;

      height: 48px;
      padding-inline: $space-4;
      border: 1px solid transparent;
      border-radius: 50px;

      background-color: transparent;

      transition: $blur-duration-sm;

      &:hover {
        border-color: $color-neutral-50 !important;
        transition: $hover-duration-sm;
      }

      &:disabled {
        cursor: not-allowed;
        color: $color-neutral-200 !important;
      }

      &::before {
        pointer-events: none;
        content: '';

        position: absolute;
        z-index: 1;
        inset: 0;

        border: 1px solid $color-neutral-300;
        border-radius: inherit;

        transition: $blur-duration-sm;
      }

      &:disabled::before {
        border-color: $color-neutral-200 !important;
      }

      &:hover::before {
        border: 1px solid $color-neutral-200;
        transition: $hover-duration-sm;
      }
    }

    @include is($variant-link) {
      padding-bottom: $space-2;
      color: $color-neutral;
      transition: $blur-duration-sm;

      &:hover {
        color: inherit;
        transition: $hover-duration-sm;
      }

      &:disabled {
        color: $color-neutral-200;
      }
    }

    &-active {
      @include is($variant-link) {
        color: inherit;
      }
    }

    &-content {
      pointer-events: none;

      position: relative;
      z-index: 3;

      display: inline-flex;
      gap: inherit;
      align-items: center;

      &-group {
        display: flex;
        gap: $space-2;

        @include is($trailing-icon) {
          flex-direction: row-reverse;
        }
      }
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
      background-color: white;
    }

    @include is($variant-link) {
      height: 1px;
      background-color: $color-neutral-900;
    }

  }
}
</style>
