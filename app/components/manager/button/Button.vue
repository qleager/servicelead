<script lang="ts" setup>
import AppFloater from '~/components/app/Floater.vue'
import AppSheet from '~/components/app/Sheet.vue'

interface Props {
  mode?: 'dropdown' | 'sheet'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dropdown',
})

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return AppFloater
    case 'sheet':
      return AppSheet
    default:
      return 'div'
  }
})

export type { Props as ManagerButtonProps }
</script>

<template>
  <Component
    :is="rootElement"
    class="manager-button"
  >
    <div class="manager-button__trigger">
      <NuxtImg
        :src="'/images/default-avatar.png'"
        class="manager-button__avatar"
      />
      <span class="manager-button__info">
        <span class="manager-button__name">Иванов Иван</span>
        <span class="manager-button__role">Ваш менеджер</span>
      </span>
    </div>
    <template #content>
      <ManagerButtonContent :mode />
    </template>
  </Component>
</template>

<style lang="scss">
.manager-button {
  $this: &;

  &__trigger {
    cursor: pointer;

    display: flex;
    gap: $space-4;
    align-items: center;

    height: 56px;
    padding: $space-1 $space-6 $space-1 $space-1;
    border-radius: $space-12;

    &:hover {
      background: #fff;
    }

    &:active {
      background: $color-neutral-100;
    }

    &:disabled {
      pointer-events: none;
      cursor: default;
    }
  }

  &__avatar {
    overflow: hidden;

    width: 48px;
    height: 48px;
    border-radius: $space-18;

    object-fit: cover;

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-05;
    align-items: flex-start;
    justify-content: center;

    height: 42px;

    color: $color-neutral-950;
  }

  &__name {
    @include text(SemiBold, md);
  }

  &__role {
    @include text(light, xs);
  }
}
</style>
