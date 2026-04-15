<script lang="ts" setup>
import type { Icons } from '~/types/components/icon'
import type { TabsItem } from '~/components/app/Tabs.vue'
import type { TableColumn } from '~/components/app/Table.vue'

type GeoTabItem = TabsItem & {
  tabIcon?: Icons
  tabIconColor?: 'green' | 'yellow' | 'red'
}

type OfferSingleGeoRow = {
  icon: 'triangle-solid' | 'square-solid' | 'circle-solid'
  city: string
  company: number
  pm: number
  zone: unknown
}

const AppIcon = resolveComponent('AppIcon')
const AppButton = resolveComponent('AppButton')

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

const data = ref<OfferSingleGeoRow[]>([
  {
    icon: 'triangle-solid',
    city: 'Москва',
    company: 123,
    pm: 321,
    zone: null,
  },
  {
    icon: 'square-solid',
    city: 'Санкт-Петербург',
    company: 456,
    pm: 654,
    zone: null,
  },
  {
    icon: 'circle-solid',
    city: 'Новосибирск',
    company: 780,
    pm: 910,
    zone: null,
  },
  {
    icon: 'triangle-solid',
    city: 'Екатеринбург',
    company: 235,
    pm: 480,
    zone: null,
  },
  {
    icon: 'square-solid',
    city: 'Казань',
    company: 512,
    pm: 730,
    zone: null,
  },
  {
    icon: 'circle-solid',
    city: 'Нижний Новгород',
    company: 348,
    pm: 589,
    zone: null,
  },
  {
    icon: 'triangle-solid',
    city: 'Челябинск',
    company: 601,
    pm: 820,
    zone: null,
  },
  {
    icon: 'square-solid',
    city: 'Самара',
    company: 429,
    pm: 570,
    zone: null,
  },
  {
    icon: 'circle-solid',
    city: 'Уфа',
    company: 387,
    pm: 615,
    zone: null,
  },
  {
    icon: 'triangle-solid',
    city: 'Ростов-на-Дону',
    company: 544,
    pm: 702,
    zone: null,
  },
  {
    icon: 'square-solid',
    city: 'Красноярск',
    company: 468,
    pm: 688,
    zone: null,
  },
  {
    icon: 'circle-solid',
    city: 'Пермь',
    company: 319,
    pm: 492,
    zone: null,
  },
  {
    icon: 'triangle-solid',
    city: 'Воронеж',
    company: 286,
    pm: 430,
    zone: null,
  },
  {
    icon: 'square-solid',
    city: 'Волгоград',
    company: 503,
    pm: 744,
    zone: null,
  },
  {
    icon: 'circle-solid',
    city: 'Краснодар',
    company: 627,
    pm: 865,
    zone: null,
  },
])

const columns = ref<TableColumn<OfferSingleGeoRow>[]>([
  {
    header: () => h('div', {
      class: 'offer-single-geo__table-header-city',
    }, [
      h(AppIcon, {
        name: 'triangle',
        size: 16,
      }),
      h('span', 'Город'),
    ]),
    accessorKey: 'city',
    cell: ({ row, cell }) => h('div', {
      class: 'offer-single-geo__table-cell-city',
    }, [
      h(AppIcon, {
        name: row.original.icon,
        size: 16,
        class: [
          'offer-single-geo__table-cell-city-icon',
          `offer-single-geo__table-cell-city-icon--${row.original.icon}`,
        ],
      }),
      h('span', String(cell.getValue())),
    ]),
  },
  {
    header: 'Компания',
    accessorKey: 'company',
    cell: ({ cell }) => formatCurrency(Number(cell.getValue())),
  },
  {
    header: 'ЧМ',
    accessorKey: 'pm',
    cell: ({ cell }) => formatCurrency(Number(cell.getValue())),
  },
  {
    header: () => h('span', { class: 'offer-single-geo__align-right' }, 'Зоны покрытия'),
    accessorKey: 'zone',
    cell: () => h(AppButton, {
      class: 'offer-single-geo__table-map-button',
      color: 'neutral',
      icon: 'map',
      size: 'md',
      variant: 'link',
    }),
  },
])
</script>

<template>
  <OfferSinglePaneTemplate
    class="offer-single-geo"
  >
    <template #header>
      <div class="offer-single-geo__header">
        <div class="offer-single-geo__header-title">
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
      <div class="offer-single-geo__table-wrap">
        <AppTable
          class="offer-single-geo__table"
          :columns
          :data
        />
      </div>
    </template>
    <template #sidebar>
      <HelpWidget class="offer-single-pricelist__help" />
    </template>
  </OfferSinglePaneTemplate>
</template>

<style lang="scss">
.offer-single-geo {
  $this: &;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
    justify-content: space-between;

    &-title{
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
    width: 100%;

    &-wrap {
      flex: 1;
    }

    &-header {
      &-city {
        display: flex;
        gap: $space-3;
        align-items: center;
      }
    }

    &-map-button {
      margin: -$space-4 0 (-$space-4) auto;
    }

    &-cell {
      &-city {
        display: flex;
        gap: $space-3;
        align-items: center;
      }

      &-city-icon {
        color: $color-green;

        &--triangle-solid {
          color: $color-green;
        }

        &--square-solid {
          color: $color-yellow-400;
        }

        &--circle-solid {
          color: $color-red-400;
        }
      }
    }
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

  &__align-right {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
