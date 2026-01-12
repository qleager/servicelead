<script lang="ts" setup>
interface Props {
  // минимал версия только с заголовком/текстом/маркером
  news: any
  minimal?: boolean
}

const props = defineProps<Props>()

const formattedDate = ref('')

const classname = computed(() => [
  'news-entry',
  { 'news-entry-minimal': props.minimal },
  { 'news-entry-read': props.news.isRead },
])

onMounted(() => {
  if (!props.news?.created_at) return ''

  const date = new Date(props.news.created_at)
  const now = new Date()

  const isToday
    = date.getFullYear() === now.getFullYear()
      && date.getMonth() === now.getMonth()
      && date.getDate() === now.getDate()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  if (isToday) {
    formattedDate.value = `Сегодня, ${hours}:${minutes}`
  }
  else {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    formattedDate.value = `${day}.${month}.${year}, ${hours}:${minutes}`
  }
})
</script>

<template>
  <article :class="classname">
    <header class="news-entry__header">
      <AppTag class="news-entry__tag">
        {{ news.tag }}
      </AppTag>
      <div class="news-entry__title">
        {{ news.title }}
      </div>
      <!-- TODO: заменить на indicator -->
      <div class="news-entry__indicator">
        <div class="news-entry__indicator-dot" />
      </div>
    </header>
    <div class="news-entry__text">
      {{ news.text }}
    </div>
    <footer class="news-entry__footer">
      <div class="news-entry__date">
        {{ formattedDate }}
      </div>
      <AppButton
        class="news-entry__button"
        variant="lined"
        color="neutral"
        icon="arrow_right"
        size="xs"
      />
    </footer>
  </article>
</template>

<style lang="scss">
.news-entry {
  $this: &;
  $minimal: & + '-minimal';
  $read: & + '-read';

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
        cursor: pointer;
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
