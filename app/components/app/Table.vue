<script lang="ts" setup generic="T">
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

export type TableColumn<TData> = ColumnDef<TData>

interface Props {
  columns: TableColumn<T>[]
  data: T[]
}

const props = defineProps<Props>()

const tableApi = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <tr
        v-for="headerGroup in tableApi.getHeaderGroups()"
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
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>

    <tbody class="table__body">
      <tr
        v-for="row in tableApi.getRowModel().rows"
        :key="row.id"
        class="table__row table__row-body"
      >
        <td
          v-for="cell in row.getVisibleCells()"
          :key="cell.id"
          class="table__cell table__cell-body"
        >
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
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

    backdrop-filter: blur(20px) brightness(1.1);
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
