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

const { lock, unlock } = useDocumentScrollLock()

defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: true })

defineSlots<Slots>()

const toggle = () => {
  model.value = !model.value
}

const close = () => {
  model.value = false
  emits('close')
}

watch(model, value => value ? lock() : unlock())

export type { Props as SheetProps, Emits as SheetEmits, Model as SheetModel, Slots as SheetSlots }
</script>

<template>
  <div
    class="sheet"
  >
    <div
      v-if="$slots.default"
      class="sheet__trigger"
      @click="toggle"
    >
      <slot :is-open="model" />
    </div>

    <AppOverlay
      :backdrod="model"
      @click:backdrop="close"
    >
      <Transition name="sheet__transition">
        <AppCard
          v-if="model"
          class="sheet__card"
        >
          <template #title>
            <div class="sheet__card-header">
              <AppTitle
                :icon
                :title
              />
              <AppButton
                class="sheet__close"
                color="neutral"
                icon="close"
                size="sm"
                variant="nofilled"
                @click="close"
              />
            </div>
          </template>

          <template
            v-if="description"
            #description
          >
            <div class="sheet__card-description">
              {{ description }}
            </div>
          </template>

          <template
            v-if="$slots.content"
            #content
          >
            <div class="sheet__card-content">
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
            <div class="sheet__card-footer">
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
.sheet {
  &__card {
    position: fixed;
    right: 0;
    bottom: 0;

    width: 100dvw;
    max-height: calc(100dvh - $space-12);
    border-radius: unset;
    border-top-left-radius: $radius-6;
    border-top-right-radius: $radius-6;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-content {
      flex: 1;
    }
  }

  &__transition {
    &-enter {
      &-from {
        visibility: hidden;
      }

      &-to {
        animation: slideInUp $show-duration-lg ease-out forwards;
      }
    }

    &-leave {
      &-to {
        animation: slideOutDown $hide-duration-lg ease-in forwards;
      }
    }
  }
}
</style>
