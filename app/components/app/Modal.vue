<script lang="ts" setup>
import type { TeleportProps } from 'vue'

// AppButton
// 1) Кнопка закрыть модалку, нету варианта цвета фона и иконки из макета. Покрасил иконку пока через color !important, цвет поставил белый
interface Props {
  title?: string
  description?: string
  overlay?: boolean
  portal?: TeleportProps['to']
}

interface Emits {
  close: []
}

type Model = boolean

withDefaults(defineProps<Props>(), {
  overlay: true,
  portal: 'body',
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const classname = computed(() => ([
  'modal',
]))

const toggle = () => {
  model.value = !model.value
}

const close = () => {
  model.value = false
  emits('close')
}

export type { Props as ModalProps, Emits as ModalEmits, Model as ModalModel }
</script>

<template>
  <div
    v-if="$slots.default"
    class="modal__trigger"
    @click="toggle"
  >
    <slot />
  </div>

  <AppOverlay
    v-model="model"
    :transparent="!overlay"
    :portal="portal"
    @click:backdrop="close"
  >
    <div :class="classname">
      <AppButton
        class="modal__close"
        icon="close"
        color="white"
        size="sm"
        @click="close"
      />
      <header class="modal__header">
        <div
          v-if="$slots.title || title"
          class="modal__header-title"
        >
          <div
            v-if="!$slots.title"
            class="modal__title"
          >
            {{ title }}
          </div>

          <div class="modal__slot modal__slot-title">
            <slot name="title" />
          </div>
        </div>

        <div
          v-if="$slots.description || description"
          class="modal__header-description"
        >
          <div
            v-if="!$slots.description"
            class="modal__description"
          >
            {{ description }}
          </div>

          <div class="modal__slot modal__slot-description">
            <slot name="description" />
          </div>
        </div>
      </header>

      <div
        v-if="$slots.content"
        class="modal__main"
      >
        <slot
          name="content"
          :close
        />
      </div>

      <footer
        v-if="$slots.footer"
        class="modal__footer"
      >
        <slot
          name="footer"
          :close
        />
      </footer>
    </div>
  </AppOverlay>
</template>

<style lang="scss">
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: $space-8;
  align-items: center;
  justify-content: center;

  max-width: 560px;
  padding: $space-10 $space-16 $space-8;
  border-radius: $radius-6;

  background-color: white;

  &__header {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    align-items: center;
  }

  &__title {
    @include text(semibold, xl);

    text-align: center;
  }

  &__description {
    @include text(regular, md);

    color: $color-neutral-500;
    text-align: center;
  }

  &__close {
    cursor: pointer;

    position: absolute;
    top: 0;
    right: -$space-16;

    color: $color-neutral-400 !important;

    outline: 1px dashed $color-primary;
  }
}
</style>
