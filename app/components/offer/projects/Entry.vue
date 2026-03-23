<script setup lang="ts">
const TAGS_LIMIT = 4

const mockTags = ref<string[]>([
  'электрик',
  'сантехник',
  'окна',
  'плитка',
  'мелкий ремонт',
  'сборка мебели',
  'покраска',
  'ламинат',
  'двери',
  'балкон',
  'ремонт кухни',
  'ремонт ванной',
  'клейка плитки',
  'штукатурка',
  'монтаж полок',
  'установка светильников',
  'регулировка дверей',
  'мелкие сантехнические работы',
  'замена смесителей',
  'ремонт бытовой техники',
  'заделка трещин',
  'монтаж карнизов',
  'установка шкафов',
  'замена розеток',
  'устранение протечек',
  'мелкий электромонтаж',
  'ремонт дверных замков',
  'проверка проводки',
  'прочие мелкие работы',
])
</script>

<template>
  <div class="offers-projects-entry">
    <AppButton
      class="offers-projects-entry__arrow"
      variant="lined"
      color="neutral"
      icon="arrow_right"
      size="xs"
    />
    <div class="offers-projects-entry__corner">
      <svg
        width="60"
        height="61"
        viewBox="0 0 60 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 61C60 52.1634 52.8366 44.8682 44 44.8682H37.1348C25.5369 44.8682 16.135 35.466 16.1348 23.8682V16C16.1348 7.16344 8.83656 0 0 0H60V61Z"
          fill="currentcolor"
        />
      </svg>
    </div>
    <div class="offers-projects-entry__info">
      <div class="offers-projects-entry__info-title">
        Мастер на час
      </div>
      <div class="offers-projects-entry__info-list">
        {{ mockTags.slice(0, TAGS_LIMIT).join(', ') }}
        <template v-if="mockTags.slice(TAGS_LIMIT).length">
          <span class="offers-projects-entry__info-more-wrapper">
            <AppDropdown mode="hover">
              <span class="offers-projects-entry__info-more">
                +{{ mockTags.slice(TAGS_LIMIT).length }}
              </span>

              <template #content>
                <div class="offers-projects-entry__tags-dropdown">
                  {{ mockTags.slice(TAGS_LIMIT).join('\r\n') }}
                </div>
              </template>
            </AppDropdown>
          </span>
        </template>
      </div>
    </div>
    <div class="offers-projects-entry__metric">
      <div class="offers-projects-entry__metric-data">
        <div class="offers-projects-entry__metric-value">
          75
        </div>
        <div class="offers-projects-entry__metric-meta">
          %
        </div>
      </div>
      <div class="offers-projects-entry__metric-label">
        Прогресс
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offers-projects-entry {
  $this: &;

  cursor: pointer;

  position: relative;

  display: flex;
  flex-direction: column;
  gap: $space-4;
  justify-content: space-between;

  min-width: 264px;
  max-width: 264px;
  height: 200px;
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

    #{$this}:hover & {
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

    #{$this}:hover & {
      border: none;
      transition: inherit;
    }
  }

  &__tags {
    &-dropdown {
      white-space: pre-line;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    max-width: 170px;

    &-title {
      @include text(semibold, md);
    }

    &-list {
      @include text(regular, xs);

      color: $color-neutral-400;
      text-transform: lowercase;
      transition: inherit;

      &::first-letter {
        text-transform: uppercase;
      }

      #{$this}:hover & {
        color: $color-neutral-600;
        transition: inherit;
      }
    }

    &-more-wrapper {
      display: inline-block;

      margin-left: $space-1;
      padding-inline: $space-1;
      border: 1px solid $color-neutral-400;
      border-radius: $radius-2;

      transition: inherit;

      #{$this}:hover & {
        border: 1px solid $color-neutral-600;
        transition: inherit;
      }
    }
  }

  &__metric {
    display: flex;
    gap: $space-4;
    align-items: flex-end;

    &-data {
      display: flex;
      align-items: flex-end;
    }

    &-value {
      @include text(medium, 6xl);

      line-height: 1;
    }

    &-meta {
      @include text(regular, 2xl);

      line-height: 1;
    }

    &-label {
      @include text(regular, xs);

      color: $color-neutral-400;
      transition: inherit;

      #{$this}:hover & {
        color: $color-neutral-600;
        transition: inherit;
      }
    }
  }
}
</style>
