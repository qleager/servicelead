<script lang="ts" setup>
interface Props {
  title?: string
  description?: string
  overlay?: boolean
}

interface Emits {
  close: []
}

type Model = boolean

const slots = useSlots()

const prop = withDefaults(defineProps<Props>(), {
  overlay: true,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const classname = computed(() => ([
  'modal',
]))

const isTitleVisible = computed(() => slots.title || prop.title)
const isDescriptionVisible = computed(() => slots.description || prop.description)
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
    class="modal__slot modal__trigger"
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
    <div :class="classname">
      <AppButton
        class="modal__close"
        icon="close"
        color="white"
        size="sm"
        @click="close"
      />
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

          <div class="modal__slot modal__slot-title">
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

          <div class="modal__slot modal__slot-description">
            <slot name="description" />
          </div>
        </div>
      </header>

      <div
        v-if="$slots.content"
        class="modal__slot modal__main"
      >
        <slot
          name="content"
          :close
        />
      </div>

      <footer
        v-if="$slots.footer"
        class="modal__slot modal__footer"
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
  position: relative;

  display: flex;
  flex-direction: column;
  gap: $space-8;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 560px;
  padding: $space-10 $space-16 $space-8;
  border-radius: $radius-6;

  background-color: white;

  &__overlay {
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
  }
}
</style>
