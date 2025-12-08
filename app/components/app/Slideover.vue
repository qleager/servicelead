<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  defaultOpen?: boolean
  title?: string
  icon?: IconProps['name']
}

interface Emits {
  'after:enter': []
  'after:leave': []
  'close': []
}

type Model = boolean

const model = defineModel<Model>({ default: false })

const close = () => 

export type {}
</script>

<template>
  <AppOverlay v-model="model">
    <!-- TODO: добавить анимацию (после систематизации анимаций) -->
    <Transition
      appear
      @after-enter
      @after-leave
    >
      <div class="slideover">
        <header class="slideover__header">
          <!-- icon / title / dissmiss -->
        </header>
        <div class="slideover__main">
          <div class="slideover__slot slideover__slot-default">
            <slot :close />
          </div>
        </div>
        <footer class="slideover__footer">
          <div class="slideover__slot slideover__slot-footer">
            <slot name="footer" :close />
          </div>
        </footer>
      </div>
    </Transition>
  </AppOverlay>
</template>

<style lang="scss"></style>
