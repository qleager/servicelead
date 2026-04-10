<script setup lang="ts">
import { h } from 'vue'
import type { TableColumn } from '~/components/app/Table.vue'

const AppButton = resolveComponent('AppButton')
const AppIcon = resolveComponent('AppIcon')
const AppDropdown = resolveComponent('AppDropdown')
const AppTag = resolveComponent('AppTag')
const AppTooltip = resolveComponent('AppTooltip')

type StatisticsFullRow = {
  date: string
  title: string
  type: string
  project: string
  tool: string
  clientPhone: string[]
  city: string[]
  link: string
}

const quickRowActions = [
  { label: 'Редактировать', icon: 'edit' },
  { label: 'Дублировать', icon: 'Copy' },
  { label: 'Добавить в папку', icon: 'new-folder' },
  { label: 'Перенести в архив', icon: 'archive' },
]

const columns = ref<TableColumn<StatisticsFullRow>[]>([
  {
    header: 'Дата',
    accessorKey: 'date',
    cell: ({ cell }) => h('div', {
      class: 'threads__table-date-cell',
    }, [
      h('span', {
        class: 'threads__table-date-cell-value',
      }, cell.getValue() as string),
      h('div', {
        class: 'threads__table-date-cell-actions',
      }, quickRowActions.map(action => h(AppTooltip, {
        content: action.label,
      }, {
        default: () => h(AppIcon, {
          class: 'threads__table-date-cell-button',
          name: action.icon,
          size: 16,
        }),
      }))),
    ]),
  },
  {
    header: 'Название',
    accessorKey: 'title',
  },
  {
    header: 'Сценарий',
    accessorKey: 'type',
  },
  {
    header: 'Проект',
    accessorKey: 'project',
    cell: ({ cell }) => h(AppTag, {
      color: 'primary',
      size: 'sm',
      variant: 'soft',
    }, () => cell.getValue()),
  },
  {
    header: 'Инструмент',
    accessorKey: 'tool',
    cell: ({ cell }) => h(AppTag, {
      icon: 'avito',
      color: 'neutral',
      size: 'sm',
      variant: 'soft',
    }, () => cell.getValue()),
  },
  {
    header: 'Телефон клиента',
    accessorKey: 'clientPhone',
    cell: ({ cell }) => {
      const clientPhones = Array.isArray(cell.getValue()) ? cell.getValue() : []
      const primaryClientPhone = clientPhones[0] ?? '-'
      const extraClientPhones = clientPhones.slice(1)
      const extraCount = extraClientPhones.length

      if (extraCount === 0) {
        return primaryClientPhone
      }

      return h('div', {
        class: 'threads__table-extra-cell',
      }, [
        h('span', primaryClientPhone),
        h(AppDropdown, {
          mode: 'hover',
        }, {
          default: () => h(AppTag, {
            color: 'neutral',
            size: 'sm',
            variant: 'soft',
          }, () => `+${extraCount}`),
          content: () => h('div', {
            class: 'threads__table-extra-tooltip',
          }, extraClientPhones.map(clientPhone => h('div', {
            class: 'threads__table-extra-tooltip-item',
          }, clientPhone))),
        }),
      ])
    },
  },
  {
    header: 'Город',
    accessorKey: 'city',
    cell: ({ cell }) => {
      const cities = Array.isArray(cell.getValue()) ? cell.getValue() : []
      const primaryCity = cities[0] ?? '-'
      const extraCities = cities.slice(1)
      const extraCount = extraCities.length

      if (extraCount === 0) {
        return primaryCity
      }

      return h('div', {
        class: 'threads__table-extra-cell',
      }, [
        h('span', primaryCity),
        h(AppDropdown, {
          mode: 'hover',
        }, {
          default: () => h(AppTag, {
            color: 'neutral',
            size: 'sm',
            variant: 'soft',
          }, () => `+${extraCount}`),
          content: () => h('div', {
            class: 'threads__table-extra-tooltip',
          }, extraCities.map(city => h('div', {
            class: 'threads__table-extra-tooltip-item',
          }, city))),
        }),
      ])
    },
  },
  {
    header: 'Ссылка',
    accessorKey: 'link',
    cell: ({ cell }) => h(AppButton, {
      color: 'neutral',
      icon: 'link',
      size: 'xs',
      to: String(cell.getValue()),
      variant: 'link',
    }),
  },
])

const data = ref<StatisticsFullRow[]>([
  {
    date: '03.03.2026',
    title: 'Компьютерная помощь на дому',
    type: 'Компания',
    project: 'Мастер на час',
    tool: 'Авито',
    clientPhone: ['+7 947 • • • 83 45'],
    city: ['-'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: 'Компьютерная помощь, настройка ПК',
    type: 'Частный мастер',
    project: 'Мастер на час',
    tool: 'Лендинг',
    clientPhone: ['+7 921 • • • 39 89'],
    city: ['Москва', 'Жуковский'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51344 - 52. Ремонт техники',
    type: 'Частный мастер',
    project: 'Бытовой ремонт',
    tool: 'Авито',
    clientPhone: ['+7 947 • • • 83 45'],
    city: ['-'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51401 - ЗИП Николай',
    type: 'Частный мастер',
    project: 'Универсальный',
    tool: 'Авито',
    clientPhone: ['+7 921 • • • 39 89'],
    city: ['Самара', 'Тольятти', 'Сызрань', 'Новокуйбышевск'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51478 - 4 ИП Георгий',
    type: 'Частный мастер',
    project: 'Бытовой ремонт',
    tool: 'Лендинг',
    clientPhone: ['+7 931 • • • 67 38', '+7 931 • • • 63 22'],
    city: ['Владивосток'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51480 - 5 ИП Алексеев',
    type: 'Компания',
    project: 'Мастер на час',
    tool: 'Tilda Webhook',
    clientPhone: ['+7 946 • • • 88 67'],
    city: ['Владивосток', 'Артем'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51481 - 9 Компания Домовой',
    type: 'Частный мастер',
    project: 'Бытовой ремонт',
    tool: 'Telegram бот',
    clientPhone: ['-'],
    city: ['Москва'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51482 - 2 ООО АйТи-Сервис',
    type: 'Частный мастер',
    project: 'Мастер на час',
    tool: 'Авито',
    clientPhone: ['+7 921 • • • 39 89'],
    city: ['Екатеринбург'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51483 - 6 ИП Марина',
    type: 'Компания',
    project: 'Бытовой ремонт',
    tool: 'Лендинг',
    clientPhone: ['+7 947 • • • 83 45'],
    city: ['Самара', 'Тольятти'],
    link: 'http://localhost:3000/threads/1',
  },
  {
    date: '03.03.2026',
    title: '51484 - 1 Центр Ремонта',
    type: 'Компания',
    project: 'Универсальный',
    tool: 'Лендинг',
    clientPhone: ['+7 921 • • • 39 89'],
    city: ['Екатеринбург', 'Березовский', 'Верхняя Пышма', 'Арамиль'],
    link: 'http://localhost:3000/threads/1',
  },
])
</script>

<template>
  <div class="threads">
    <div class="threads__header">
      <div class="threads__title">
        Потоки
      </div>
      <ThreadFilterByStatus />
    </div>
    <div class="threads__main">
      <AppCard>
        <template #top>
          <div class="threads__top">
            <ThreadFilter />
            <ThreadActions />
          </div>
        </template>
        <template #content>
          <AppTable
            class="threads__table"
            :columns
            :data
          />
        </template>
        <template #footer>
          <AppPagination
            counter
            total="70"
          />
        </template>
      </AppCard>
    </div>
  </div>
</template>

<style lang="scss">
.threads {
  $this: &;

  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
  }

  &__title {
    @include text(bold, 5xl);
  }

  &__top {
    display: flex;
    gap: $space-4;
    align-items: center;
    justify-content: space-between;

    padding: $space-4;
  }

  &__table {
    min-width: 100%;

    &-extra-cell {
      display: flex;
      gap: $space-2;
      align-items: center;
    }

    &-extra-tooltip {
      display: flex;
      flex-direction: column;
      gap: $space-05;

      &-item {
        white-space: nowrap;
      }
    }

    &-date-cell {
      display: grid;
      align-items: center;
      min-height: 32px;

      &-value,
      &-actions {
        grid-area: 1 / 1;
        transition: $hover-duration-sm;
      }

      &-value {
        .table__row-body:hover & {
          opacity: 0;
          transition: inherit;
        }
      }

      &-actions {
        pointer-events: none;

        display: flex;
        gap: $space-1;
        align-items: center;

        opacity: 0;

        .table__row-body:hover & {
          pointer-events: auto;
          opacity: 1;
          transition: inherit;
        }
      }

      &-button {
        cursor: pointer;
        color: $color-neutral-950;
      }
    }
  }
}
</style>
