<!--
 TODO:
  Привести к консистентности c AppModal
  У AppSlideover должна появиться такая же логика работы header: слот-title, слот-description
  В итоге должно получиться, что если мы изменим название компонента AppModal на AppSlideover, то весь контент компонента будет корректно отображен = будет консистентен

  2. снять паддинги с .slideover и добавить их header/main/footer
      у header/main/footer должны быть block-padding
      убедиться, что когда нет header или footer отступы снизу(32) и сверху(40) есть
        если, отступы между блоками не совпадают из-за этого, можно поработать с обратныйм маргином подбить у header/footer

  3. убравть стили с slideover__slot-footer, я так понял сделано для кнопок - мы стилизуем контент в слотах в родителе
-->
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
      <!-- IDEA: AppCard с переопредленными стилями здесь? -->
      <div class="slideover">
        <header class="slideover__header">
          <div class="slideover__title">
            <AppIcon
              v-if="icon"
              class="slideover__title-image"
              :name="icon"
            />
            <div class="slideover__title-text">
              {{ title }}
            </div>
          </div>
          <AppButton
            class="slideover__close"
            icon="close"
            size="sm"
            color="neutral"
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

    @include text(semibold, sm);

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
