<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  title?: string
  description?: string
  icon?: IconProps['name']
  overlay?: boolean
}

interface Emits {
  'after:enter': []
  'after:leave': []
  'close': []
}

interface Slots {
  default?: () => unknown
  title?: () => unknown
  description?: () => unknown
  content?: (props: { close?: () => void }) => unknown
  footer?: (props: { close?: () => void }) => unknown
}

type Model = boolean

const props = withDefaults(defineProps<Props>(), {
  overlay: true,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const slots = defineSlots<Slots>()

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

export type { Props as SlideoverProps, Emits as SlideoverEmits, Model as SlideoverModel }
</script>

<template>
  <div
    v-if="$slots.default"
    class="slideover__slot slideover__default"
    @click="toggle"
  >
    <slot />
  </div>
  <AppOverlay
    v-model="model"
    class="slideover__overlay"
    :transparent="!overlay"
    @click:backdrop="close"
  >
    <!-- TODO: добавить анимацию (после систематизации анимаций) -->
    <Transition
      appear
      @after-enter="emits('after:enter')"
      @after-leave="emits('after:leave')"
    >
      <!-- IDEA: AppCard с переопредленными стилями здесь? -->
      <div class="slideover">
        <header
          v-if="isHeaderVisible"
          class="slideover__header"
        >
          <div
            v-if="isTitleVisible"
            class="slideover__header-title"
          >
            <AppIcon
              v-if="icon"
              class="slideover__title-icon"
              :name="icon"
            />
            <div
              v-if="!$slots.title"
              class="slideover__title"
            >
              {{ title }}
            </div>
            <div
              v-else
              class="slideover__slot slideover__slot-title"
            >
              <slot name="title" />
            </div>
            <AppButton
              class="slideover__close"
              icon="close"
              size="sm"
              color="neutral"
              variant="nofilled"
              @click="close()"
            />
          </div>
          <div
            v-if="isDescriptionVisible"
            class="slideover__header-description"
          >
            <div
              v-if="!$slots.description"
              class="slideover__description"
            >
              {{ description }}
            </div>

            <div
              v-else
              class="slideover__slot slideover__slot-description"
            >
              <slot name="description" />
            </div>
          </div>
        </header>
        <div
          v-if="$slots.content"
          class="slideover__main"
        >
          <div class="slideover__slot slideover__slot-content">
            <slot
              name="content"
              :close
            />
          </div>
        </div>
        <footer
          v-if="$slots.footer"
          class="slideover__footer"
        >
          <div class="slideover__slot slideover__slot-footer">
            <slot
              name="footer"
              :close
            />
          </div>
        </footer>
      </div>
    </Transition>
  </AppOverlay>
</template>

<style lang="scss">
.slideover {
  $this: &;

  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: $space-8;

  width: auto;
  min-width: 320px;
  max-width: 100vw;
  height: 100dvh;
  padding-inline: $space-6;

  background: white;
  box-shadow: $shadow-md;

  &__header {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    padding-top: $space-8;

    &-title {
      display: flex;
      gap: $space-2;
      align-items: center;
    }

    &:last-child {
      padding-bottom: $space-8;
    }
  }

  &__title {
    @include text(semibold, sm);
  }

  &__description {
    @include text(regular, sm);

    color: $color-neutral;
  }

  &__main {
    overflow: auto;

    &:first-child {
      padding-top: $space-10;
    }

    &:last-child {
      padding-bottom: $space-8;
    }
  }

  &__footer {
    margin-top: auto;
    padding-bottom: $space-8;

    &:first-child {
      padding-top: $space-10;
    }
  }

  &__close {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}
</style>
