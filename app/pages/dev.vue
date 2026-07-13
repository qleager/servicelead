<script lang="ts" setup>
import type { TableColumn } from '~/components/app/Table.vue'

const initSettings = {
  buttonVariant: 'solid',
  tagVariant: 'solid',
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

const data = ref<PaymentRow[]> ([
  { id: '4600', date: '2024-03-11', status: 'paid', email: 'a@a.com', amount: 594 },
  { id: '4599', date: '2024-03-10', status: 'failed', email: 'b@b.com', amount: 276 },
  { id: '4598', date: '2024-03-09', status: 'refunded', email: 'c@c.com', amount: 315 },
  { id: '4597', date: '2024-03-08', status: 'paid', email: 'd@d.com', amount: 529 },
  { id: '4596', date: '2024-03-07', status: 'paid', email: 'e@e.com', amount: 639 },
])

const columns: TableColumn<PaymentRow>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'amount', header: 'Amount' },
]
let count = 0
const increaseСount = () => {
  count = count + 1
  if (data.value[0]) data.value[0].status = 'paid' + count
}
const addRow = () => {
  data.value.push({ id: '4596', date: '2024-03-07', status: 'NEW ROW!', email: 'e@e.com', amount: 639 })
}
</script>

<template>
  <section class="offers-page">
    <AppTable
      :columns="columns"
      :data="data"
    />
    <AppButton @click="increaseСount">
      count + 1
    </AppButton>
    <AppButton @click="addRow">
      addRow
    </AppButton>

    <div
      class="elements"
      :keys="[settings.size, settings.color, settings.buttonVariant, settings.tagVariant]"
    >
      <AppButton
        :color="settings.color"
        :icon="settings.icon"
        :rounded="settings.rounded"
        :size="settings.size"
        :variant="settings.buttonVariant"
      >
        Button
      </AppButton>
      <AppTag
        actionable
        closable
        :color="settings.color"
        :icon="settings.icon"
        :rounded="settings.rounded"
        :size="settings.size"
        :variant="settings.tagVariant"
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
        caption="Вариант компонентов"
        title="Variant"
      >
        <AppSelect
          v-model="settings.buttonVariant"
          :items="['solid', 'outline', 'link']"
          size="sm"
        />
      </AppLabel>
      <AppLabel
        caption="Вариант AppTag"
        title="Tag Variant"
      >
        <AppSelect
          v-model="settings.tagVariant"
          :items="['solid', 'outline', 'nofilled']"
          size="sm"
        />
      </AppLabel>
      <AppLabel
        caption="Размер компонентов"
        title="Size"
      >
        <AppSelect
          v-model="settings.size"
          :items="['xs', 'sm', 'md', 'lg']"
          size="sm"
        />
      </AppLabel>
      <AppLabel
        caption="Цвет компонентов"
        title="Color"
      >
        <AppSelect
          v-model="settings.color"
          :items="['white', 'neutral', 'primary']"
          size="sm"
        />
      </AppLabel>
      <AppLabel
        caption="Углы компонентов"
        title="Rounded"
      >
        <AppSelect
          v-model="settings.rounded"
          :items="[{ label: 'Да', value: true }, { label: 'Нет', value: false }]"
          size="sm"
        />
      </AppLabel>
      <AppLabel
        caption="Иконки компонентов"
        title="Icon"
      >
        <AppSelect
          v-model="settings.icon"
          :items="['notice', 'domain', 'filter']"
          size="sm"
        />
      </AppLabel>
      <div class="settings-footer">
        <AppButton
          color="white"
          size="sm"
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

    width: 100%;
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
