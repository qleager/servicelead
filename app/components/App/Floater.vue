<script lang="ts" setup>
/* TODO:
 * Это такой компонент, с помощью которого мы задаем абсолютное положение какого-либо элемента на старнице
 * Будем его использовать, например, для дропдауна селекта, всплываюей подсказки
 * За основу берем: Floating UI
 * Делаем прям по туториалу(https://floating-ui.com/docs/tutorial) но использем vue composition api(https://floating-ui.com/docs/vue)
 * Используем: offset, flip, shift, size,
 */

interface Props {
  mode?: 'click' | 'hover' // def click
  // если click, закрытие при клике по reference и в не области флоатера
  // если hover, закрытие при клике по reference, и потери ховера у reference и floating (так же см пукнкт B)
  placement?: Placement // из плагина; def auto
  dismissible?: boolean // true = запретить закрытие по клику вне floating и потери ховера, при клике на reference по прежнему закрытие // def true
  width?: string // 56px/100%; def auto
  portal?: string | HTMLElement // телепорт floating по строке типа ".body" или html элемента
}

// Floating: показан/скрыт
const model = defineModel<boolean>({ default: false })

const classname = computed(() => ([
  'floater',
]))

// Этот кусок с leadsale исключительно как пример, он не сильно релеванетен в нашем случае
const { floatingStyles } = useFloating(reference, floating, {
  placement: props.placement,
  middleware: [
    offset(8),
    flip(),
    shift({
      padding: 8,
    }),
    size({
      padding: 8,
      apply({ availableWidth, availableHeight, elements, placement, ...state }) {
        Object.assign(elements.floating.style, {
          maxWidth: `${props.correlateFloater ? state.rects.reference.width : availableWidth}px`,
          // TODO: 144 это хедер, потом надо сделать как то его подсчет
          maxHeight: `${placement.includes('top') ? availableHeight - 144 : availableHeight}px`,
          width: props.correlateFloater ? '100%' : 'auto',
        })
      },
    }),
  ],
  whileElementsMounted: autoUpdate,
})

// B: Будет кейс когда из-за расстояния между reference и floating будет сниматься hover из-за которого floating будет закрытваться –
// это поможет предотвратить это
const onMouseLeave = () => {
  // закроем через 100ms
  closeTimeout = setTimeout(() => {
    model.value = false
  }, 100)
}
const onMouseEnter = () => {
  model.value = true
  // отменим закрытие через 100ms
  clearTimeout(closeTimeout)
}

export type { Props as FloaterProps }
</script>

<template>
  <div :class="classname">
    <div
      ref="reference"
      class="floater__slot floater__slot-default floater__slot-trigger"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot />
    </div>
    <div
      ref="floating"
      class="floater__slot floater__slot-content"
      :style="floatingStyles"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss">
.floater {
  $this: &;
}
</style>
