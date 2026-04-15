import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppTable from '@components/app/Table.vue'
import AppTag from '@components/app/Tag.vue'
import type { TableColumn, TableColumnPinningModel } from '@components/app/Table.vue'

interface TableRow {
  april: number
  august: number
  day: string
  december: number
  february: number
  january: number
  july: number
  june: number
  march: number
  may: number
  november: number
  october: number
  september: number
}

const data: TableRow[] = [
  { day: 'Понедельник', january: 14, february: 18, march: 21, april: 17, may: 23, june: 28, july: 31, august: 29, september: 25, october: 19, november: 16, december: 12 },
  { day: 'Вторник', january: 11, february: 15, march: 19, april: 14, may: 20, june: 24, july: 27, august: 26, september: 21, october: 17, november: 13, december: 10 },
  { day: 'Среда', january: 16, february: 20, march: 24, april: 19, may: 25, june: 30, july: 33, august: 31, september: 27, october: 22, november: 18, december: 14 },
  { day: 'Четверг', january: 13, february: 17, march: 20, april: 16, may: 22, june: 26, july: 29, august: 28, september: 24, october: 18, november: 15, december: 11 },
  { day: 'Пятница', january: 18, february: 22, march: 26, april: 21, may: 28, june: 32, july: 35, august: 34, september: 29, october: 24, november: 20, december: 16 },
  { day: 'Суббота', january: 21, february: 25, march: 29, april: 24, may: 31, june: 36, july: 39, august: 37, september: 33, october: 27, november: 23, december: 19 },
  { day: 'Воскресенье', january: 19, february: 23, march: 27, april: 22, may: 29, june: 34, july: 37, august: 35, september: 31, october: 26, november: 21, december: 17 },
]

const totalByKey = (key: Exclude<keyof TableRow, 'day'>) => {
  return data.reduce((sum, row) => sum + row[key], 0)
}

const columns: TableColumn<TableRow>[] = [
  { accessorKey: 'day', header: 'День недели', footer: 'Итого' },
  { accessorKey: 'january', header: 'Январь', footer: totalByKey('january') },
  { accessorKey: 'february', header: 'Февраль', footer: totalByKey('february'), enableSorting: true },
  { accessorKey: 'march', header: 'Март', footer: totalByKey('march') },
  { accessorKey: 'april', header: 'Апрель', footer: totalByKey('april') },
  { accessorKey: 'may', header: 'Май', footer: totalByKey('may') },
  { accessorKey: 'june', header: 'Июнь', footer: totalByKey('june') },
  { accessorKey: 'july', header: 'Июль', footer: totalByKey('july') },
  { accessorKey: 'august', header: 'Август', footer: totalByKey('august') },
  { accessorKey: 'september', header: 'Сентябрь', footer: totalByKey('september') },
  { accessorKey: 'october', header: 'Октябрь', footer: totalByKey('october') },
  { accessorKey: 'november', header: 'Ноябрь', footer: totalByKey('november') },
  { accessorKey: 'december', header: 'Декабрь', footer: totalByKey('december') },
]

const columnPinning: TableColumnPinningModel = {
  left: ['day'],
  right: ['december'],
}

export default {
  title: 'App/Table',
  component: AppTable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    sticky: {
      control: 'select',
      options: [false, true, 'header', 'footer'],
    },
    cellBorder: {
      control: 'select',
      options: ['column', 'column-row', 'row'],
    },
    header: {
      control: 'boolean',
      name: 'Header Slot',
      table: { category: 'slots' },
    },
    cell: {
      control: 'boolean',
      name: 'Cell Slot',
      table: { category: 'slots' },
    },
    footer: {
      control: 'boolean',
      name: 'Footer Slot',
      table: { category: 'slots' },
    },
    columns: {
      table: { category: 'Behavioral props' },
    },
    data: {
      table: { category: 'Behavioral props' },
    },
  },
  args: {
    columns,
    data,
    sticky: false,
    header: false,
    cellBorder: 'row',
    footer: false,
  },
} satisfies Meta<typeof AppTable>

type Story = StoryObj<typeof AppTable>

export const Playground: Story = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      options: {
        white: { name: 'White', value: '#ffffff' },
      },
    },
  },
  globals: {
    backgrounds: { value: 'white' },
  },
  render: args => ({
    components: { AppTable, AppTag },
    setup: () => ({ args, columnPinning }),
    template: `
        <div style="max-width: 500px; overflow-x: auto; height: 200px; margin: auto">
          <AppTable
            v-bind="args"
            v-model:columnPinning="columnPinning"
          >
            <template v-if="args.header" #header>
              <AppTag size="xs" color="gray" variant="soft" :rounded="false">Header Slot</AppTag>
            </template>

            <template v-if="args.cell" #cell>
              <AppTag size="xs" color="gray" variant="soft" :rounded="false">Cell Slot</AppTag>
            </template>

            <template v-if="args.footer" #footer>
              <AppTag size="xs" color="gray" variant="soft" :rounded="false">Footer Slot</AppTag>
            </template>
          </AppTable>
        </div>
    `,
  }),
}
