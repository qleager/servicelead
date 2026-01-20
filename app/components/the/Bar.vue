<script lang="ts" setup>
</script>

<template>
  <div class="bar">
    <div class="bar__aggregate" />
    <div class="bar__item">
      <svg
        class="bar__item-corner bar__item-corner-left"
        viewBox="0 0 32 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          fill="currentColor"
        />
      </svg>
      <SearchButton color="white" />
      <svg
        class="bar__item-corner bar__item-corner-right"
        viewBox="0 0 32 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="bar__aggregate" />
    <div class="bar__item">
      <svg
        class="bar__item-corner bar__item-corner-left"
        viewBox="0 0 32 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          fill="currentColor"
        />
      </svg>
      <NavigationActions />
      <svg
        class="bar__item-corner bar__item-corner-right"
        viewBox="0 0 32 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="bar__aggregate" />
    <div class="bar__item">
      <svg
        class="bar__item-corner bar__item-corner-left"
        viewBox="0 0 32 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          fill="currentColor"
        />
      </svg>
      <TicketsButton color="white" />
      <svg
        class="bar__item-corner bar__item-corner-right"
        viewBox="0 0 32 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 18.9941H0C10.2799 18.9941 19.2661 13.4544 24.1357 5.19727C25.8334 2.31864 28.6818 0.109057 32 0V18.9941Z"
          fill="currentColor"
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
    width: 20px;
  }
}

.bar {
  $this: &;

  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;

  padding-bottom: $space-4;

  filter: drop-shadow(0 0 35px #1c265a1a); // TODO: add to design system

  &::before {
    content: "";

    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    height: 12px;

    background: #fff;
  }

  &__aggregate {
    position: relative;
    animation: aggregate-shrink 1s 0s forwards;

    &::before {
      content: "";

      position: absolute;
      right: $space-2;
      bottom: -$space-1;
      left: $space-2;

      height: 19px;

      background: #fff;
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
      bottom: -$space-1;

      width: 32px;
      height: 19px;

      color: #fff;

      &-left {
        right: -$space-2;
      }

      &-right {
        left: -$space-2;
        transform: scaleX(-1);
      }
    }
  }
}
</style>
