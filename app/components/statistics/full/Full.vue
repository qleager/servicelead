<script lang="ts" setup>
import type { TableColumn, TableColumnPinningModel } from '~/components/app/Table.vue'

type StatisticsFullRow = {
  date: string
  trafficForms: number
  trafficCalls: number
  trafficTotal: number
  leadForms: number
  leadCalls: number
  leadTotal: number
  conversionForms: number
  conversionCalls: number
  conversionTotal: number
  conversionApproved: number
  conversionHeld: number
  conversionCanceled: number
  financeTotal: number
  financePaid: number
  financeForecast: number
}

type StatisticsFullNumericKey = Exclude<keyof StatisticsFullRow, 'date'>

const AppIcon = resolveComponent('AppIcon')
const AppTooltip = resolveComponent('AppTooltip')

const rawData = ref<StatisticsFullRow[]>([
  {
    date: '03.04.2026',
    trafficForms: 4,
    trafficCalls: 4,
    trafficTotal: 20,
    leadForms: 3,
    leadCalls: 1,
    leadTotal: 4,
    conversionForms: 1,
    conversionCalls: 1,
    conversionTotal: 2,
    conversionApproved: 0,
    conversionHeld: 2,
    conversionCanceled: 0,
    financeTotal: 420,
    financePaid: 0,
    financeForecast: 1230,
  },
  {
    date: '04.04.2026',
    trafficForms: 6,
    trafficCalls: 5,
    trafficTotal: 27,
    leadForms: 4,
    leadCalls: 2,
    leadTotal: 6,
    conversionForms: 2,
    conversionCalls: 1,
    conversionTotal: 3,
    conversionApproved: 1,
    conversionHeld: 1,
    conversionCanceled: 1,
    financeTotal: 1680,
    financePaid: 840,
    financeForecast: 2140,
  },
  {
    date: '05.04.2026',
    trafficForms: 8,
    trafficCalls: 7,
    trafficTotal: 34,
    leadForms: 5,
    leadCalls: 3,
    leadTotal: 8,
    conversionForms: 3,
    conversionCalls: 1,
    conversionTotal: 4,
    conversionApproved: 2,
    conversionHeld: 1,
    conversionCanceled: 1,
    financeTotal: 2540,
    financePaid: 1260,
    financeForecast: 3010,
  },
  {
    date: '06.04.2026',
    trafficForms: 5,
    trafficCalls: 6,
    trafficTotal: 24,
    leadForms: 3,
    leadCalls: 2,
    leadTotal: 5,
    conversionForms: 1,
    conversionCalls: 2,
    conversionTotal: 3,
    conversionApproved: 1,
    conversionHeld: 2,
    conversionCanceled: 0,
    financeTotal: 1930,
    financePaid: 980,
    financeForecast: 2360,
  },
  {
    date: '07.04.2026',
    trafficForms: 9,
    trafficCalls: 4,
    trafficTotal: 29,
    leadForms: 6,
    leadCalls: 1,
    leadTotal: 7,
    conversionForms: 3,
    conversionCalls: 1,
    conversionTotal: 4,
    conversionApproved: 2,
    conversionHeld: 1,
    conversionCanceled: 1,
    financeTotal: 2870,
    financePaid: 1440,
    financeForecast: 3320,
  },
  {
    date: '08.04.2026',
    trafficForms: 7,
    trafficCalls: 8,
    trafficTotal: 36,
    leadForms: 4,
    leadCalls: 4,
    leadTotal: 8,
    conversionForms: 2,
    conversionCalls: 2,
    conversionTotal: 4,
    conversionApproved: 2,
    conversionHeld: 2,
    conversionCanceled: 0,
    financeTotal: 3120,
    financePaid: 1580,
    financeForecast: 3740,
  },
  {
    date: '09.04.2026',
    trafficForms: 3,
    trafficCalls: 5,
    trafficTotal: 18,
    leadForms: 2,
    leadCalls: 2,
    leadTotal: 4,
    conversionForms: 1,
    conversionCalls: 1,
    conversionTotal: 2,
    conversionApproved: 1,
    conversionHeld: 1,
    conversionCanceled: 0,
    financeTotal: 1180,
    financePaid: 600,
    financeForecast: 1460,
  },
  {
    date: '10.04.2026',
    trafficForms: 10,
    trafficCalls: 9,
    trafficTotal: 41,
    leadForms: 7,
    leadCalls: 3,
    leadTotal: 10,
    conversionForms: 4,
    conversionCalls: 2,
    conversionTotal: 6,
    conversionApproved: 3,
    conversionHeld: 2,
    conversionCanceled: 1,
    financeTotal: 4360,
    financePaid: 2210,
    financeForecast: 5020,
  },
  {
    date: '11.04.2026',
    trafficForms: 6,
    trafficCalls: 4,
    trafficTotal: 22,
    leadForms: 4,
    leadCalls: 1,
    leadTotal: 5,
    conversionForms: 2,
    conversionCalls: 1,
    conversionTotal: 3,
    conversionApproved: 2,
    conversionHeld: 1,
    conversionCanceled: 0,
    financeTotal: 2050,
    financePaid: 1040,
    financeForecast: 2480,
  },
  {
    date: '12.04.2026',
    trafficForms: 5,
    trafficCalls: 7,
    trafficTotal: 28,
    leadForms: 3,
    leadCalls: 3,
    leadTotal: 6,
    conversionForms: 2,
    conversionCalls: 1,
    conversionTotal: 3,
    conversionApproved: 1,
    conversionHeld: 1,
    conversionCanceled: 1,
    financeTotal: 1740,
    financePaid: 870,
    financeForecast: 2130,
  },
  {
    date: '13.04.2026',
    trafficForms: 11,
    trafficCalls: 6,
    trafficTotal: 39,
    leadForms: 7,
    leadCalls: 2,
    leadTotal: 9,
    conversionForms: 4,
    conversionCalls: 1,
    conversionTotal: 5,
    conversionApproved: 3,
    conversionHeld: 1,
    conversionCanceled: 1,
    financeTotal: 3890,
    financePaid: 1960,
    financeForecast: 4520,
  },
])

const data = computed<StatisticsFullRow[]>(() => {
  const totalRow: StatisticsFullRow = {
    date: 'Всего',
    trafficForms: getSumOfColumn('trafficForms'),
    trafficCalls: getSumOfColumn('trafficCalls'),
    trafficTotal: getSumOfColumn('trafficTotal'),
    leadForms: getSumOfColumn('leadForms'),
    leadCalls: getSumOfColumn('leadCalls'),
    leadTotal: getSumOfColumn('leadTotal'),
    conversionForms: getSumOfColumn('conversionForms'),
    conversionCalls: getSumOfColumn('conversionCalls'),
    conversionTotal: getSumOfColumn('conversionTotal'),
    conversionApproved: getSumOfColumn('conversionApproved'),
    conversionHeld: getSumOfColumn('conversionHeld'),
    conversionCanceled: getSumOfColumn('conversionCanceled'),
    financeTotal: getSumOfColumn('financeTotal'),
    financePaid: getSumOfColumn('financePaid'),
    financeForecast: getSumOfColumn('financeForecast'),
  }

  return [totalRow, ...rawData.value]
})

const columns = ref<TableColumn<StatisticsFullRow>[]>([
  {
    header: 'Дата',
    accessorKey: 'date',
  },
  {
    header: 'Трафик',
    accessorKey: 'traffic',
    columns: [
      {
        accessorKey: 'trafficForms',
        header: 'Формы',
      },
      {
        accessorKey: 'trafficCalls',
        header: 'Звонки',
      },
      {
        accessorKey: 'trafficTotal',
        header: 'Всего',
      },
    ],
  },
  {
    header: 'Лиды',
    accessorKey: 'lead',
    columns: [
      {
        accessorKey: 'leadForms',
        header: 'Формы',
      },
      {
        accessorKey: 'leadCalls',
        header: 'Звонки',
      },
      {
        accessorKey: 'leadTotal',
        header: 'Всего',
      },
    ],
  },
  {
    header: 'Конверсии',
    accessorKey: 'conversion',
    columns: [
      {
        accessorKey: 'conversionForms',
        header: 'Формы',
      },
      {
        accessorKey: 'conversionCalls',
        header: 'Звонки',
      },
      {
        accessorKey: 'conversionTotal',
        header: 'Всего',
      },
      {
        accessorKey: 'conversionApproved',
        header: () => (
          h(AppTooltip, {
            content: 'Подтверждено',
          }, {
            default: () => h(AppIcon, {
              name: 'check_24',
              size: 16,
              class: 'statistics-full__table-head-icon',
            }),
          })
        ),
      },
      {
        accessorKey: 'conversionHeld',
        header: () => (
          h(AppTooltip, {
            content: 'Холд',
          }, {
            default: () => h(AppIcon, {
              name: 'hold',
              size: 16,
              class: 'statistics-full__table-head-icon',
            }),
          })
        ),
      },
      {
        accessorKey: 'conversionCanceled',
        header: () => (
          h(AppTooltip, {
            content: 'Треш',
          },
          {
            default: () => h(AppIcon, {
              name: 'Trash',
              size: 16,
              class: 'statistics-full__table-head-icon',
            }),
          })
        ),
      },
    ],
  },
  {
    header: 'Финансы',
    accessorKey: 'finance',
    columns: [
      {
        header: 'Всего',
        accessorKey: 'financeTotal',
        cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
      {
        header: 'Выплачено',
        accessorKey: 'financePaid',
        cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
      {
        header: 'Прогноз',
        accessorKey: 'financeForecast',
        cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
    ],
  },
])

const columnPinning = ref<TableColumnPinningModel>({
  left: ['date'],
})

const getSumOfColumn = (columnKey: StatisticsFullNumericKey) => {
  return rawData.value.reduce((sum, row) => {
    return sum + Number(row[columnKey] ?? 0)
  }, 0)
}
</script>

<template>
  <AppCard class="statistics-full">
    <template #top>
      <div class="statistics-full__top">
        <StatisticsFullFilter />
        <StatisticsFullActions />
      </div>
    </template>

    <template #content>
      <div class="statistics-full__table-wrap">
        <AppTable
          v-model:column-pinning="columnPinning"
          cell-border="column-row"
          class="statistics-full__table"
          :columns
          :data
        />
      </div>
    </template>
  </AppCard>
</template>

<style lang="scss">
.statistics-full {
  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: $space-4;
  }

  &__table {
    width: 100%;

    &-head-icon {
      transform: translateX(-$space-1);
    }
  }
}
</style>
