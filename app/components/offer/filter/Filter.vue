<script lang="ts" setup>
import type { TabsItem } from '@components/app/Tabs.vue'

interface Emits {
  update: []
}

type Model = unknown

const emits = defineEmits<Emits>()

const model = defineModel<Model>({
  required: true,
})

const tabsItems = ref<TabsItem[]>([
  { label: 'Все' },
  { label: 'Действует акция' },
  { label: 'Топ офферы' },
  { label: 'Избранные' },
  { label: 'Новые' },
])

const resetItem = (item: unknown) => {
  emits('update')
}
</script>

<template>
  <div class="offer-filter">
    <div class="offer-filter__row">
      <AppTabs
        class="offer-filter__tabs"
        color="white"
        :items="tabsItems"
        variant="outline"
      >
        <template #leading="{ index }">
          <NuxtImg
            v-if="index == 1"
            class="offer-filter__tabs-item-image"
            src="/images/top-fire.svg"
          />
        </template>
      </AppTabs>

      <AppInput
        class="offer-filter__search"
        icon="search"
        placeholder="Начните поиск..."
        reset
        rounded
      />
    </div>

    <div
      v-if="true"
      class="offer-filter__selected"
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
.offer-filter {
  width: 100%;

  &__row {
    display: flex;
    gap: $space-2;
    margin-bottom: $space-3;
  }

  &__tabs {
    margin-right: auto;

    &-item {
      &-image {
        width: 24px;
        height: 24px;
        margin-inline: -$space-2;
      }
    }
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
