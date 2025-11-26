<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { TeleportProps } from 'vue'
import { Teleport } from 'vue'
import { onClickOutside } from '@vueuse/core'
import {
  useFloating,
  offset,
  // autoPlacement,
  flip,
  shift,
  size,
} from '@floating-ui/vue'

interface Props {
  mode?: 'click' | 'hover'
  // TODO(YURA): давай если placement не задан - юзать autoPlacement
  placement?: Placement
  dismissible?: boolean
  width?: string
  portal?: TeleportProps['to']
}
// TODO(YURA): давай тогда откажемся от flip
//
// placement токлько 'top' | 'right' | 'bottom' | 'left'
// есть autoPlacement, но его нельзя использовать с flip. Можно только одно. Разница:
// https://floating-ui.com/docs/autoPlacement#conflict-with-flip

const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
  dismissible: true,
  width: 'auto',
})

const model = defineModel<boolean>({ default: true })

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

let closeTimeout: ReturnType<typeof setTimeout> | undefined = undefined

const { floatingStyles } = useFloating(reference, floating, {
  placement: props.placement,
  middleware: [
    offset(8),
    // TODO(YURA): если нет props.placement испоьзуем autoPlacement()
    // autoPlacement(),
    flip(),
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

const classname = computed(() => ([
  'floater',
]))

const componentTag = computed(() => props.portal ? 'div' : Teleport)

const onMouseLeave = () => {
  if (props.mode !== 'hover') return
  closeTimeout = setTimeout(() => {
    model.value = false
  }, 100)
}// TODO(YURA): перенос строки
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
    // TODO(YURA): так почише выглядит
    model.value = props.mode === 'click' && props.dismissible ? false : true
    // if (props.mode === 'click' && !props.dismissible) model.value = false
  }, {
    // TODO(YURA): так при клике по reference, и при mode=click сработает закрытие
    // как то колхозно немного, мб есть лучше реализации, например ref="root" сделать, хз, подумай
    ignore: [floating, reference],
  })

export type { Props as FloaterProps }
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
    <!-- TODO(YURA):
          Важно сделать использолвание телепорта условным, в дальнейшем избавляем себя от мучений, например, при использоании флоатера в таблице
        -->
    <Component
      :is="componentTag"
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
    </Component>
  </div>
</template>

<style lang="scss">
.floater {
  $this: &;

  z-index: 10;
  width: fit-content;

  &__slot {
    &-trigger {
      display: inline-block;
    }
  }
}
</style>
