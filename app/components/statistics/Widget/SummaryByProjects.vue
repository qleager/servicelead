<script lang="ts" setup>
import type { Table } from '@tanstack/vue-table'
import type { TableColumn, TableColumnPinningModel } from '~/components/app/Table.vue'

interface Props {
  isFilterVisible?: boolean
}

// WARN: чисто для обката таблицы, не нужно использовать эти ключи
type SummaryRow = {
  project: string
  trafficForms: number
  trafficCalls: number
  leadForms: number
  leadCalls: number
  conversionApproved: number
  conversionHeld: number
  conversionCanceled: number
  financeTotal: number
  financeForecast: number
  isTotal?: boolean
}

const AppIcon = resolveComponent('AppIcon')
const AppTooltip = resolveComponent('AppTooltip')

defineProps<Props>()

const filterPeriod = ref('День')

const data = ref<SummaryRow[]>([
  {
    project: 'Мастер на час',
    trafficForms: 0,
    trafficCalls: 2,
    leadForms: 3,
    leadCalls: 2,
    conversionApproved: 3,
    conversionHeld: 1,
    conversionCanceled: 1,
    financeTotal: 1800,
    financeForecast: 2400,
  },
  {
    project: 'Бытовой ремонт',
    trafficForms: 0,
    trafficCalls: 0,
    leadForms: 0,
    leadCalls: 0,
    conversionApproved: 0,
    conversionHeld: 0,
    conversionCanceled: 0,
    financeTotal: 0,
    financeForecast: 0,
  },
  {
    project: 'Универсальный',
    trafficForms: 0,
    trafficCalls: 6,
    leadForms: 4,
    leadCalls: 2,
    conversionApproved: 4,
    conversionHeld: 0,
    conversionCanceled: 1,
    financeTotal: 3880,
    financeForecast: 3880,
  },
])

const columns = ref<TableColumn<SummaryRow>[]>([
  {
    header: 'Проект',
    accessorKey: 'project',
    columns: [
      {
        accessorKey: 'project',
        header: 'Название',
        footer: () => 'Всего по проектам',
      },
    ],
  },
  {
    header: 'Трафик',
    accessorKey: 'traffic',
    columns: [
      {
        header: 'Формы',
        accessorKey: 'trafficForms',
        footer: ({ table, column }) => getSumCellsOfColumn(table, column.id),
      },
      {
        header: 'Звонки',
        accessorKey: 'trafficCalls',
        footer: ({ table, column }) => getSumCellsOfColumn(table, column.id),
      },
    ],
  },
  {
    header: 'Лиды',
    accessorKey: 'leads',
    columns: [
      {
        header: 'Формы',
        accessorKey: 'leadForms',
        footer: ({ table, column }) => getSumCellsOfColumn(table, column.id),
      },
      {
        header: 'Звонки',
        accessorKey: 'leadCalls',
        footer: ({ table, column }) => getSumCellsOfColumn(table, column.id),
      },
    ],
  },
  {
    header: 'Конверсии',
    accessorKey: 'conversion',
    columns: [
      {
        header: () => (
          h(AppTooltip, {
            content: 'Подтверждено',
          },
          {
            default: () => h(AppIcon, {
              name: 'check_24',
              size: 16,
              class: 'statistics-widget-summary__table-head-icon',
            }),
          })
        ),
        accessorKey: 'conversionApproved',
        footer: ({ table, column }) => getSumCellsOfColumn(table, column.id),
      },
      {
        header: () => (
          h(AppTooltip, {
            content: 'Холд',
          },
          {
            default: () => h(AppIcon, {
              name: 'hold',
              size: 16,
              class: 'statistics-widget-summary__table-head-icon',
            }),
          })
        ),
        accessorKey: 'conversionHeld',
        footer: ({ table, column }) => getSumCellsOfColumn(table, column.id),
      },
      {
        header: () => (
          h(AppTooltip, {
            content: 'Треш',
          },
          {
            default: () => h(AppIcon, {
              name: 'Trash',
              size: 16,
              class: 'statistics-widget-summary__table-head-icon',
            }),
          })
        ),
        accessorKey: 'conversionCanceled',
        footer: ({ table, column }) => getSumCellsOfColumn(table, column.id),
      },
    ],
  },
  {
    header: 'Финансы',
    accessorKey: 'conversion',
    columns: [
      {
        header: 'Всего',
        accessorKey: 'financeTotal',
        cell: ({ cell }) => formatCurrency(cell.getValue()),
        footer: ({ table, column }) => {
          const sum = getSumCellsOfColumn(table, column.id)
          return formatCurrency(sum)
        },
      },
      {
        header: 'Прогноз',
        accessorKey: 'financeForecast',
        cell: ({ cell }) => formatCurrency(cell.getValue()),
        footer: ({ table, column }) => {
          const sum = getSumCellsOfColumn(table, column.id)
          return formatCurrency(sum)
        },
      },
    ],
  },
])

const columnPinning = ref<TableColumnPinningModel>({
  left: ['project'],
})

const getSumCellsOfColumn = (table: Table<SummaryRow>, columnKey: string) => {
  return table.getRowModel().rows.reduce((sum, row) => {
    return sum + Number(row.getValue(columnKey) ?? 0)
  }, 0)
}
</script>

<template>
  <AppWidget
    class="statistics-widget-summary"
    color="neutral"
    icon="statistic"
    title="Сводка"
  >
    <template #trailingHeader>
      <AppSelect
        v-if="isFilterVisible"
        v-model="filterPeriod"
        class="statistics-widget-summary__select"
        :items="['День', 'Неделя', 'Месяц']"
        rounded
        size="xs"
      />

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
      <div class="statistics-widget-summary__table-wrap">
        <AppCard>
          <template #content>
            <AppTable
              v-model:column-pinning="columnPinning"
              class="statistics-widget-summary__table"
              :columns
              :data
              vertical-border
            />
          </template>
        </AppCard>
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.statistics-widget-summary {
  $this: &;

  &__select {
    align-self: center;
    width: fit-content;
    margin-right: auto;
  }

  &__table {
    width: 100%;

    &-head-icon {
      transform: translateX(-$space-1);
    }
  }
}
</style>
