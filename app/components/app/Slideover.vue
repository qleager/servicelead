<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import type { IconProps } from './Icon.vue'

interface Props {
  description?: string
  icon?: IconProps['name']
  title?: string
}

interface Emits {
  'after:enter': []
  'after:leave': []
  'close': []
}

interface Slots {
  content?: (props: { close: () => void }) => VNodeChild
  default?: (props: { isOpen: Model }) => VNodeChild
  footer?: (props: { close: () => void }) => VNodeChild
}

type Model = boolean

defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

defineSlots<Slots>()

const toggle = () => {
  model.value = !model.value
}

const close = () => {
  model.value = false
  emits('close')
}

export type { Props as SlideoverProps, Emits as SlideoverEmits, Model as SlideoverModel, Slots as SlideoverSlots }
</script>

<template>
  <div
    class="slideover"
  >
    <div
      v-if="$slots.default"
      class="slideover__triggetr"
      @click="toggle"
    >
      <slot :is-open="model" />
    </div>

    <AppOverlay
      :backdrod="model"
      @click:backdrop="close"
    >
      <Transition name="slideover__transition">
        <AppCard
          v-if="model"
          class="slideover__card"
        >
          <template #title>
            <div class="slideover__card-header">
              <AppTitle
                :icon
                :title
              />
              <AppButton
                class="slideover__close"
                color="neutral"
                icon="close"
                size="sm"
                variant="nofilled"
                @click="close"
              />
            </div>
          </template>

          <template #description>
            <div class="slideover__card-description">
              {{ description }}
            </div>
          </template>

          <template #content>
            <div class="slideover__card-content">
              <slot
                :close
                name="content"
              />
            </div>
          </template>

          <template #footer>
            <div class="slideover__card-footer">
              <slot
                :close
                name="footer"
              />
            </div>
          </template>
        </AppCard>
      </Transition>
    </AppOverlay>
  </div>
</template>

<style lang="scss">
.slideover {
  &__card {
    position: fixed;
    top: 0;
    right: 0;

    width: 448px;
    height: 100dvh;
    border-radius: unset;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-content {
      overflow: auto;
      flex: 1;
    }
  }

  &__transition {
    &-enter {
      &-from {
        visibility: hidden;
      }

      &-to {
        animation: slideInRight $show-duration-lg ease-out forwards;
      }
    }

    &-leave {
      &-to {
        animation: slideOutRight $hide-duration-lg ease-in forwards;
      }
    }
  }
}
</style>
