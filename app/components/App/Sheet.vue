<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  title?: string
  icon?: IconProps['name']
  defaultOpen?: boolean
}

interface Emits {
  'after:enter': []
  'after:leave': []
  'close': []
}

type Model = boolean

defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const close = () => {
  model.value = false
  emits('close')
}

export type { Props as SheetProps, Emits as SheetEmits, Model as SheetModel }
</script>

<template>
  <AppOverlay
    v-model="model"
    @click:backdrop="close()"
  >
    <!-- TODO: добавить анимацию (после систематизации анимаций) -->
    <Transition
      name="sheet"
      appear
      @after-enter="emits('after:enter')"
      @after-leave="emits('after:leave')"
    >
      <div
        v-if="model"
        class="sheet"
      >
        <header class="sheet__header">
          <div class="sheet__title">
            {{ title }}
          </div>
        </header>
        <div class="sheet__main">
          .sheet__slot.sheet__slot-default
          <slot :close />
        </div>
        <footer class="sheet__footer">
          .sheet__slot.sheet__slot-footer
          <slot name="footer" :close />
        </footer>
      </div>
    </Transition>
  </AppOverlay>
</template>

<style lang="scss">
.sheet {
  $this: &;
}
</style>
