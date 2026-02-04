<script lang="ts" setup>
import type { ButtonProps } from '../app/Button.vue'
import type { FloaterModel, FloaterProps } from '../app/Floater.vue'
import { useScrollLock } from '@vueuse/core'

interface Props {
  placement?: FloaterProps['placement']
}

defineProps<Props>()

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

const isLockedScrollDocument = useScrollLock(document)

const triggerProps = (isOpen: FloaterModel) => ({
  color: isOpen ? 'neutral' : 'primary',
  icon: isOpen ? 'close' : 'plus' as const,
}) as ButtonProps
</script>

<template>
  <div class="navigation-actions">
    <AppFloater
      :placement
      class="navigation-actions__floater"
      @update:model-value="isLockedScrollDocument = $event"
    >
      <template #default="{ isOpen }">
        <AppBackdrop v-if="isOpen" />
        <AppButton
          v-bind="triggerProps(isOpen)"
          class="navigation-actions__trigger"
        />
      </template>

      <template #content>
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
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.navigation-actions {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-6;
  align-items: center;

  &__floater {
    position: relative;
  }

  &__trigger {
    position: relative;
    z-index: inherit;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    padding-inline: $space-3;

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
