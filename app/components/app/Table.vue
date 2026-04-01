<script lang="ts" setup generic="TData extends RowData">
import type { Cell, Column, ColumnDef, Header, Row, RowData, Table } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

export interface TableProps<TData extends RowData = RowData> {
  columns: TableColumn<TData>[]
  data: TData[]
  verticalBorder?: boolean
}

export type TableSlots<TData extends RowData = RowData> = {
  cell?: (props: TableCellSlotProps<TData>) => unknown
  header?: (props: TableHeaderSlotProps<TData>) => unknown
  [key: `${string}-header`]: ((props: TableHeaderSlotProps<TData>) => unknown) | undefined
  [key: `${string}-cell`]: ((props: TableCellSlotProps<TData>) => unknown) | undefined
}

export type TableColumn<TData extends RowData = RowData, TValue = unknown> = ColumnDef<TData, TValue>

export interface TableHeaderSlotProps<TData extends RowData = RowData> {
  column: Column<TData>
  header: Header<TData, unknown>
  table: Table<TData>
}

export interface TableCellSlotProps<TData extends RowData = RowData> {
  cell: Cell<TData, unknown>
  column: Column<TData>
  row: Row<TData>
  table: Table<TData>
}

const props = defineProps<TableProps<TData>>()

defineSlots<TableSlots<TData>>()

const classname = computed(() => ([
  'table',
  { 'table-vertical-border': props.verticalBorder },
]))

const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <table :class="classname">
    <thead class="table__header">
      <tr
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
        :class="`table__row table__row-header table__row-header-${headerGroup.depth}`"
      >
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          class="table__head"
          :colspan="header.colSpan"
        >
          <template v-if="!header.isPlaceholder">
            <!-- Что тут происходит: сначала пробуем слот конкретной колонки, затем общий слот header, и только потом стандартный header из columnDef. -->
            <slot
              :column="header.column"
              :header="header"
              :name="`${header.column.id}-header`"
              :table="table"
            >
              <slot
                :column="header.column"
                :header="header"
                name="header"
                :table="table"
              >
                <FlexRender
                  :props="header.getContext()"
                  :render="header.column.columnDef.header"
                />
              </slot>
            </slot>
          </template>
        </th>
      </tr>
    </thead>

    <tbody class="table__body">
      <tr
        v-for="row in table.getRowModel().rows"
        :key="row.id"
        class="table__row table__row-body"
      >
        <td
          v-for="cell in row.getVisibleCells()"
          :key="cell.id"
          class="table__cell"
        >
          <slot
            :cell="cell"
            :column="cell.column"
            :name="`${cell.column.id}-cell`"
            :row="row"
            :table="table"
          >
            <slot
              :cell="cell"
              :column="cell.column"
              name="cell"
              :row="row"
              :table="table"
            >
              <FlexRender
                :props="cell.getContext()"
                :render="cell.column.columnDef.cell"
              />
            </slot>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.table {
  $this: &;
  $vertical-border: $this + '-vertical-border';

  // overflow убрать после см. :148
  overflow: hidden;
  border-spacing: 0;
  border-collapse: separate;
  text-indent: 0;

  &__header {
    position: sticky;
    top: 0;
  }

  &__body {
    @include text(regular, sm);
  }

  &__row {
    &-header {
      &-0 {
        // Колхозное решение с покраской бордера первой колонки в группе
        // Пересмотреть решение когда будут делаться стики колонки
        // Смотреть в сторону данимических классов ячеек, так как это сможет заркрывать новые хотелки в будующем
        th:not(:first-child) {
          &::before {
            content: '';

            position: absolute;
            transform: translateY(-$space-2) translateX(-$space-3);

            width: 1px;
            height: 500%;

            background-color: $color-neutral-150;
          }
        }
      }
    }

    &-body {
      &:hover {
        .table__cell {
          background-color: $color-neutral-50;
        }

        .table__cell:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        .table__cell:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
  }

  &__head {
    @include label(regular, md);

    padding: $space-2 $space-3;

    font-weight: inherit;
    color: $color-neutral-400;
    text-align: left;
    vertical-align: middle;
  }

  /* stylelint-disable-next-line no-descending-specificity */
  &__cell {
    padding: $space-3 $space-3;
    border: 1px solid transparent;
    vertical-align: middle;
  }
}
</style>
