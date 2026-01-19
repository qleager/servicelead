<script lang="ts" setup>
const bgColor = ref('#fff')

const cssVars = computed(() => ({
  '--bg-color': bgColor.value,
}))
</script>

<template>
  <div
    class="bar"
    :style="cssVars"
  >
    <div class="bar__aggregate" />
    <div class="bar__item">
      <svg
        class="bar__item-corner bar__item-corner_left"
        viewBox="0 0 32 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          :fill="bgColor"
        />
      </svg>
      <SearchButton color="white" />
      <svg
        class="bar__item-corner bar__item-corner_right"
        viewBox="0 0 32 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          :fill="bgColor"
        />
      </svg>
    </div>
    <div class="bar__aggregate" />
    <div class="bar__item">
      <svg
        class="bar__item-corner bar__item-corner_left"
        viewBox="0 0 32 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          :fill="bgColor"
        />
      </svg>
      <NavigationActions />
      <svg
        class="bar__item-corner bar__item-corner_right"
        viewBox="0 0 32 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          :fill="bgColor"
        />
      </svg>
    </div>
    <div class="bar__aggregate" />
    <div class="bar__item">
      <svg
        class="bar__item-corner bar__item-corner_left"
        viewBox="0 0 32 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          :fill="bgColor"
        />
      </svg>
      <TicketsButton color="white" />
      <svg
        class="bar__item-corner bar__item-corner_right"
        viewBox="0 0 32 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          :fill="bgColor"
        />
      </svg>
    </div>
    <div class="bar__aggregate" />
  </div>
</template>

<style lang="scss">
@keyframes aggregate-shrink {
  from {
    width: 700px;
  }

  to {
    width: $space-5;
  }
}

.bar {
  $this: &;

  position: relative;
  overflow: hidden;
  display: flex;
  padding-bottom: 18px;

  &::before {
    content: "";

    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    height: 14px;

    background: var(--bg-color);
  }

  &__aggregate {
    position: relative;
    animation: aggregate-shrink 1s 0s forwards;

    &::before {
      content: "";

      position: absolute;
      top: 33px;
      right: 8px;
      left: 8px;

      height: 19px;

      background: var(--bg-color);
    }

    &:first-child, &:last-child {
      flex-grow: 1;
      width: auto;
      animation: none;
    }

    &:first-child::before {
      left: 0;
      border-top-left-radius: $radius-2;
    }

    &:last-child::before {
      right: 0;
      border-top-right-radius: $radius-2;
    }
  }

  &__item {
    position: relative;

    &-corner {
      pointer-events: none;

      position: absolute;
      bottom: -4px;

      width: 32px;
      height: 19px;

      &_left {
        right: -8px;
      }

      &_right {
        left: -8px;
        transform: scaleX(-1);
      }
    }
  }
}
</style>
