<script lang="ts" setup>
interface Props {
  isDesktop: boolean
}

interface Emits {
  close: []
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

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

const classname = computed(() => [
  'navigation-actions',
  { 'navigation-actions-mobile': !props.isDesktop },
])
</script>

<template>
  <div :class="classname">
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
    <div
      class="navigation-actions__close"
      @click="emits('close')"
    >
      <AppIcon
        name="close"
        :size="16"
      />
    </div>
    <div />
  </div>
</template>

<style lang="scss">
.navigation-actions {
  $this: &;
  $navigation-actions-mobile: $this + '-mobile';

  display: flex;
  flex-direction: column;
  gap: $space-6;
  align-items: center;

  &#{$navigation-actions-mobile} {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    max-width: 100vw;
  }

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
    display: none;

    #{$navigation-actions-mobile} & {
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 40px;
      height: 40px;
      border-radius: 50%;

      color: $color-neutral-light-400;

      background: $color-neutral-light-50;
    }
  }
}
</style>
