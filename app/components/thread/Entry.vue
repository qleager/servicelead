<script setup lang="ts">
</script>

<template>
  <div
    class="thread-entry"
    @click="navigateTo('/thread/1')"
  >
    <AppButton
      class="thread-entry__arrow"
      color="neutral"
      icon="arrow_right"
      size="xs"
      variant="lined"
    />
    <div class="thread-entry__corner">
      <svg
        fill="none"
        height="61"
        viewBox="0 0 60 61"
        width="60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 61C60 52.1634 52.8366 44.8682 44 44.8682H37.1348C25.5369 44.8682 16.135 35.466 16.1348 23.8682V16C16.1348 7.16344 8.83656 0 0 0H60V61Z"
          fill="currentcolor"
        />
      </svg>
    </div>
    <div class="thread-entry__info">
      <div class="thread-entry__info-title">
        Название потока
      </div>
      <AppTag
        color="neutral"
        size="sm"
      >
        Лендинги
      </AppTag>
    </div>
    <div class="thread-entry__conversions">
      <div class="thread-entry__conversions-text">
        Конверсии
      </div>
      <div class="thread-entry__conversions-amount">
        <div class="thread-entry__conversions-value">
          75
        </div>
        <div class="thread-entry__conversions-period">
          /мес
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.thread-entry {
  $this: &;
  $hover: $this + ':hover';

  cursor: pointer;

  position: relative;

  display: flex;
  flex-direction: column;
  gap: $space-4;
  justify-content: space-between;

  height: 185px;
  padding: $space-5;
  border-radius: $radius-4;

  background-color: $color-neutral-50;

  transition: $blur-duration-sm;

  &:hover {
    transition: $hover-duration-sm;;
  }

  &__corner {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;

    width: 60px;
    height: 60px;

    color: white;

    transition: inherit;

    @include is($hover) {
      opacity: 0;
      transition: inherit;
    }
  }

  &__arrow {
    pointer-events: none;

    position: absolute;
    z-index: 2;
    top: 5px;
    right: 5px;

    transition: inherit;

    @include is($hover) {
      border: none;
      transition: inherit;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    align-items: flex-start;

    max-width: 90%;

    &-title {
      @include text(semibold, md);
    }
  }

  &__conversions {
    display: flex;
    flex-direction: column;
    gap: $space-2;

    &-amount {
      display: flex;
      align-items: flex-end;
    }

    &-value {
      @include text(medium, 5xl);

      line-height: 1;
    }

    &-period {
      @include text(regular, sm);

      line-height: 1;
    }

    &-text {
      @include text(regular, xs);

      color: $color-neutral-400;
      transition: inherit;

      @include is($hover) {
        color: $color-neutral-600;
        transition: inherit;
      }
    }
  }
}
</style>
