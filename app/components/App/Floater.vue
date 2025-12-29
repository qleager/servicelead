<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { TeleportProps } from 'vue'
import { onClickOutside } from '@vueuse/core'
import {
  useFloating,
  offset,
  autoPlacement,
  shift,
  size,
} from '@floating-ui/vue'

interface Props {
  mode?: 'click' | 'hover'
  placement?: Placement
  dismissible?: boolean
  /**
   * Width of Floater
   *
   * - `'auto'`         – width: auto
   * - `'reference'`    – width: reference.width
   * - `'minReference'` – min-width: reference.width
   * - `number`         – width: `number`px
   *
   * @defaultvalue `'auto'`
   */
  width?: 'auto' | 'reference' | 'min-reference' | number
  portal?: TeleportProps['to']
}

type Model = boolean

const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
  dismissible: true,
  width: 'auto',
})

const model = defineModel<Model>({ default: false })

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

let closeTimeout: ReturnType<typeof setTimeout> | undefined = undefined

const { floatingStyles } = useFloating(reference, floating, {
  placement: props.placement,
  strategy: 'fixed',
  middleware: [
    offset(8),
    ...(props.placement ? [] : [autoPlacement()]),
    shift({ padding: 8 }),
    size({
      padding: 8,
      apply({ elements }) {
        Object.assign(elements.floating.style, {
          ...floatingWidth.value,
        })
      },
    }),
  ],
})

const classname = computed(() => ([
  'floater',
]))

const floatingWidth = computed(() => {
  const referenceWidth = reference.value?.getBoundingClientRect().width ?? 0
  const px = (value: number) => `${value}px`

  switch (props.width) {
    case 'auto':
      return { width: 'auto' }

    case 'reference':
      return { width: px(referenceWidth) }

    case 'min-reference':
      return { minWidth: px(referenceWidth) }

    default:
      return { width: px(props.width) }
  }
})

const onMouseLeave = () => {
  if (props.mode !== 'hover') return
  closeTimeout = setTimeout(() => {
    model.value = false
  }, 100)
}

const onMouseEnter = () => {
  clearTimeout(closeTimeout)
  if (props.mode === 'hover') model.value = true
}

const onClickReference = () => {
  if (props.mode === 'hover') return
  model.value = !model.value
}

onClickOutside(
  floating,
  () => {
    model.value = props.mode === 'click' && props.dismissible ? false : true
  }, {
    ignore: [floating, reference],
  })

export type { Props as FloaterProps, Model as FloaterModel }
</script>

<template>
  <div :class="classname">
    <div
      ref="reference"
      class="floater__slot floater__slot-default floater__slot-trigger"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onClickReference"
    >
      <slot />
    </div>
    <Teleport
      :disabled="!portal"
      :to="portal"
    >
      <div
        v-if="model"
        ref="floating"
        class="floater__slot floater__slot-content"
        :style="floatingStyles"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <slot name="content" />
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss">
.floater {
  $this: &;

  z-index: 10;
  width: fit-content;

  &__slot {
    &-content {
      z-index: 1;
    }

    &-trigger {
      display: inline-block;
    }
  }
}
</style>
