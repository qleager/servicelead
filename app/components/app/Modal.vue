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
  title?: () => unknown
  description?: () => unknown
  content?: (props: { close?: () => void }) => unknown
  footer?: (props: { close?: () => void }) => unknown
}

type Model = boolean

const slots = defineSlots<Slots>()

const props = withDefaults(defineProps<Props>(), {
  overlay: true,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const isTitleVisible = computed(() => slots.title || props.title)
const isDescriptionVisible = computed(() => slots.description || props.description)
const isHeaderVisible = computed(() => isTitleVisible.value || isDescriptionVisible.value)

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
      <div class="modal__content">
        <header
          v-if="isHeaderVisible"
          class="modal__header"
        >
          <div
            v-if="isTitleVisible"
            class="modal__header-title"
          >
            <div
              v-if="!$slots.title"
              class="modal__title"
            >
              {{ title }}
            </div>

            <div
              v-else
              class="modal__slot modal__slot-title"
            >
              <slot name="title" />
            </div>
          </div>

          <div
            v-if="isDescriptionVisible"
            class="modal__header-description"
          >
            <div
              v-if="!$slots.description"
              class="modal__description"
            >
              {{ description }}
            </div>

            <div
              v-else
              class="modal__slot modal__slot-description"
            >
              <slot name="description" />
            </div>
          </div>
        </header>

        <div class="modal__main">
          <!-- IDEA: сделать компонент слота? мы везде используем такую конструкцию -->
          <div
            v-if="$slots.content"
            class="modal__slot modal__slot-content"
          >
            <slot
              name="content"
              :close
            />
          </div>
        </div>

        <footer
          v-if="$slots.footer"
          class="modal__footer"
        >
          <div class="modal__slot modal__slot-footer">
            <slot
              name="footer"
              :close
            />
          </div>
        </footer>
      </div>
      <AppButton
        class="modal__close"
        icon="close"
        color="white"
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

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-8;
    align-items: center;
    justify-content: center;
  }

  &__overlay {
    z-index: 10;

    overflow: auto;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;

    padding: $space-8 0;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    align-items: center;

    padding: $space-10 $space-16 0;

    &:last-child {
      padding-bottom: $space-8;
    }
  }

  &__main {
    padding-inline: $space-16;

    &:first-child {
      padding-top: $space-10;
    }

    &:last-child {
      padding-bottom: $space-8;
    }
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

  &__footer {
    padding: 0 $space-16 $space-8;

    &:first-child {
      padding-top: $space-10;
    }
  }
}
</style>
