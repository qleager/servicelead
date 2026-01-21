<script lang="ts" setup>
import type { TabsItem } from '~/components/app/Tabs.vue'

interface Emits {
  update: []
}

type Model = unknown

const emits = defineEmits<Emits>()

const model = defineModel<Model>({
  required: true,
})

const tabsItems = ref<TabsItem[]>([
  { label: 'Все', value: 1 },
  { label: 'Действует акция', value: 2 },
  { label: 'Топ офферы', value: 3 },
  { label: 'Избранные', value: 4 },
  { label: 'Новые', value: 5 },
])

const resetItem = (item: unknown) => {
  emits('update')
}
</script>

<template>
  <div class="offers-filter">
    <div class="offers-filter__row">
      <AppTabs
        class="offers-filter__tabs"
        :items="tabsItems"
        variant="lined"
        color="neutral"
      />

      <AppInput
        class="offers-filter__search"
        icon="search"
        placeholder="Начните поиск..."
        rounded
        reset
      />

      <OffersFilterSlideover />
    </div>

    <div
      v-if="true"
      class="offers-filter__selected"
    >
      <AppTag
        v-for="(value, index) in 5"
        :key="index"
        closable
        color="white"
        @close="() => resetItem(value)"
      >
        {{ value }}
      </AppTag>
    </div>
  </div>
</template>

<style lang="scss">
.offers-filter {
  width: 100%;

  &__row {
    display: flex;
    gap: $space-2;
    margin-bottom: $space-3;
  }

  &__tabs {
    margin-right: auto;
  }

  &__search {
    overflow: hidden;
    width: 48px;

    // реализация-исключение, хук, так как input не root элемент (выгляит хуево, это да)
    // фокус
    &:focus-within,
    // в input что то введнено
    &:not(:has(:placeholder-shown)) {
      width: 250px;
    }
  }

  &__selected {
    display: flex;
    gap: $space-2;
    order: 1;
    width: 100px;
  }
}
</style>
