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
    // @ts-expect-error: ⛔️ очень не безопастно, для простого кейса ок
    size: '100%',
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
  <div
    class="offer-single-pricelist"
  >
    <div class="offer-single-pricelist__top">
      <div class="offer-single-pricelist__top-column">
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

      <div class="offer-single-pricelist__top-column">
        <AppInput
          class="offer-single-pricelist__search"
          icon="search"
          placeholder="Начните поиск..."
          reset
          rounded
        />
      </div>
    </div>
    <div class="offer-single-pricelist__content">
      <div class="offer-single-pricelist__table-wrap">
        <AppTable
          class="offer-single-pricelist__table"
          :columns="columns"
          :data="data"
        />
      </div>
      <HelpWidget class="offer-single-pricelist__help" />
    </div>
  </div>
</template>

<style lang="scss">
.offer-single-pricelist {
  $this: &;

  &__top {
    display: flex;
    gap: $space-4;
    justify-content: space-between;

    &-column {
      display: flex;
      gap: $space-6;
      align-items: center;
    }
  }

  &__search {
    min-width: 290px;
  }

  &__content {
    display: flex;
    gap: $space-4;
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
}
</style>
