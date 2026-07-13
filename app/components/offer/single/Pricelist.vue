<script lang="ts" setup>
import type { TableColumn } from '~/components/app/Table.vue'

type OfferSinglePricelistRow = {
  service: string
  company: number
  pm: number
}

const data = ref<OfferSinglePricelistRow[]>([
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: ' Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
  {
    service: 'Установка Windows и очистка компьютера от вирусов',
    company: 1000,
    pm: 1000,
  },
])

const columns = ref<TableColumn<OfferSinglePricelistRow>[]>([
  {
    header: 'Услуга',
    accessorKey: 'service',
  },
  {
    header: () => h('span', { class: 'offer-single-pricelist__align-right' }, 'Компания'),
    accessorKey: 'company',
    meta: {
      align: 'right',
    },
    size: 105,
    cell: ({ cell }) => h('span', { class: 'offer-single-pricelist__align-right' }, formatCurrency(Number(cell.getValue()))),
  },
  {
    header: () => h('span', { class: 'offer-single-pricelist__align-right' }, 'ЧМ'),
    accessorKey: 'pm',
    meta: {
      align: 'right',
    },
    size: 105,
    cell: ({ cell }) => h('span', { class: 'offer-single-pricelist__align-right' }, formatCurrency(Number(cell.getValue()))),
  },
])
</script>

<template>
  <OfferSinglePaneTemplate class="offer-single-pricelist">
    <template #header>
      <div class="offer-single-pricelist__header">
        <div class="offer-single-pricelist__header-title">
          <AppTitle
            icon="price"
            title="Прайс - лист"
          />

          <AppButton
            color="neutral"
            icon="arrow_down"
            size="sm"
            trailing-icon
            variant="link"
            @click="console.log('download')"
          >
            Скачать
          </AppButton>
        </div>
        <AppInput
          class="offer-single-pricelist__search"
          icon="search"
          placeholder="Начните поиск..."
          reset
          rounded
        />
      </div>
    </template>
    <template #content>
      <AppTable
        class="offer-single-pricelist__table"
        :columns="columns"
        :data="data"
      />
    </template>
    <template #sidebar>
      <HelpWidget />
    </template>
  </OfferSinglePaneTemplate>
</template>

<style lang="scss">
.offer-single-pricelist {
  $this: &;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
    justify-content: space-between;

    &-title {
      display: flex;
      gap: $space-6;
      align-items: center;
    }
  }

  &__search {
    min-width: 290px;
  }

  &__table {
    width: 100%;
  }
}
</style>
