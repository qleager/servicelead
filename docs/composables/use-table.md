# useTable composable and AppTable

`useTable` is a wrapper around `@tanstack/vue-table` that prepares the table instance for `AppTable`.
In most cases, use `AppTable` directly. Use `useTable` only when you need the same TanStack configuration in
a custom table renderer.

## Location
- Composable: app/composables/useTable.ts
- Component: app/components/app/Table.vue
- Column meta types: app/types/components/table.d.ts
- Storybook: storybook/stories/Table.stories.ts

## Core ideas
- `AppTable` renders a native `<table>` and delegates row models, sorting, pinning, and selection to TanStack Table.
- `columns` are TanStack `ColumnDef` objects typed as `TableColumn<TData>`.
- `data` is the row array. Keep row shape and column accessors in sync through `TableColumn<TData>[]`.
- Header cells are called `head` in CSS classes, body cells are `cell`, footer cells are `foot`.
- Rendering priority is: named slot, shared slot, then TanStack render function from the column definition.
- `accessorKey` becomes the default column id. Pinning and named slots use column ids.

## AppTable API

### Props
- `columns: TableColumn<TData>[]` - column definitions.
- `data: TData[]` - row data.
- `cellBorder?: 'column' | 'column-row' | 'row'` - border style between cells.
- `enableRowSelection?: boolean` - adds a checkbox selection column.
- `getRowId?: TableGetRowId<TData>` - returns a stable unique row id. Recommended with row selection.
- `sortingMode?: 'client' | 'server'` - client sorting by default; server mode only updates sorting state.
- `sticky?: boolean | 'header' | 'footer'` - makes header, footer, or both sticky inside the scroll container.

### Models
- `v-model:columnPinning: TableColumnPinningModel` - pinned column ids: `{ left?: string[], right?: string[] }`.
- `v-model:rowSelection: TableRowSelectionModel` - selected row ids.
- `v-model:sorting: TableSortingModel` - TanStack sorting state.

### Emits
- `select(event, row)` - emitted when the row selection checkbox is clicked.

### Slots
Shared slots render all columns:
- `#header="{ header, column, table }"`
- `#cell="{ cell, row, column, table }"`
- `#footer="{ footer, column, table }"`

Named slots render one column and have higher priority than shared slots:
- `#status-header="{ header, column, table }"`
- `#status-cell="{ cell, row, column, table }"`
- `#status-footer="{ footer, column, table }"`

For example, a column with `accessorKey: 'status'` can be customized with `#status-cell`.

## useTable API

### useTable(options)
Options:
- `props: UseTableProps<TData>` - `columns`, `data`, `enableRowSelection`, `getRowId`, `sortingMode`.
- `modelColumnPinning: Ref<TableColumnPinningModel | undefined>` - controlled pinning state.
- `modelRowSelection: Ref<TableRowSelectionModel>` - controlled row selection state.
- `modelSorting: Ref<TableSortingModel>` - controlled sorting state.
- `onSelect?: (event: MouseEvent, row: Row<TData>) => void` - called from selection checkboxes.

Returns:
- `table` - TanStack table instance.
- `columns` - computed columns. When `enableRowSelection` is true, it prepends the checkbox column.
- `updateSorting(updater)` - applies a TanStack sorting updater to `modelSorting`.
- `updateRowSelection(updater)` - applies a TanStack row selection updater to `modelRowSelection`.

## Basic example

```vue
<script setup lang="ts">
import type { TableColumn } from '~/components/app/Table.vue'

interface PaymentRow {
  id: string
  name: string
  amount: number
}

const data: PaymentRow[] = [
  { id: '1', name: 'Lead #1', amount: 1200 },
  { id: '2', name: 'Lead #2', amount: 800 },
]

const columns: TableColumn<PaymentRow>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'amount', header: 'Amount', meta: { align: 'right' } },
]
</script>

<template>
  <AppTable
    :columns="columns"
    :data="data"
  />
</template>
```

## Slots

Use shared slots when the same wrapper should be applied to every column.

```vue
<AppTable
  :columns="columns"
  :data="data"
>
  <template #header="{ column }">
    <AppTag size="xs" color="gray" variant="soft" :rounded="false">
      {{ column.id }}
    </AppTag>
  </template>

  <template #cell="{ cell }">
    {{ cell.getValue() }}
  </template>
</AppTable>
```

Use named slots when only one column needs custom UI.

```vue
<AppTable
  :columns="columns"
  :data="data"
>
  <template #status-cell="{ row }">
    <AppTag
      :color="row.original.status === 'active' ? 'green' : 'gray'"
      size="xs"
      variant="soft"
    >
      {{ row.original.status }}
    </AppTag>
  </template>

  <template #amount-footer>
    Total
  </template>
</AppTable>
```

If a slot only repeats column content, prefer a column render function instead.

## Column render functions

TanStack `header`, `cell`, and `footer` can be strings or render functions. This is useful when the rendering
belongs to the column definition and should travel with it.

```ts
import { h } from 'vue'
import AppTag from '~/components/app/Tag.vue'
import type { TableColumn } from '~/components/app/Table.vue'

const columns: TableColumn<PaymentRow>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(AppTag, {
      color: row.original.status === 'active' ? 'green' : 'gray',
      size: 'xs',
      variant: 'soft',
    }, () => row.original.status),
  },
]
```

## Column size

Set `size` on a column when it needs a fixed width.

```ts
const columns: TableColumn<PaymentRow>[] = [
  { accessorKey: 'name', header: 'Name', size: 240 },
  { accessorKey: 'amount', header: 'Amount', size: 120, meta: { align: 'right' } },
]
```

If `size` is omitted, `useTable` uses the local default column config.

## Sticky header and footer

`sticky` works inside the nearest scroll container. Put `AppTable` in a wrapper with constrained height or
horizontal overflow.

```vue
<div style="max-height: 320px; overflow: auto;">
  <AppTable
    :columns="columns"
    :data="data"
    sticky
  />
</div>
```

Use `sticky="header"` or `sticky="footer"` to make only one section sticky.

## Column pinning

Pin columns through `v-model:columnPinning`. Column ids must match `id` or `accessorKey`.

```vue
<script setup lang="ts">
import type { TableColumnPinningModel } from '~/components/app/Table.vue'

const columnPinning = ref<TableColumnPinningModel>({
  left: ['name'],
  right: ['amount'],
})
</script>

<template>
  <div style="max-width: 600px; overflow-x: auto;">
    <AppTable
      v-model:columnPinning="columnPinning"
      :columns="columns"
      :data="data"
    />
  </div>
</template>
```

## Cell borders

Use `cellBorder` to choose the visual separator style:
- `row` - horizontal row separators.
- `column` - vertical separators between column groups.
- `column-row` - both row and column separators.

```vue
<AppTable
  :columns="columns"
  :data="data"
  cell-border="row"
/>
```

## Sorting

Sorting is disabled by default for columns. Enable it per column.

```ts
const sorting = ref<TableSortingModel>([])

const columns: TableColumn<PaymentRow>[] = [
  {
    accessorKey: 'amount',
    header: 'Amount',
    enableSorting: true,
    sortingFn: 'basic',
  },
]
```

```vue
<AppTable
  v-model:sorting="sorting"
  :columns="columns"
  :data="data"
/>
```

For backend sorting, use `sorting-mode="server"`. In this mode `AppTable` updates `v-model:sorting`, but rows
must be loaded or sorted outside the table.

```vue
<AppTable
  v-model:sorting="sorting"
  :columns="columns"
  :data="data"
  sorting-mode="server"
/>
```

## Column meta

The project extends TanStack column meta with `align`.

```ts
const columns: TableColumn<PaymentRow>[] = [
  { accessorKey: 'name', header: 'Name', meta: { align: 'left' } },
  { accessorKey: 'amount', header: 'Amount', meta: { align: 'right' } },
]
```

Supported values:
- `left`
- `center`
- `right`

Default alignment is `left`.

## Row selection

`enableRowSelection` prepends a checkbox column. Selection state is controlled through `v-model:rowSelection`.
Pass `getRowId` so selection does not depend on row index.

```vue
<script setup lang="ts">
import type { TableRowSelectionModel } from '~/components/app/Table.vue'

const rowSelection = ref<TableRowSelectionModel>({})
</script>

<template>
  <AppTable
    v-model:rowSelection="rowSelection"
    :columns="columns"
    :data="data"
    enable-row-selection
    :get-row-id="row => row.id"
    @select="(event, row) => console.log(row.original)"
  />
</template>
```

## Notes
- Named slots are based on column id, not column header text.
- Footer is rendered only when at least one footer cell has a column `footer`, a named footer slot, or the shared `footer` slot.
- The selection column has id `_rowSelection`, sorting disabled, centered alignment, and size `44`.
- For complex table behavior, check TanStack Table docs and keep `AppTable` as the rendering boundary when possible.
