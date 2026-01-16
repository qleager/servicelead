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

defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: false })

const close = () => {
  model.value = false
  emits('close')
}

export type { Props as SlideoverProps, Emits as SlideoverEmits, Model as SlideoverModel }
</script>

<template>
  <AppOverlay
    v-model="model"
    :transparent="!overlay"
  >
    <!-- TODO: добавить анимацию (после систематизации анимаций) -->
    <Transition
      appear
      @after-enter="emits('after:enter')"
      @after-leave="emits('after:leave')"
    >
      <div class="slideover">
        <header class="slideover__header">
          <div class="slideover__title">
            <AppIcon
              v-if="icon"
              class="slideover__title-image"
              :name="icon!"
            />
            <div class="slideover__title-text">
              {{ title }}
            </div>
          </div>
          <AppButton
            class="slideover__close"
            icon="close"
            size="sm"
            color="lighter"
            variant="nofilled"
            @click="close()"
          />
        </header>
        <div class="slideover__main">
          <div class="slideover__slot slideover__slot-default">
            <slot :close />
          </div>
        </div>
        <footer class="slideover__footer">
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
  padding: $space-8 $space-4;

  background: white;
  box-shadow: $shadow-md;

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
    font-weight: 600;

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

  &__main {
    overflow: auto;
  }

  &__slot {
    &-footer {
      display: flex;
      gap: $space-6;
      justify-content: flex-end;

      width: 100%;
      margin-top: auto;
    }
  }
}
</style>
