<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  title?: string
  icon?: IconProps['name']
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
          <slot name="content" />
        </div>
        <footer class="sheet__footer">
          <slot name="footer" />
        </footer>
      </div>
    </Transition>
  </AppOverlay>
</template>

<style lang="scss">
.sheet {
  $this: &;

  width: 100%;
  height: 500px;
  background-color: white;
}
</style>
