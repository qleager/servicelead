<script lang="ts" setup>
import type { TableColumn } from '~/components/app/Table.vue'

type ConversionByCitiesRow = {
  city: string
  conversion: number
  conversionByWeek: number
  conversionByMonth: number
}

const data = ref<ConversionByCitiesRow[]>([
  {
    city: 'Ростов-на-Дону',
    conversion: 123,
    conversionByWeek: 5.3,
    conversionByMonth: 15,
  },
  {
    city: 'Санкт-Петербург',
    conversion: 23,
    conversionByWeek: 1.5,
    conversionByMonth: 19,
  },
  {
    city: 'Архангельск',
    conversion: 47,
    conversionByWeek: -5.4,
    conversionByMonth: -20,
  },
  {
    city: 'Новороссийск',
    conversion: 4,
    conversionByWeek: 0.4,
    conversionByMonth: 1,
  },
])

const columns = ref<TableColumn<ConversionByCitiesRow>[]>([{
  header: 'Город',
  accessorKey: 'city',
}, {
  header: 'Конверсии',
  accessorKey: 'conversion',
}, {
  header: 'К неделе',
  accessorKey: 'conversionByWeek',
}, {
  header: 'К месяцу',
  accessorKey: 'conversionByMonth',
}])

const formatDelta = (value: unknown) => {
  if (typeof value == 'string' || typeof value == 'number') {
    const num = Number(value)
    return `${num > 0 ? '+' : ''}${value}%`
  }

  return 'Не определен'
}

const getDeltaClasses = (baseClass: string, value: unknown) => {
  if (typeof value == 'string' || typeof value == 'number') {
    const number = Number(value)
    const modifier = number > 0 ? 'positive' : 'negative'

    return [
      `${baseClass}`,
      `${baseClass}--${modifier}`,
    ]
  }

  return `${baseClass}`
}
</script>

<template>
  <AppWidget
    class="statistics-widget-conversion-by-cities"
    color="neutral"
    icon="rocket"
    title="Топ городов по конверсиям"
  >
    <template #trailingHeader>
      <AppButton
        color="neutral"
        size="sm"
        variant="link"
        @click="navigateTo('/summary')"
      >
        Подробнее
      </AppButton>
    </template>
    <template #content>
      <AppCard>
        <template #content>
          <AppTable
            class="statistics-widget-conversion-by-cities__table"
            :columns
            :data
          >
            <template #city-header="{ column }">
              <div class="statistics-widget-conversion-by-cities__table-header-city">
                <AppIcon
                  name="triangle-solid"
                  :size="16"
                />
                {{ column.columnDef.header }}
              </div>
            </template>

            <template #city-cell="{ cell }">
              <div class="statistics-widget-conversion-by-cities__table-cell-city">
                <AppIcon
                  class="statistics-widget-conversion-by-cities__table-cell-city-icon statistics-widget-conversion-by-cities__table-cell-city-icon--triangle-solid"
                  name="square-solid"
                  :size="16"
                />
                {{ cell.getValue() }}
              </div>
            </template>

            <template #conversionByWeek-cell="{ cell }">
              <div :class="getDeltaClasses('statistics-widget-conversion-by-cities__table-cell-conversion-by-week', cell.getValue())">
                {{ formatDelta(cell.getValue()) }}
              </div>
            </template>

            <template #conversionByMonth-cell="{ cell }">
              <div :class="getDeltaClasses('statistics-widget-conversion-by-cities__table-cell-conversion-by-month', cell.getValue())">
                {{ formatDelta(cell.getValue()) }}
              </div>
            </template>
          </AppTable>
        </template>
      </AppCard>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.statistics-widget-conversion-by-cities {
  $this: &;

  &__table {
    width: 100%;

    &-cell {
      &-city {
        display: flex;
        gap: $space-2;
        align-items: center;

        &-icon {
          &--triangle-solid {
            color: $color-green;
          }
        }
      }

      &-conversion-by-week {
        &--positive {
          color: $color-green;
        }

        &--negative {
          color: $color-red;
        }
      }

      &-conversion-by-month {
        &--positive {
          color: $color-green;
        }

        &--negative {
          color: $color-red;
        }
      }
    }

    &-header {
      &-city {
        display: flex;
        gap: $space-2;
        align-items: center;
      }
    }
  }
}
</style>
