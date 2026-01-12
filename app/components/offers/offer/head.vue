<script lang="ts" setup>
import type { TagProps } from '~/components/App/Tag.vue'
import type { TabsItem, TabsModel } from '~/components/App/Tabs.vue'

// нужные доработки в других компонентах
// Tag:
// 1) экспортировать тип TagProps
// 2) нету возможности раскрасить иконки
// 3) нету color с цветом Purple_100 как в макете

// Button
// 1) нет цвета как в макете $color-neutral-300

// Tags
// 1) нет цвета как в макете $color-neutral-300
// 2) нет возможности воткнуть индикатор=счетчик вместо иконки. Пример на макете таб "География"

// нету в макете разных статусов "подключен/отключен", только "подключен", потому пока статус захардкожен

interface Tag extends TagProps {
  label: string
}

interface Rate {
  label: string
  prefix?: string
  value: number
  currency: string
}

interface Props {
  title: string
  tags?: Tag[]
  rate: Rate
  tabs?: TabsItem[]
}

const props = withDefaults(defineProps<Props>(), {
  tags: () => [],
  tabs: () => [],
})

const model = defineModel<TabsModel>()

const classname = computed(() => [
  'offer-head',
])

const preparedTags = computed(() =>
  props.tags.map((tag) => {
    const { label, ...tagProps } = tag
    return { label, tagProps }
  }),
)

const onCreate = () => {
  console.log('логика "Создать поток"')
}

const onNext = () => {
  console.log('логика лействия рядом со ставкой')
}

export type { Tag, Rate }
</script>

<template>
  <div :class="classname">
    <div class="offer-head__main">
      <div class="offer-head__title">
        <div class="offer-head__title-top">
          <div
            v-if="tags?.length"
            class="offer-head__tags"
          >
            <AppTag
              v-for="(tag, index) in preparedTags"
              :key="index"
              class="offer-head__tags-tag"
              v-bind="tag.tagProps"
            >
              {{ tag.label }}
            </AppTag>
          </div>
          <div class="offer-head__title-row">
            <div class="offer-head__title-text">
              {{ props.title }}
            </div>

            <div class="offer-head__status">
              <span class="offer-head__status-dot" />
              <span class="offer-head__status-text">
                Подключен
              </span>
            </div>
          </div>
        </div>

        <div class="offer-head__bottom">
          <div class="offer-head__rate">
            <div class="offer-head__rate-label">
              {{ rate.label }}
            </div>
            <div class="offer-head__rate-info">
              <span class="offer-head__rate-prefix">
                {{ rate.prefix }}
              </span>
              <span class="offer-head__rate-number">
                {{ rate.value }}
              </span>
              <span class="offer-head__rate-currency">
                {{ rate.currency }}
              </span>
            </div>
          </div>

          <div class="offer-head__actions">
            <AppButton
              class="offer-head__actions-action"
              icon="arrow_right"
              size="xs"
              variant="lined"
              color="lighter"
              @click="onNext"
            />
            <AppButton
              class="offer-head__actions-cta"
              @click="onCreate"
            >
              Создать поток
            </AppButton>
          </div>
        </div>
      </div>
      <div class="offer-head__tabs">
        <AppTabs
          v-if="tabs?.length"
          v-model="model"
          :items="tabs"
          variant="lined"
          color="lighter"
          class="offer-head__tabs-tab"
        />
      </div>
    </div>
    <div class="offer-head__logo">
      <NuxtImg
        class="offer-head__logo-image"
        src="images/offer-head-image.png"
      />
    </div>
  </div>
</template>

<style lang="scss">
.offer-head {
  $this: &;

  position: relative;
  overflow: visible;
  display: flex;

  &__main {
    display: flex;
    flex-direction: column;
    gap: $space-8;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    &-tag {
      outline: 1px dashed $color-primary
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: $space-6;

    &-top {
      display: flex;
      flex-direction: column;
      gap: $space-1;
    }

    &-row {
      display: flex;
      gap: $space-4;
      align-items: center;
    }

    &-text {
      @include text(bold, 5xl);
    }
  }

  &__status {
    display: inline-flex;
    gap: $space-2;
    align-items: center;
    outline: 1px dashed $color-primary;

    &-dot {
      width: 12px;
      height: 12px;
      border-radius: 34px;
      background-color: $color-green;
    }

    &--text {
      color: $color-neutral-400;

      @include text(regular, xs);
    }
  }

  &__bottom {
    display: flex;
    gap: $space-2;
    align-items: flex-end;
  }

  &__rate {
    display: flex;
    flex-direction: column;

    &-label {
      text-transform: uppercase;

      @include text(regular, sm);
    }

    &-value {
      display: flex;
      gap: $space-2;
      align-items: flex-end;
    }

    &-info {
      transform: translateY(6px);
      display: inline-flex;
      gap: 6px;
      align-items: baseline;
    }

    &-prefix {
      @include text(medium, 2xl);

      &:empty {
        display: none;
      }
    }

    &-currency {
      @include text(medium, 2xl);
    }

    &-number {
      @include text(medium, 5xl);
    }
  }

  &__actions {
    display: flex;
    gap: $space-8;
    align-items: flex-end;

    &-action {
      margin-bottom: 6px;
      outline: 1px dashed $color-primary;
    }
  }

  &__tabs {
    &-tab {
      outline: 1px dashed $color-primary;
    }
  }

  &__logo {
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: -9px;

    width: 652px;
    height: 346px;

    &-image {
      height: 100%;
    }
  }
}
</style>
