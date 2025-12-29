<script lang="ts" setup>
import type { FloaterProps } from '../App/Floater.vue'

interface Props {
  placement: FloaterProps['placement']
}

defineProps<Props>()

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
const buttonColor = computed(() => isFloaterContentVisible.value ? 'lighter' : 'primary')
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
        <div class="navigation-actions__items">
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
    border-radius: 40px;

    background: $color-neutral-light-50;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 32px;
      height: 32px;
      border-radius: 50%;

      color: white;

      background: $color-primary-500;
    }
  }

  &__close {
    cursor: pointer;

    display: none;

    // display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border-radius: 50%;

    color: $color-neutral-light-400;

    background: $color-neutral-light-50;
  }
}
</style>
