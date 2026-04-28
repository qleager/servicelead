<script lang="ts" setup>
interface Props {
  counter?: boolean
  itemsPerPage?: ItemsPerPage
  showEdges?: boolean
  total?: number
}

interface Emits {
  'update:itemsPerPage': [itemsPerPage: ItemsPerPage]
}

type Model = number

type PageItem = number | 'ellipsis'
type ItemsPerPage = 10 | 30 | 80 | 100

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  itemsPerPage: 10,
  showEdges: true,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: 1 })

const itemsPerPageOptions = [
  { label: 'Показывать 10', value: 10 },
  { label: 'Показывать 30', value: 30 },
  { label: 'Показывать 80', value: 80 },
  { label: 'Показывать 100', value: 100 },
]

const totalPages = computed(() => {
  const perPage = normalizeItemsPerPage(props.itemsPerPage)

  return Math.max(1, Math.ceil(props.total / perPage))
})

const counterModel = computed<ItemsPerPage>({
  get: () => normalizeItemsPerPage(props.itemsPerPage),
  set: value => onItemsPerPageUpdate(value),
})

const pageItems = computed<PageItem[]>(() => {
  if (totalPages.value <= 1) {
    return [1]
  }

  if (!props.showEdges) {
    return getRange(1, totalPages.value)
  }

  const pages = new Set<number>([
    1,
    totalPages.value,
    model.value - 1,
    model.value,
    model.value + 1,
  ])

  if (model.value <= 2) {
    pages.add(3)
  }

  if (model.value >= totalPages.value - 1) {
    pages.add(totalPages.value - 2)
  }

  const normalized = [...pages]
    .filter(page => page >= 1 && page <= totalPages.value)
    .sort((left, right) => left - right)

  return normalized.reduce<PageItem[]>((result, page, index) => {
    const previousPage = normalized[index - 1]

    if (previousPage && page - previousPage > 1) {
      result.push('ellipsis')
    }

    result.push(page)

    return result
  }, [])
})

const getRange = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

const normalizeItemsPerPage = (value: number): ItemsPerPage => {
  if ([10, 30, 80, 100].includes(value)) {
    return value as ItemsPerPage
  }

  return 10
}

const isPageItemNumber = (item: PageItem): item is number => {
  return typeof item === 'number'
}

const isPageCurrent = (page: number) => {
  return page === model.value
}

const onItemsPerPageUpdate = (value: number) => {
  const itemsPerPage = normalizeItemsPerPage(value)

  emits('update:itemsPerPage', itemsPerPage)
  model.value = 1
}

const onPageClick = (page: number) => {
  if (!isPageCurrent(page)) {
    model.value = page
  }
}

const onPreviousClick = () => {
  model.value = model.value - 1
}

const onNextClick = () => {
  model.value = model.value + 1
}

export type {
  Props as PaginationProps,
  Emits as PaginationEmits,
  Model as PaginationModel,
}
</script>

<template>
  <div class="pagination">
    <AppSelect
      v-if="counter"
      v-model="counterModel"
      :items="itemsPerPageOptions"
      placeholder="Показывать 10"
      size="xs"
    >
      <template #value="{ model: selectedItemsPerPage }">
        <div class="pagination__counter-value">
          Показывать {{ selectedItemsPerPage }}
        </div>
      </template>
    </AppSelect>

    <div class="pagination__list">
      <AppButton
        aria-label="Предыдущая страница"
        class="pagination__control pagination__control-arrow"
        color="neutral"
        :disabled="model <= 1"
        icon="arrow_left"
        rounded
        size="xs"
        variant="outline"
        @click="onPreviousClick"
      />

      <template
        v-for="(item, index) in pageItems"
        :key="`${item}-${index}`"
      >
        <AppButton
          v-if="isPageItemNumber(item)"
          class="pagination__control"
          color="neutral"
          rounded
          size="xs"
          type="button"
          :variant="isPageCurrent(item) ? 'solid' : 'outline'"
          @click="onPageClick(item)"
        >
          {{ item }}
        </AppButton>

        <span
          v-else
          aria-hidden="true"
          class="pagination__ellipsis"
        >
          ...
        </span>
      </template>

      <AppButton
        aria-label="Следующая страница"
        class="pagination__control pagination__control-arrow"
        color="neutral"
        :disabled="model >= totalPages"
        icon="arrow_right"
        rounded
        size="xs"
        variant="outline"
        @click="onNextClick"
      />
    </div>
  </div>
</template>

<style lang="scss">
.pagination {
  $this: &;

  display: flex;
  flex-wrap: wrap;
  gap: $space-4;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  &__list {
    overflow-x: auto;
    display: flex;
    flex: 1 1 auto;
    gap: $space-2;
    justify-content: flex-end;

    min-width: 0;
  }

  &__ellipsis {
    pointer-events: none;
    user-select: none;
    min-width: 32px;
    text-align: center;
  }
}
</style>
