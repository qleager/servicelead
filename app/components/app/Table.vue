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

const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
})

const classname = computed(() => ([
  'table',
  { 'table-vertical-border': props.verticalBorder },
]))

/**
 * Start indexes of top-level header groups.
 */
const topLevelGroupStartIndexes = computed(() => {
  let offset = 0

  return table.getHeaderGroups()[0]?.headers.map((header) => {
    const startIndex = offset
    offset += header.colSpan
    return startIndex
  }) ?? []
})

/**
 * Checks whether a cell is the first one in a top-level header group.
 */
const isGroupStartCell = (index: number) => {
  return topLevelGroupStartIndexes.value.includes(index)
}

const getThClasses = (head: Header<TData, unknown>) => {
  const index = head.getLeafHeaders()[0]?.column.getIndex() ?? head.column.getIndex()

  return [
    'table__head',
    `table__head-index-${index}`,
    { 'table__head-first-in-general-header': isGroupStartCell(index) },
  ]
}

const getTdClasses = (cell: Cell<TData, unknown>) => {
  const index = cell.column.getIndex()
  const rowIndex = cell.row.index

  console.log(cell)

  return [
    'table__cell',
    `table__cell-index-${index}`,
    `table__cell-row-${rowIndex}`,
    { 'table__cell-first-in-general-header': isGroupStartCell(index) },
  ]
}
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
          :class="getThClasses(header)"
          :colspan="header.colSpan"
        >
          <template
            v-if="!header.isPlaceholder"
          >
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
          :class="getTdClasses(cell)"
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

  // Remove overflow after revisiting the note around line 148.
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
    &-body {
      // Add rounded corners to the hovered row.
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

    &-first-in-general-header {
      @include is($vertical-border) {
        border-left: 1px solid $color-neutral-150;

        &:first-child {
          border-color: transparent;
        }
      }
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  &__cell {
    padding: $space-3 $space-3;
    border: 1px solid transparent;
    vertical-align: middle;

    &-first-in-general-header {
      @include is($vertical-border) {
        border-left: 1px solid $color-neutral-150;

        &:first-child {
          border-color: transparent;
        }
      }
    }
  }
}
</style>
