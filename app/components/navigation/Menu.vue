<script lang="ts" setup>
import type { IconProps } from '~/components/ui/Icon'

interface Props {
  items: Item[];
  title?: string;
  minimal?: boolean
}

interface Item {
  icon: IconProps['name'];
  label: string;
  to?: string;
  onClick: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="navigation-menu">
    <div v-if="title" class="navigation-menu__title">
      {{ title }}
    </div>
    <div class="navigation-menu__list">
      <AppButton
        v-for="item in items"
        :key="item.label"
        variant="nofilled"
        color="darker"
        :icon="item.icon"
        :to="item.to"
        x-on:click="item.onClick"
        class="navigation-menu__item"
      >
        {{ item.label }}
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.navigation-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    padding: 12px 0 12px 40px;

    font-size: 12px;
    font-weight: 600;
    color: #9AA0A6;
    text-transform: uppercase;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__item {
    justify-content: flex-start;
  }
}
</style>
