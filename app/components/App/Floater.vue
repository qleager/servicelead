<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import {
  useFloating,
  offset,
  autoPlacement,
  shift,
  size,
} from '@floating-ui/vue'

interface Props {
  mode?: modeType
  placement?: Placement
  dismissible?: boolean
  width?: string // 56px/100%; def auto
  portal?: string | HTMLElement // телепорт floating по строке типа ".body" или html элемента
}
// placement токлько 'top' | 'right' | 'bottom' | 'left'
// есть autoPlacement, но его нельзя использовать с flip. Можно только одно. Разница:
// https://floating-ui.com/docs/autoPlacement#conflict-with-flip

// закрытие по
type modeType = 'click' | 'hover'

const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
  placement: 'bottom',
  dismissible: true,
  width: 'auto',
  portal: 'body',
})

const model = defineModel<boolean>({ default: false })

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

const classname = computed(() => ([
  'floater',
]))

const { floatingStyles } = useFloating(reference, floating, {
  placement: props.placement,
  middleware: [
    offset(8),
    autoPlacement(),
    shift({ padding: 8 }),
    size({
      padding: 8,
      apply({ elements }) {
        Object.assign(elements.floating.style, {
          width: props.width,
        })
      },
    }),
  ],
})

let closeTimeout: ReturnType<typeof setTimeout> | null = null

const onMouseLeave = () => {
  if (props.mode !== 'hover') return
  closeTimeout = setTimeout(() => {
    model.value = false
  }, 100)
}
const onMouseEnter = () => {
  clearTimeout(closeTimeout)
  model.value = true
}

const onClickReference = () => {
  if (props.mode !== 'click') return
  model.value = !model.value
}

onClickOutside(floating, () => {
  if (props.mode === 'click' && props.dismissible) model.value = false
})

export type { Props as FloaterProps }
export type { modeType as FloaterModeType }
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
    <teleport
      v-if="model"
      :to="portal"
    >
      <div
        ref="floating"
        class="floater__slot floater__slot-content"
        :style="floatingStyles"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <slot name="content" />
      </div>
    </teleport>
  </div>
</template>

<style lang="scss">
.floater {
  $this: &;

  z-index: 10;

  &__slot-trigger {
    display: inline-block;
  }
}
</style>
