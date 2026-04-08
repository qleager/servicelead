<!-- TODO: Documentation
  комплнент сложный, требуется документации

  Обозначить что на tantask сделан

  Именования:
  head - ячека в header
  cell - ячека в body
  foot - ячейка в footer

  Показать примеры, очень короткие, читсо то, чтобы донести принцип
  1. Об общем слоте header и cell
  2. Об именованох слотах &{name}-header и &{name}-сell и &{name}-foot
  3. О рендер функции в columns и data (Это некая замена слотам отметить)
  4. О size колонок
  5. О sticky header и footer
  6. О том как запинить колонку с нужной стороны
  7. О cellBorder
-->
<script lang="ts" setup generic="TData extends RowData">
import type { Cell, Column, ColumnDef, Header, Row, RowData, Table } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

export interface TableProps<TData extends RowData = RowData> {
  cellBorder?: 'column' | 'column-row' | 'row'
  columns: TableColumn<TData>[]
  data: TData[]
  sticky?: boolean | 'header' | 'footer'
}

export interface TableColumnPinningModel {
  left?: string[]
  right?: string[]
}

export type TableSlots<TData extends RowData = RowData> = {
  cell?: (props: TableCellSlotProps<TData>) => unknown
  footer?: (props: TableFooterSlotProps<TData>) => unknown
  header?: (props: TableHeaderSlotProps<TData>) => unknown
  [key: `${string}-footer`]: ((props: TableFooterSlotProps<TData>) => unknown) | undefined
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

export interface TableFooterSlotProps<TData extends RowData = RowData> {
  column: Column<TData>
  footer: Header<TData, unknown>
  table: Table<TData>
}

const props = defineProps<TableProps<TData>>()

const modelColumnPinning = defineModel<TableColumnPinningModel>('columnPinning')

const slots = defineSlots<TableSlots<TData>>()

const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  defaultColumn: {
    minSize: 100,
    size: 100,
  },
  state: {
    get columnPinning() {
      return modelColumnPinning.value
    },
  },
})

const classname = computed(() => ([
  'table',
  props.cellBorder ? `table-border-${props.cellBorder}` : '',
  { 'table-sticky-header': props.sticky === 'header' || props.sticky === true },
  { 'table-sticky-footer': props.sticky === 'footer' || props.sticky === true },
]))

const footerGroups = computed(() => {
  // Filter rows with empty th
  return table.getFooterGroups().filter((footerGroup) => {
    return footerGroup.headers.some((footer) => {
      if (footer.isPlaceholder) {
        return false
      }

      if (footer.column.columnDef.footer != null) {
        return true
      }

      return Boolean(
        slots[`${footer.column.id}-footer`]
        || slots.footer,
      )
    })
  })
})

/**
 * Start indexes of top-level header groups
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

const getHeadClasses = (head: Header<TData, unknown>) => {
  const index = head.getLeafHeaders()[0]?.column.getIndex() ?? head.column.getIndex()
  const stickyPosition = head.column.getIsPinned()

  return [
    'table__head',
    `table__head-index-${index}`,
    stickyPosition ? `table__head-sticky-${stickyPosition}` : null,
    { 'table__head-first-in-general-header': isGroupStartCell(index) },
  ]
}

const getCellClasses = (cell: Cell<TData, unknown>) => {
  const index = cell.column.getIndex()
  const rowIndex = cell.row.index
  const stickyPosition = cell.column.getIsPinned()

  return [
    'table__cell',
    `table__cell-index-${index}`,
    `table__cell-row-${rowIndex}`,
    stickyPosition ? `table__cell-sticky-${stickyPosition}` : null,
    { 'table__cell-first-in-general-header': isGroupStartCell(index) },
  ]
}

const getFootClasses = (foot: Header<TData, unknown>, rowIndex: number) => {
  const index = foot.getLeafHeaders()[0]?.column.getIndex() ?? foot.column.getIndex()
  const stickyPosition = foot.column.getIsPinned()

  return [
    'table__foot',
    `table__foot-index-${index}`,
    `table__foot-row-${rowIndex}`,
    stickyPosition ? `table__foot-sticky-${stickyPosition}` : null,
    { 'table__foot-first-in-general-header': isGroupStartCell(index) },
  ]
}
</script>

<template>
  <table :class="classname">
    <thead class="table__header">
      <tr
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
        class="table__row table__row-header"
      >
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :class="getHeadClasses(header)"
          :colspan="header.colSpan"
          :style="`width: ${header.getSize()}px`"
        >
          <div class="table__head-content">
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
          </div>
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
          :class="getCellClasses(cell)"
        >
          <div class="table__cell-content">
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
          </div>
        </td>
      </tr>
    </tbody>

    <tfoot class="table__footer">
      <tr
        v-for="(footerGroup, rowIndex) in footerGroups"
        :key="footerGroup.id"
        class="table__row table__row-footer"
      >
        <th
          v-for="footer in footerGroup.headers"
          :key="footer.id"
          :class="getFootClasses(footer, rowIndex)"
          :colspan="footer.colSpan"
        >
          <div class="table__foot-content">
            <template
              v-if="!footer.isPlaceholder"
            >
              <slot
                :column="footer.column"
                :footer="footer"
                :name="`${footer.column.id}-footer`"
                :table="table"
              >
                <slot
                  :column="footer.column"
                  :footer="footer"
                  name="footer"
                  :table="table"
                >
                  <FlexRender
                    :props="footer.getContext()"
                    :render="footer.column.columnDef.footer"
                  />
                </slot>
              </slot>
            </template>
          </div>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss">
.table {
  $this: &;
  $border-column: $this + '-border-column';
  $border-row: $this + '-border-row';
  $border-column-row: $this + '-border-column-row';
  $sticky-header: $this + '-sticky-header';
  $sticky-footer: $this + '-sticky-footer';

  table-layout: fixed;
  border-spacing: 0;
  border-collapse: separate;

  width: max-content;

  text-indent: 0;

  &__header {
    @include is($sticky-header) {
      position: sticky;
      z-index: 1;
      top: 0;

      container-type: scroll-state;

      background-color: white;
    }
  }

  &__body {
    @include text(regular, sm);
  }

  &__footer {
    border-top: 1px solid $color-neutral-150;

    @include is($sticky-footer) {
      position: sticky;
      bottom: 0;
      container-type: scroll-state;
      background-color: white;
    }
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
    $this: &;
    $sticky-left: $this + '-sticky-left';
    $sticky-right: $this + '-sticky-right';

    @include label(regular, md);

    padding: 0;

    font-weight: inherit;
    color: $color-neutral-400;
    text-align: left;
    white-space: nowrap;
    vertical-align: middle;

    &#{$sticky-left} {
      position: sticky;
      z-index: 2;
      left: 0;

      container-type: scroll-state;

      background-color: white;
    }

    &#{$sticky-right} {
      position: sticky;
      z-index: 2;
      right: 0;

      container-type: scroll-state;

      backdrop-filter: blur(8px);
    }

    &-first-in-general-header {
      @include is($border-column) {
        border-left: 1px solid $color-neutral-150;

        &:first-child {
          border-color: transparent;
        }
      }

      @include is($border-column-row) {
        border-left: 1px solid $color-neutral-150;

        &:first-child {
          border-color: transparent;
        }
      }
    }

    &-content {
      padding: $space-2 $space-3;
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  &__cell {
    $this: &;
    $sticky-left: $this + '-sticky-left';
    $sticky-right: $this + '-sticky-right';

    padding: 0;
    border: 0;
    white-space: nowrap;
    vertical-align: middle;

    &#{$sticky-left} {
      position: sticky;
      left: 0;
      container-type: scroll-state;
      background-color: white;
    }

    &#{$sticky-right} {
      position: sticky;
      right: 0;
      container-type: scroll-state;
      background-color: white;
    }

    &-first-in-general-header {
      @include is($border-column) {
        border-left: 1px solid $color-neutral-150;

        &:first-child {
          border-color: transparent;
        }
      }

      @include is($border-column-row) {
        border-left: 1px solid $color-neutral-150;

        &:first-child {
          border-left: unset;
        }
      }
    }

    @include is($border-column-row) {
      border-top: 1px solid $color-neutral-150;
    }

    &-content {
      padding: $space-3 $space-3;
    }
  }

  &__foot {
    $this: &;
    $sticky-left: $this + '-sticky-left';
    $sticky-right: $this + '-sticky-right';

    @include text(semibold, sm);

    padding: 0;
    text-align: left;
    white-space: nowrap;
    vertical-align: middle;

    &#{$sticky-left} {
      position: sticky;
      z-index: 2;
      left: 0;

      container-type: scroll-state;

      background-color: white;
    }

    &#{$sticky-right} {
      position: sticky;
      z-index: 2;
      right: 0;

      container-type: scroll-state;

      background-color: white;
    }

    &-first-in-general-header {
      @include is($border-column) {
        border-left: 1px solid $color-neutral-150;

        &:first-child {
          border-left-color: transparent;
        }
      }
    }

    &-content {
      padding: $space-3 $space-3;
    }

    &-row {
      &-0 {
        border-top: 1px solid $color-neutral-150;
      }
    }
  }

  // Функциональность 2026 года
  // DOCS: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries
  // Добавлять стили когда sticky-элемент "прилип"
  // Не будет рабоать на старых браузерах
  // К релизу уже будет приемлимое время поддержки браузерами
  @container scroll-state(stuck: top) {
    &__row:last-child &__head {
      border-bottom: 1px solid $color-neutral-150;
    }
  }

  @container scroll-state(stuck: bottom) {
    &__row:last-child &__foot {
      border-top: 1px solid $color-neutral-150;
    }
  }

  @container scroll-state(stuck: left) {
    &__head,
    &__cell,
    &__foot {
      &-content {
        border-right: 1px solid $color-neutral-150;
      }
    }
  }

  @container scroll-state(stuck: right) {
    &__head,
    &__cell,
    &__foot {
      &-content {
        border-left: 1px solid $color-neutral-150;
      }
    }
  }
}
</style>
