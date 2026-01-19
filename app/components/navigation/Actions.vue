<script lang="ts" setup>
import type { FloaterProps } from '../app/Floater.vue'

interface Props {
  // todo-1: сделать необязательным
  placement: FloaterProps['placement']
}

defineProps<Props>()

// todo-2: думаю можно сократить нахвание убрав из него Floater
const isFloaterContentVisible = ref<boolean>(false)

const items = [
  {
    label: 'Создать лид',
    onClick: () => { console.log('open lead') },
  },
  {
    label: 'Создать поток',
    onClick: () => { console.log('open thread') },
  },
  {
    label: 'Создать лендинг',
    onClick: () => { console.log('open landing') },
  },
  {
    label: 'Создать форму',
    onClick: () => { console.log('open form') },
  },
  {
    label: 'Пройти обучение',
    onClick: () => { console.log('open training') },
  },
]

const buttonIcon = computed(() => isFloaterContentVisible.value ? 'close' : 'plus')
const buttonColor = computed(() => isFloaterContentVisible.value ? 'neutral' : 'primary')
</script>

<template>
  <AppFloater
    :placement
  >
    <AppButton
      :icon="buttonIcon"
      :color="buttonColor"
      @click="isFloaterContentVisible = !isFloaterContentVisible"
    />
    <template #content>
      <div class="navigation-actions">
        <!-- todo-3: перенименуем класс в __list -->
        <div class="navigation-actions__items">
          <!-- todo-4: перенименуем класс в __list-item, и так же для его детей -->
          <div
            v-for="item in items"
            :key="item.label"
            class="navigation-actions__item"
            @click="item.onClick"
          >
            <div>
              {{ item.label }}
            </div>
            <div
              class="navigation-actions__item-icon"
            >
              <AppIcon
                name="plus"
                :size="16"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppFloater>
</template>

<style lang="scss">
.navigation-actions {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-6;
  align-items: center;

  &__items {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__item {
    cursor: pointer;
    user-select: none;

    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: space-between;

    width: 275px;
    padding: $space-2 $space-2 $space-2 $space-4;
    // todo-7: взять из ds radius
    border-radius: 40px;

    background: $color-neutral-50;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 32px;
      height: 32px;
      border-radius: 50%;

      color: white;

      // TODO-6: просто color-neutral -- 500 цвет - это дефолт цвет палитры
      background: $color-primary-500;
    }
  }

  // todo-5: нет элементов с этим классом
  &__close {
    cursor: pointer;

    display: none;

    // display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border-radius: 50%;

    color: $color-neutral-400;

    background: $color-neutral-50;
  }
}
</style>
