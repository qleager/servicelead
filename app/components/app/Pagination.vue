<script lang="ts" setup>
import type { SelectOption } from './select/Select.vue'

type Slots = Record<string, never>

type PageItem = number | 'ellipsis'
type ItemsPerPage = 10 | 30 | 80 | 100

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

const DEFAULT_PAGE = 1
const DEFAULT_ITEMS_PER_PAGE: ItemsPerPage = 10
const ELLIPSIS: PageItem = 'ellipsis'

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  counter: false,
  showEdges: true,
})

const emits = defineEmits<Emits>()

const model = defineModel<Model>({ default: DEFAULT_PAGE })

defineSlots<Slots>()

const itemsPerPageOptions = computed<SelectOption[]>(() => [
  { label: 'Показывать 10 строк', value: 10 },
  { label: 'Показывать 30 строк', value: 30 },
  { label: 'Показывать 80 строк', value: 80 },
  { label: 'Показывать 100 строк', value: 100 },
])

const totalPages = computed(() => {
  const perPage = normalizeItemsPerPage(props.itemsPerPage)

  return Math.max(DEFAULT_PAGE, Math.ceil(props.total / perPage))
})

const currentPage = computed(() => clampPage(model.value))

const counterModel = computed<ItemsPerPage>({
  get: () => normalizeItemsPerPage(props.itemsPerPage),
  set: value => onItemsPerPageUpdate(value),
})

const isPreviousButtonVisible = computed(() => currentPage.value > DEFAULT_PAGE)

const isNextButtonVisible = computed(() => currentPage.value < totalPages.value)

const pageItems = computed<PageItem[]>(() => {
  if (totalPages.value <= 1) {
    return [DEFAULT_PAGE]
  }

  if (!props.showEdges) {
    return getRange(DEFAULT_PAGE, totalPages.value)
  }

  const pages = new Set<number>([
    DEFAULT_PAGE,
    totalPages.value,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
  ])

  if (currentPage.value <= 2) {
    pages.add(3)
  }

  if (currentPage.value >= totalPages.value - 1) {
    pages.add(totalPages.value - 2)
  }

  const normalized = [...pages]
    .filter(page => page >= DEFAULT_PAGE && page <= totalPages.value)
    .sort((left, right) => left - right)

  return normalized.reduce<PageItem[]>((result, page, index) => {
    const previousPage = normalized[index - 1]

    if (previousPage && page - previousPage > 1) {
      result.push(ELLIPSIS)
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

  return DEFAULT_ITEMS_PER_PAGE
}

const clampPage = (value: number) => {
  return Math.min(Math.max(value || DEFAULT_PAGE, DEFAULT_PAGE), totalPages.value)
}

const isPageItemNumber = (item: PageItem): item is number => {
  return typeof item === 'number'
}

const isPageCurrent = (page: number) => {
  return page === currentPage.value
}

const syncModel = () => {
  const page = clampPage(model.value)

  if (model.value !== page) {
    model.value = page
  }
}

watch([() => props.total, () => props.itemsPerPage], () => {
  syncModel()
}, { immediate: true })

const onItemsPerPageUpdate = (value: number) => {
  const itemsPerPage = normalizeItemsPerPage(value)

  emits('update:itemsPerPage', itemsPerPage)
  model.value = DEFAULT_PAGE
}

const onPageClick = (page: number) => {
  if (!isPageCurrent(page)) {
    model.value = page
  }
}

const onPreviousClick = () => {
  model.value = currentPage.value - 1
}

const onNextClick = () => {
  model.value = currentPage.value + 1
}

export type {
  Props as PaginationProps,
  Emits as PaginationEmits,
  Model as PaginationModel,
  Slots as PaginationSlots,
}
</script>

<template>
  <div class="pagination">
    <AppSelect
      v-if="counter"
      v-model="counterModel"
      :items="itemsPerPageOptions"
      placeholder="Показывать 10 строк"
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
        v-if="isPreviousButtonVisible"
        aria-label="Предыдущая страница"
        class="pagination__control pagination__control-arrow"
        color="neutral"
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
        v-if="isNextButtonVisible"
        aria-label="Следующая страница"
        class="pagination__control pagination__control-arrow"
        color="neutral"
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
