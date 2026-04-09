<script setup lang="ts">
import { h } from 'vue'
import type { TableColumn } from '~/components/app/Table.vue'

const AppButton = resolveComponent('AppButton')
const AppDropdown = resolveComponent('AppDropdown')
const AppTag = resolveComponent('AppTag')

type StatisticsFullRow = {
  date: string
  title: string
  type: string
  project: string
  tool: string
  clientPhone: string
  city: string[]
  link: string
}

const columns = ref<TableColumn<StatisticsFullRow>[]>([
  {
    header: 'Дата',
    accessorKey: 'date',
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
    }, () => String(cell.getValue() ?? '')),
  },
  {
    header: 'Инструмент',
    accessorKey: 'tool',
    cell: ({ cell }) => h(AppTag, {
      color: 'neutral',
      size: 'sm',
      variant: 'soft',
    }, () => String(cell.getValue() ?? '')),
  },
  {
    header: 'Телефон клиента',
    accessorKey: 'clientPhone',
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
        class: 'threads__city-cell',
      }, [
        h('span', primaryCity),
        h(AppDropdown, {
          mode: 'click',
        }, {
          default: () => h(AppTag, {
            color: 'neutral',
            size: 'sm',
            variant: 'soft',
          }, () => `+${extraCount}`),
          content: () => h('div', {
            class: 'threads__city-tooltip',
          }, extraCities.map(city => h('div', {
            class: 'threads__city-tooltip-item',
          }, city))),
        }),
      ])
    },
  },
  {
    header: 'Ссылка',
    accessorKey: 'link',
    cell: ({ cell }) => cell.getValue()
      ? h(AppButton, {
          color: 'neutral',
          icon: 'link',
          size: 'xs',
          to: String(cell.getValue()),
          variant: 'link',
        })
      : null,
  },
])

const data = ref<StatisticsFullRow[]>([
  {
    date: '03.03.2026',
    title: 'Компьютерная помощь на дому',
    type: 'Компания',
    project: 'Мастер на час',
    tool: 'Авито',
    clientPhone: '+7 947 • • • 83 45',
    city: ['-'],
    link: 'https://thread.app/51476',
  },
  {
    date: '03.03.2026',
    title: 'Компьютерная помощь, настройка ПК',
    type: 'Частный мастер',
    project: 'Мастер на час',
    tool: 'Лендинг',
    clientPhone: '+7 921 • • • 39 89',
    city: ['Москва', 'Жуковский'],
    link: 'https://thread.app/51477',
  },
  {
    date: '03.03.2026',
    title: '51344 - 52. Ремонт техники',
    type: 'Частный мастер',
    project: 'Бытовой ремонт',
    tool: 'Авито',
    clientPhone: '+7 947 • • • 83 45',
    city: ['-'],
    link: 'https://thread.app/51344',
  },
  {
    date: '03.03.2026',
    title: '51401 - ЗИП Николай',
    type: 'Частный мастер',
    project: 'Универсальный',
    tool: 'Авито',
    clientPhone: '+7 921 • • • 39 89',
    city: ['Самара', 'Тольятти', 'Сызрань', 'Новокуйбышевск'],
    link: 'https://thread.app/51401',
  },
  {
    date: '03.03.2026',
    title: '51478 - 4 ИП Георгий',
    type: 'Частный мастер',
    project: 'Бытовой ремонт',
    tool: 'Лендинг',
    clientPhone: '+7 931 • • • 67 38',
    city: ['Владивосток'],
    link: 'https://thread.app/51478',
  },
  {
    date: '03.03.2026',
    title: '51480 - 5 ИП Алексеев',
    type: 'Компания',
    project: 'Мастер на час',
    tool: 'Tilda Webhook',
    clientPhone: '+7 946 • • • 88 67',
    city: ['Владивосток', 'Артем'],
    link: 'https://thread.app/51480',
  },
  {
    date: '03.03.2026',
    title: '51481 - 9 Компания Домовой',
    type: 'Частный мастер',
    project: 'Бытовой ремонт',
    tool: 'Telegram бот',
    clientPhone: '-',
    city: ['Москва'],
    link: 'https://thread.app/51481',
  },
  {
    date: '03.03.2026',
    title: '51482 - 2 ООО АйТи-Сервис',
    type: 'Частный мастер',
    project: 'Мастер на час',
    tool: 'Авито',
    clientPhone: '+7 921 • • • 39 89',
    city: ['Екатеринбург'],
    link: 'https://thread.app/51482',
  },
  {
    date: '03.03.2026',
    title: '51483 - 6 ИП Марина',
    type: 'Компания',
    project: 'Бытовой ремонт',
    tool: 'Лендинг',
    clientPhone: '+7 947 • • • 83 45',
    city: ['Самара', 'Тольятти'],
    link: 'https://thread.app/51483',
  },
  {
    date: '03.03.2026',
    title: '51484 - 1 Центр Ремонта',
    type: 'Компания',
    project: 'Универсальный',
    tool: 'Лендинг',
    clientPhone: '+7 921 • • • 39 89',
    city: ['Екатеринбург', 'Березовский', 'Верхняя Пышма', 'Арамиль'],
    link: 'https://thread.app/51484',
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
            <ThreadActions />
            <ThreadFilter />
          </div>
        </template>
        <template #content>
          <AppTable
            class="statistics-full__table"
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

  &__city-cell {
    display: flex;
    gap: $space-1;
    align-items: center;
  }

  &__city-tooltip {
    display: flex;
    flex-direction: column;
    gap: $space-05;
  }

  &__city-tooltip-item {
    white-space: nowrap;
  }
}
</style>
