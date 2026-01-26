<script lang="ts" setup>
import type { FloaterProps } from '../app/Floater.vue'

interface Props {
  placement?: FloaterProps['placement']
}

defineProps<Props>()

const isContentVisible = ref<boolean>(false)

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

const buttonIcon = computed(() => isContentVisible.value ? 'close' : 'plus')
const buttonColor = computed(() => isContentVisible.value ? 'neutral' : 'primary')
</script>

<template>
  <AppFloater
    :placement
  >
    <AppButton
      :icon="buttonIcon"
      :color="buttonColor"
      @click="isContentVisible = !isContentVisible"
    />
    <template #content>
      <div class="navigation-actions">
        <div class="navigation-actions__list">
          <div
            v-for="item in items"
            :key="item.label"
            class="navigation-actions__list-item"
            @click="item.onClick"
          >
            <div>
              {{ item.label }}
            </div>
            <div
              class="navigation-actions__list-item-icon"
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

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-1;

    &-item {
      cursor: pointer;
      user-select: none;

      display: flex;
      gap: $space-4;
      align-items: center;
      justify-content: space-between;

      width: 275px;
      padding: $space-2 $space-2 $space-2 $space-4;
      border-radius: $radius-10;

      background: $color-neutral-50;

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 32px;
        height: 32px;
        border-radius: 50%;

        color: white;

        background: $color-primary;
      }
    }
  }
}
</style>
