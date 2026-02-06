<script lang="ts" setup>
import type { TableColumn } from '~/components/app/Table.vue'

const initSettings = {
  variant: 'filled',
  size: 'sm',
  color: 'neutral',
  rounded: true,
  icon: 'domain',
}

const settings = ref(initSettings)

const reset = () => settings.value = { ...initSettings }

type PaymentRow = {
  id: string
  date: string
  status: string
  email: string
  amount: number
}

const data: PaymentRow[] = [
  { id: '4600', date: '2024-03-11', status: 'paid', email: 'a@a.com', amount: 594 },
  { id: '4599', date: '2024-03-10', status: 'failed', email: 'b@b.com', amount: 276 },
  { id: '4598', date: '2024-03-09', status: 'refunded', email: 'c@c.com', amount: 315 },
  { id: '4597', date: '2024-03-08', status: 'paid', email: 'd@d.com', amount: 529 },
  { id: '4596', date: '2024-03-07', status: 'paid', email: 'e@e.com', amount: 639 },
]

const columns: TableColumn<PaymentRow>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'amount', header: 'Amount' },
]
</script>

<template>
  <section class="offers-page">
    <AppTable
      :columns="columns"
      :data="data"
    />
    <div
      :keys="[settings.size, settings.color, settings.variant]"
      class="elements"
    >
      <AppButton
        :variant="settings.variant"
        :size="settings.size"
        :color="settings.color"
        :rounded="settings.rounded"
        :icon="settings.icon"
      >
        Button
      </AppButton>
      <AppTag
        :variant="settings.variant"
        :size="settings.size"
        :color="settings.color"
        :rounded="settings.rounded"
        :icon="settings.icon"
        closable
        actionable
      >
        Badge
      </AppTag>
      <!-- <AppSelect
        :key="`select-${settings.color} select-${settings.size} ${settings.variant} ${settings.rounded} ${settings.icon}`"
        :variant="settings.variant"
        :size="settings.size"
        :color="settings.color"
        :rounded="settings.rounded"
        :icon="settings.icon"
        :items="['Paul', 'Maria', 'Nancy', 'Huenci']"
        :multiple="false"
        :model-value="'Paul'"
        placeholder="First Name"
      /> -->
      <!-- <AppInput
        :variant="settings.variant"
        :size="settings.size"
        :color="settings.color"
        :rounded="settings.rounded"
        :icon="settings.icon"
      /> -->
      <!-- <AppTabs
        :items="[{ label: 'Вкладка 1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }]"
        :size="settings.size"
        :variant="settings.variant"
        :color="settings.color"
        :rounded="settings.rounded"
      /> -->
    </div>
    <div class="settings">
      <AppLabel
        title="Variant"
        caption="Вариант компонентов"
      >
        <AppSelect
          v-model="settings.variant"
          size="sm"
          :items="['filled', 'lined', 'nofilled']"
        />
      </AppLabel>
      <AppLabel
        title="Size"
        caption="Размер компонентов"
      >
        <AppSelect
          v-model="settings.size"
          size="sm"
          :items="['xs', 'sm', 'md', 'lg']"
        />
      </AppLabel>
      <AppLabel
        title="Color"
        caption="Цвет компонентов"
      >
        <AppSelect
          v-model="settings.color"
          size="sm"
          :items="['white', 'neutral', 'primary']"
        />
      </AppLabel>
      <AppLabel
        title="Rounded"
        caption="Углы компонентов"
      >
        <AppSelect
          v-model="settings.rounded"
          size="sm"
          :items="[{ label: 'Да', value: true }, { label: 'Нет', value: false }]"
        />
      </AppLabel>
      <AppLabel
        title="Icon"
        caption="Иконки компонентов"
      >
        <AppSelect
          v-model="settings.icon"
          size="sm"
          :items="['notice', 'domain', 'filter']"
        />
      </AppLabel>
      <div class="settings-footer">
        <AppButton
          size="sm"
          color="white"
          @click="reset"
        >
          Сбросить
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.offers-page {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  align-items: center;
  justify-content: center;

  height: 100%;

  .elements {
    position: relative;
    display: flex;
    gap: $space-2;
    align-items: center;

    &::before {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 9;
      left: 50%;
      transform: translateX(-50%);

      width: 120%;
      height: 1px;

      background-color: rgba($color-green-500, 20%);
    }
  }

  .settings {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    align-self: flex-end;

    width: 100%;;
    padding: $space-8;
    border-radius: 20px;

    background-color: $color-neutral-100;

    &-footer {
      display: flex;
      justify-content: end;
      width: 100%;
      padding-top: $space-4;
    }
  }
}
</style>
