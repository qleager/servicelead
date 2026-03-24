<script lang="ts" setup>
interface Props {
  minimal?: boolean
}

const props = defineProps<Props>()

const classname = computed(() => [
  'ticket-entry',
  { 'ticket-entry-minimal': props.minimal },
  { 'ticket-entry-read': false },
])
</script>

<template>
  <article :class="classname">
    <header class="ticket-entry__header">
      <AppTag
        class="ticket-entry__tag"
        color="neutral"
        varinat="soft"
      >
        Выполнен
      </AppTag>
      <div class="ticket-entry__title">
        Паттерн повторяется с уведомлениями – давайте делать компонент Entry
      </div>
    </header>
    <div class="ticket-entry__text">
      Дополнительное улучшение комиссий на основе анализа эффективности оферов. Дополнительное улучшение комиссий на основе анализа эффективности оферов. Дополнительное улучшение комиссий на основе анализа эффективности оферов.
    </div>
    <footer class="ticket-entry__footer">
      <div class="ticket-entry__date">
        <NuxtTime
          :datetime="new Date()"
          locale="ru-RU"
          numeric="auto"
          relative
        />
      </div>
      <AppButton
        class="ticket-entry__button"
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="outline"
      />
    </footer>
  </article>
</template>

<style lang="scss">
.ticket-entry {
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
    outline: 1px dashed $color-primary;

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

      background-color: $color-blue;

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

    color: $color-neutral;

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
