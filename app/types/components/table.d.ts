import '@tanstack/vue-table'
import type { RowData } from '@tanstack/vue-table'

export type TableColumnAlign = 'left' | 'center' | 'right'

declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: TableColumnAlign
  }
}

export {}
