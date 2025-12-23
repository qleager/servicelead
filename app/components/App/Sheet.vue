<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  title?: string
  icon?: IconProps['name']
  defaultOpen?: boolean
  overlay?: boolean // def: true
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
  <!-- Trigger -->
  <div @click="model = !model">
    <slot />
  </div>

  <AppOverlay
    v-model="model"
    :transparent="!overlay"
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
          <div class="sheet__slot sheet__slot-content">
            <slot
              :close
              name="content"
            />
          </div>
        </div>
        <footer class="sheet__footer">
          .sheet__slot.sheet__slot-footer
          <slot
            name="footer"
            :close
          />
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
