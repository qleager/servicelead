<script lang="ts" setup>
interface Props {
  title?: string
  description?: string
  overlay?: boolean
}

interface Emits {
  close: []
}

interface Slots {
  default?: () => unknown
  header?: () => unknown
  title?: () => unknown
  subtitle?: () => unknown
  content?: (props: { close?: () => void }) => unknown
  footer?: (props: { close?: () => void }) => unknown
}

type Model = boolean

defineSlots<Slots>()

withDefaults(defineProps<Props>(), {
  overlay: true,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

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
    class="modal__slot modal__slot-default"
    @click="toggle"
  >
    <slot />
  </div>

  <AppOverlay
    v-model="model"
    class="modal__overlay"
    :transparent="!overlay"
    @click:backdrop="close"
  >
    <div class="modal">
      <AppCard class="modal__content">
        <template
          v-if="$slots.header"
          #header
        >
          <slot name="header" />
        </template>
        <template
          v-else-if="title || description"
          #header
        >
          <header class="modal__header">
            <div
              v-if="title"
              class="modal__title"
            >
              {{ title }}
            </div>
            <div v-else>
              else title
            </div>

            <div
              v-if="description"
              class="modal__description"
            >
              {{ description }}
            </div>
            <div v-else>
              else description
            </div>
          </header>
        </template>

        <template
          v-if="$slots.title"
          #title
        >
          <slot name="title" />
        </template>
        <template
          v-if="$slots.subtitle"
          #subtitle
        >
          <slot name="subtitle" />
        </template>

        <template
          v-if="$slots.content"
          #content
        >
          <div class="modal__main">
            <!-- IDEA: сделать компонент слота? мы везде используем такую конструкцию -->
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
          <footer class="modal__footer">
            <slot
              :close
              name="footer"
            />
          </footer>
        </template>
      </AppCard>
      <AppButton
        class="modal__close"
        color="white"
        icon="close"
        size="sm"
        @click="close"
      />
    </div>
  </AppOverlay>
</template>

<style lang="scss">
.modal {
  position: relative;

  width: 100%;
  max-width: 560px;
  border-radius: $radius-6;

  background-color: white;

  &__overlay {
    z-index: 10;

    overflow: auto;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;

    padding: $space-8 0;
  }

  &__title {
    @include text(semibold, xl);

    text-align: center;
  }

  &__description {
    @include text(regular, md);

    color: $color-neutral;
    text-align: center;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: -$space-16;
  }
}
</style>
