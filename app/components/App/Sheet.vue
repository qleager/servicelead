<script lang="ts" setup>
import type { IconProps } from './Icon.vue'

interface Props {
  title?: string
  icon?: IconProps['name']
  overlay?: boolean
}

interface Emits {
  'after:enter': []
  'after:leave': []
  'close': []
}

type Model = boolean

withDefaults(defineProps<Props>(), {
  overlay: true,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const close = () => {
  model.value = false
  emits('close')
}

export type { Props as SheetProps, Emits as SheetEmits, Model as SheetModel }
</script>

<template>
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
            <AppIcon
              v-if="icon"
              class="sheet__title-image"
              :name="icon"
            />
            <div class="sheet__title-text">
              {{ title }}
            </div>
          </div>
          <div
            class="sheet__close"
            @click="close()"
          >
            <AppIcon
              class="sheet__close-image"
              name="close"
            />
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

  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: $space-2;

  width: 100%;
  max-height: 90dvh;
  margin-top: auto;
  padding: $space-6;
  border-radius: $space-6 $space-6 0 0;

  background: white;
  box-shadow: $shadow-light-mode;

  &__header {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: space-between;

    padding: $space-2;
  }

  &__title {
    display: flex;
    gap: $space-2;
    align-items: center;
    font-weight: 500;

    &-text {
      :empty {
        display: none;
      }
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
