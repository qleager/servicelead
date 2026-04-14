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
])

const columns = ref<TableColumn<OfferSinglePricelistRow>[]>([
  {
    header: 'Услуга',
    accessorKey: 'service',
  },
  {
    header: () => h('span', { class: 'offer-single-pricelist__align-right' }, 'Компания'),
    accessorKey: 'company',
    cell: ({ cell }) => h('span', { class: 'offer-single-pricelist__align-right' }, formatCurrency(Number(cell.getValue()))),
  },
  {
    header: () => h('span', { class: 'offer-single-pricelist__align-right' }, 'ЧМ'),
    accessorKey: 'pm',
    cell: ({ cell }) => h('span', { class: 'offer-single-pricelist__align-right' }, formatCurrency(Number(cell.getValue()))),
  },
])
</script>

<template>
  <div
    class="offer-single-pricelist"
  >
    <OfferSinglePaneTemplate>
      <template #header>
        <div class="offer-single-pricelist__header">
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
      </template>
      <template #main>
        <div class="offer-single-pricelist__table-wrap">
          <AppTable
            class="offer-single-pricelist__table"
            :columns="columns"
            :data="data"
          />
        </div>
      </template>
      <template #sidebar>
        <HelpWidget class="offer-single-pricelist__help" />
      </template>
    </OfferSinglePaneTemplate>
  </div>
</template>

<style lang="scss">
.offer-single-pricelist {
  $this: &;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
  }

  &__search {
    min-width: 290px;
  }

  &__table {
    width: 100%;

    &-wrap {
      flex: 1;
    }
  }

  &__help {
    max-width: 290px;
  }

  &__align-right {
    display: inline-block;
    width: 100%;
    text-align: right;
  }
}
</style>
