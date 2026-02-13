<script lang="ts" setup>
interface Props {
  minimal?: boolean
}

const props = defineProps<Props>()

const classname = computed(() => [
  'notification-entry',
  { 'notification-entry-minimal': props.minimal },
])
</script>

<template>
  <article :class="classname">
    <header class="notification-entry__header">
      <AppTag class="notification-entry__tag">
        Улучшение
      </AppTag>
      <div class="notification-entry__title">
        Паттерн повторяется с новостями – давайте делать компонент Entry
      </div>
      <AppChip
        class="notification-entry__indicator"
        color="primary"
        size="xs"
        standalone
        variant="soft"
      />
    </header>
    <div class="notification-entry__text">
      Дополнительное улучшение комиссий на основе анализа эффективности оферов. Дополнительное улучшение комиссий на основе анализа эффективности оферов. Дополнительное улучшение комиссий на основе анализа эффективности оферов.
    </div>
    <footer class="notification-entry__footer">
      <div class="notification-entry__date">
        <NuxtTime
          :datetime="new Date()"
          locale="ru-RU"
          numeric="auto"
          relative
        />
      </div>
      <AppButton
        class="notification-entry__button"
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="lined"
      />
    </footer>
  </article>
</template>

<style lang="scss">
.notification-entry {
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
      flex-direction: row;
      gap: $space-4;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__tag {
    #{$minimal} & {
      display: none;
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

  &__indicator {
    display: none;
    height: fit-content;
    margin-top: $space-1;

    #{$minimal} & {
      display: flex;
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
