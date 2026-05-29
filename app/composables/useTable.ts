import type { ColumnDef, Row, RowData, RowSelectionState, SortingState, Updater } from '@tanstack/vue-table'
import { getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { computed, h } from 'vue'
import AppCheckbox from '~/components/app/Checkbox.vue'

export interface UseTableProps<TData extends RowData = RowData> {
  columns: TableColumn<TData>[]
  data: TData[]
  enableRowSelection?: boolean
  getRowId?: TableGetRowId<TData>
  sortingMode?: TableSortingMode
}

export interface TableColumnPinningModel {
  left?: string[]
  right?: string[]
}

export type TableSortingModel = SortingState

export type TableRowSelectionModel = RowSelectionState

export type TableColumn<TData extends RowData = RowData, TValue = unknown> = ColumnDef<TData, TValue>

export type TableGetRowId<TData extends RowData = RowData> = (row: TData, index: number, parent?: Row<TData>) => string

export type TableSortingMode = 'client' | 'server'

interface UseTableOptions<TData extends RowData = RowData> {
  modelColumnPinning: Ref<TableColumnPinningModel | undefined>
  modelRowSelection: Ref<TableRowSelectionModel>
  modelSorting: Ref<TableSortingModel>
  onSelect?: (event: MouseEvent, row: Row<TData>) => void
  props: UseTableProps<TData>
}

export const useTable = <TData extends RowData = RowData>(options: UseTableOptions<TData>) => {
  const columns = computed<TableColumn<TData>[]>(() => {
    if (!options.props.enableRowSelection) {
      return options.props.columns
    }

    return [
      // Add column with checkbox row selecter
      {
        cell: ({ row }) => h(AppCheckbox, {
          'class': 'table__row-selection-checkbox',
          'modelValue': row.getIsSelected(),
          'onClick': (event: MouseEvent) => options.onSelect?.(event, row),
          'onUpdate:modelValue': (value: boolean) => row.toggleSelected(value),
          'size': 'xs',
        }),
        header: ({ table }) => h(AppCheckbox, {
          'class': 'table__row-selection-checkbox',
          'disabled': table.getRowModel().rows.length === 0,
          'icon': table.getIsAllRowsSelected() ? 'check_24' : 'close',
          'modelValue': table.getIsAllRowsSelected() || table.getIsSomeRowsSelected(),
          'onUpdate:modelValue': (value: boolean) => table.toggleAllRowsSelected(value),
          'size': 'xs',
        }),
        enableSorting: false,
        id: '_rowSelection',
        size: 44,
        meta: {
          align: 'center',
        },
      },
      ...options.props.columns,
    ]
  })

  const updateSorting = (updater: Updater<SortingState>) => {
    options.modelSorting.value = typeof updater === 'function'
      ? updater(options.modelSorting.value)
      : updater
  }

  const updateRowSelection = (updater: Updater<RowSelectionState>) => {
    options.modelRowSelection.value = typeof updater === 'function'
      ? updater(options.modelRowSelection.value)
      : updater
  }

  const table = useVueTable({
    get data() {
      return options.props.data
    },
    get columns() {
      return columns.value
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    get manualSorting() {
      return options.props.sortingMode === 'server'
    },
    onSortingChange: updateSorting,
    onRowSelectionChange: updateRowSelection,
    get enableRowSelection() {
      return options.props.enableRowSelection
    },
    get getRowId() {
      return options.props.getRowId
    },
    defaultColumn: {
      // @ts-expect-error: ⛔️ спорное решение, веротяно оно может что то сломать
      // сделано чтобы не вешать size, если он явно не задан
      size: 'auto',
      enableSorting: false,
      meta: {
        align: 'left',
      },
    },
    state: {
      get columnPinning() {
        return options.modelColumnPinning.value
      },
      get sorting() {
        return options.modelSorting.value
      },
      get rowSelection() {
        return options.modelRowSelection.value
      },
    },
  })

  return {
    columns,
    table,
    updateRowSelection,
    updateSorting,
  }
}

export type { UseTableOptions }
