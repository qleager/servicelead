<script lang="ts" setup>
import type { Icons } from '~/types/components/icon'
import type { TabsItem } from '~/components/app/Tabs.vue'

type GeoTabItem = TabsItem & {
  tabIcon?: Icons
  tabIconColor?: 'green' | 'yellow' | 'red'
}

const tabs: GeoTabItem[] = [
  {
    label: 'Все',
  },
  {
    label: 'Название',
    tabIcon: 'triangle-solid',
    tabIconColor: 'green',
  },
  {
    label: 'Название',
    tabIcon: 'square-solid',
    tabIconColor: 'yellow',
  },
  {
    label: 'Название',
    tabIcon: 'circle-solid',
    tabIconColor: 'red',
  },
]
</script>

<template>
  <div
    class="offer-single-geo"
  >
    <div class="offer-single-geo__top">
      <div class="offer-single-geo__top-column">
        <AppTitle
          icon="geo_24"
          title="Гео"
        />
        <AppButton
          color="neutral"
          icon="arrow_down"
          size="sm"
          trailing-icon
          variant="link"
          @click="console.log('download')"
        >
          Скачать
        </AppButton>
      </div>
      <div class="offer-single-geo__top-column">
        <AppTabs
          class="offer-single-geo__tabs"
          color="neutral"
          :items="tabs"
          size="xs"
        >
          <template #default="{ item }">
            <div class="offer-single-geo__tab-content">
              <AppIcon
                v-if="(item as GeoTabItem).tabIcon"
                class="offer-single-geo__tab-icon"
                :class="`offer-single-geo__tab-icon-${(item as GeoTabItem).tabIconColor}`"
                :name="(item as GeoTabItem).tabIcon!"
                :size="16"
              />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </AppTabs>
      </div>
      <div class="offer-single-geo__top-column">
        <AppInput
          class="offer-single-geo__search"
          icon="search"
          placeholder="Начните поиск..."
          reset
          rounded
        />
      </div>
    </div>
    <div class="offer-single-geo__content">
      <div class="offer-single-geo__table">
        table
      </div>
      <HelpWidget class="offer-single-pricelist__help" />
    </div>
  </div>
</template>

<style lang="scss">
.offer-single-geo {
  $this: &;

  &__top {
    display: flex;
    gap: $space-4;
    justify-content: space-between;

    &-column {
      display: flex;
      gap: $space-6;
      align-items: center;
    }
  }

  &__search {
    min-width: 290px;
  }

  &__content {
    display: flex;
    gap: $space-4;
  }

  &__table {
    flex: 1;
  }

  &__help {
    max-width: 290px;
  }

  &__tab {
    &-content {
      display: flex;
      gap: $space-05;
      align-items: center;

      @include text(regular, sm);
    }

    &-icon {
      &-green {
        color: $color-green;
      }

      &-yellow {
        color: $color-yellow-400;
      }

      &-red {
        color: $color-red-400;
      }
    }
  }
}
</style>
