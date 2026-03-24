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

type Model = boolean

interface Slots {
  content?: (props: { close: () => void }) => VNodeChild
  default?: (props: { isOpen: Model }) => VNodeChild
  footer?: (props: { close: () => void }) => VNodeChild
}

defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

defineSlots<Slots>()

const isGridVisible = ref(model.value)

watch(model, (value) => {
  if (value) {
    isGridVisible.value = value
  }
})

const toggle = () => {
  model.value = !model.value
}

const close = () => {
  model.value = false
  emits('close')
}

export type { Props as ModalProps, Emits as ModalEmits, Model as ModalModel, Slots as ModalSlots }
</script>

<template>
  <div
    class="modal"
  >
    <div
      v-if="$slots.default"
      class="modal__trigger"
      @click="toggle"
    >
      <slot :is-open="model" />
    </div>

    <AppOverlay
      :backdrod="model"
      :lock-scroll="model"
      @click:backdrop="close"
    >
      <Transition
        appear
        name="modal__transition"
        @after-enter="emits('after:enter')"
        @after-leave="emits('after:leave')"
      >
        <div
          v-if="model"
          class="modal__grid"
          @click.self="close"
        >
          <AppCard
            class="modal__card"
          >
            <template #title>
              <div class="modal__card-header">
                <AppTitle
                  :icon
                  :title
                />
                <AppButton
                  class="modal__close"
                  color="neutral"
                  icon="close"
                  size="sm"
                  variant="link"
                  @click="close"
                />
              </div>
            </template>

            <template
              v-if="description"
              #description
            >
              <div class="modal__card-description">
                {{ description }}
              </div>
            </template>

            <template
              v-if="$slots.content"
              #content
            >
              <div class="modal__card-content">
                <slot
                  :close
                  name="content"
                />
              </div>
            </template>

            <template
              v-if="$slots.footer"
              #footer
            >
              <div class="modal__card-footer">
                <slot
                  :close
                  name="footer"
                />
              </div>
            </template>
          </AppCard>
        </div>
      </Transition>
    </AppOverlay>
  </div>
</template>

<style lang="scss">
.modal {
  &__grid {
    position: fixed;
    top: 0;
    left: 0;

    overflow: auto;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;

    width: 100dvw;
    height: 100dvh;
    padding-block: $space-30;
    padding-inline: $space-6;
  }

  &__card {
    min-width: 256px;
    max-width: 560px;
    margin-inline: auto;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__close {
    margin-left: auto;
  }

  &__transition {
    &-enter {
      &-from {
        visibility: hidden;
      }

      &-to {
        animation: zoomInGentle $show-duration-lg ease-out forwards;
      }
    }

    &-leave {
      &-to {
        animation: zoomOutGentle $hide-duration-lg ease-in forwards;
      }
    }
  }
}
</style>
