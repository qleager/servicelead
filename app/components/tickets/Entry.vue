<script lang="ts" setup>
interface Props {
  minimal?: boolean
}

const props = defineProps<Props>()

const classname = computed(() => [
  'tickets-entry',
  { 'tickets-entry-minimal': props.minimal },
  { 'tickets-entry-read': false },
])
</script>

<template>
  <article :class="classname">
    <header class="tickets-entry__header">
      <AppTag
        class="tickets-entry__tag"
        color="neutral"
        varinat="soft"
      >
        Выполнен
      </AppTag>
      <div class="tickets-entry__title">
        Обновление комиссий Компьютерная и периферийная техника Обновление комиссий Компьютерная и периферийная техника
      </div>
    </header>
    <div class="tickets-entry__text">
      Дополнительное улучшение комиссий на основе анализа эффективности оферов. Дополнительное улучшение комиссий на основе анализа эффективности оферов. Дополнительное улучшение комиссий на основе анализа эффективности оферов.
    </div>
    <footer class="tickets-entry__footer">
      <div class="tickets-entry__date">
        <NuxtTime
          datetime="2024-12-18T08:55:00Z"
          locale="ru-RU"
          numeric="auto"
          relative
        />
      </div>
      <AppButton
        class="tickets-entry__button"
        variant="lined"
        color="neutral"
        icon="arrow_right"
        size="xs"
      />
    </footer>
  </article>
</template>

<style lang="scss">
.tickets-entry {
  $this: &;
  $minimal: & + '-minimal';
  $read: & + '-read';

  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: $space-2;

  min-height: 270px;
  max-height: 100%;
  padding: $space-6;
  border-radius: $radius-2;

  &#{$minimal} {
    gap: $space-1;
    min-height: auto;
    padding: $space-2 $space-3;

      &:hover {
        background-color: $color-neutral-50;
      }
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $space-4;

    #{$minimal} & {
      flex-direction: row-reverse;
      gap: $space-4;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;

    @include text(medium, md);

    #{$minimal} & {
      @include text(regular, sm);
    }
  }

  &__tag {
    cursor: pointer;
  }

  &__indicator {
    display: none;
    flex: 0 0 24px;

    width: 24px;
    height: 24px;
    border-radius: $radius-2;

    background-color: $color-blue-300;
    outline: 1px dashed $color-primary-500;

    #{$minimal} & {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #{$read} & {
      background-color: $color-neutral-200;
    }

    &-dot {
      flex: 0 0 8px;

      width: 8px;
      height: 8px;
      border-radius: $radius-6;

      background-color: $color-blue-500;

      #{$read} & {
        background-color: $color-neutral-400;
      }
    }
  }

  &__text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    line-clamp: 5;

    @include text(regular, sm);

    color: $color-neutral-500;

    #{$minimal} & {
      display: none;
    }
  }

  &__footer {
    display: flex;
    gap: $space-2;
    align-items: flex-end;
    justify-content: space-between;

    margin-top: auto;

    @include text(regular, xs);

    color: $color-neutral-400;
  }

  &__button {
    #{$minimal} & {
      display: none;
    }
  }
}
</style>
