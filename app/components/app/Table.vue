<script lang="ts" setup generic="TData extends RowData">
import type { ColumnDef, RowData } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

export type TableColumn<TData extends RowData = RowData, TValue = unknown> = ColumnDef<TData, TValue>

export interface TableProps<TData extends RowData = RowData> {
  columns: TableColumn<TData>[]
  data: TData[]
}

const props = defineProps<TableProps<TData>>()

const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <tr
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
        class="table__row table__row-head"
      >
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          class="table__cell table__cell-head"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :props="header.getContext()"
            :render="header.column.columnDef.header"
          />
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
          class="table__cell table__cell-body"
        >
          <FlexRender
            :props="cell.getContext()"
            :render="cell.column.columnDef.cell"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.table {
  $this: &;

  border-collapse: collapse;

  &__head {
    @include label(regular, md);

    position: sticky;
    top: 0;
    color: $color-neutral-400;
    text-align: left;
  }

  &__body {
    @include text(regular, sm);
  }

  &__cell {
    padding: $space-3 $space-3;
    border: 1px solid transparent;

    &-head {
      padding: $space-2 $space-3;
      font-weight: inherit;
    }
  }
}
</style>
