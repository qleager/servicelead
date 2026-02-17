<!-- TIPS:
      Если настанет время, когда потребуется ограничить область всплывающей хуйни каким то контейнером,
      стоит обратить внимание на boundary
-->
<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { TeleportProps, VNodeChild } from 'vue'
import { onClickOutside } from '@vueuse/core'
import {
  useFloating,
  offset,
  autoPlacement,
  size,
  shift,
  // autoUpdate,
} from '@floating-ui/vue'

interface Props {
  /**
   * When `false`, the Floater will not close when clicking outside or pressing escape.
   *
   * @defaultvalue `true`
   */
  dismissible?: boolean
  mode?: 'click' | 'hover'
  placement?: Placement
  portal?: TeleportProps['to']
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
}

type Model = boolean

interface Slots {
  content: (props: { isOpen: Model }) => VNodeChild
  default?: (props: { isOpen: Model }) => VNodeChild
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
  dismissible: true,
  width: 'auto',
})

defineSlots<Slots>()

const model = defineModel<Model>({ default: false })

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

let closeTimeout: ReturnType<typeof setTimeout> | undefined = undefined

//                                                        .split for cases like bottom-start
const transitionPlacement = computed(() => placement.value.split('-')[0])

const { floatingStyles, placement } = useFloating(reference, floating, {
  placement: props.placement,
  transform: false,
  // whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    ...(props.placement ? [] : [autoPlacement()]),
    shift({ padding: 14 }),
    size({
      padding: 8,
      apply({ elements, availableHeight }) {
        Object.assign(elements.floating.style, {
          ...floatingWidth.value,
          maxHeight: `${availableHeight}px`,
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

export type { Props as FloaterProps, Slots as FloaterSlots, Model as FloaterModel }
</script>

<template>
  <div :class="classname">
    <div
      ref="reference"
      class="floater__trigger"
      @click="onClickReference"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot :is-open="model" />
    </div>
    <Teleport
      :disabled="!portal"
      :to="portal"
    >
      <Transition :name="`floater__transition-content--${transitionPlacement}`">
        <div
          v-if="model"
          ref="floating"
          class="floater__content"
          :style="floatingStyles"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <slot
            :is-open="model"
            name="content"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use 'sass:map';

.floater {
  $this: &;

  width: fit-content;

  &__trigger {
    display: inline-block;
  }

  &__transition {
    &-content {
      $placements: (
        bottom: (enter: 'fadeInUpGentle', leave: 'fadeOutUpGentle'),
        top: (enter: 'fadeInDownGentle', leave: 'fadeOutDownGentle'),
        left: (enter: 'fadeInLeftGentle', leave: 'fadeOutLeftGentle'),
        right: (enter: 'fadeInRightGentle', leave: 'fadeOutRightGentle'),
      );

      @each $placement, $anims in $placements {
        &--#{$placement} {
          &-enter-active {
            opacity: 0;
            animation: map.get($anims, enter) $show-duration-sm ease-out forwards
          }

          &-leave-active {
            animation: map.get($anims, leave) $hide-duration-sm ease-out forwards
          }
        }
      }
    }
  }
}
</style>
