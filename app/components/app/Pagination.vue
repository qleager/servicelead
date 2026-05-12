<script lang="ts" setup>
interface Props {
  /**
   * Number of items per page
   * @defaultValue 10
   */
  itemsPerPage?: number
  /**
   * Whether to show the first, previous, next, and last controls
   * @defaultValue true
   */
  showControls?: boolean
  /**
   * When true, always show first page, last page, and ellipsis
   * @defaultValue false
   */
  showEdges?: boolean
  /**
   * When true, show select with items per page
   * @defaultValue false
   */
  // showCounter?: boolean
  /**
   * Number of sibling should be shown around the current page
   * @defaultValue 2
   */
  siblingCount?: number
  /**
   * Number of items in your list
   * @defaultValue 10
   */
  total: number
}

/**
 * Current Page
 * @defaultValue 1
 */
type Model = number
type PageItem = number | 'ellipsis'

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  showControls: true,
  showEdges: false,
  siblingCount: 2,
})

const model = defineModel<Model>({
  default: 1,
})

const itemsPerPage = computed(() =>
  Math.max(1, props.itemsPerPage),
)

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.total / itemsPerPage.value)),
)

const currentPage = computed(() =>
  Math.min(Math.max(model.value, 1), pageCount.value),
)

const isPreviousDisabled = computed(() => currentPage.value <= 1)
const isNextDisabled = computed(() => currentPage.value >= pageCount.value)

const pages = computed<PageItem[]>(() => {
  if (!props.showEdges) {
    return getRange(1, pageCount.value)
  }

  const siblingCount = Math.max(0, props.siblingCount)
  const edgeItemsCount = 2
  const currentPageItemsCount = 1
  const ellipsisItemsCount = 2
  const visibleItemsCount = siblingCount * 2
    + edgeItemsCount
    + currentPageItemsCount
    + ellipsisItemsCount

  if (pageCount.value <= visibleItemsCount) {
    return getRange(1, pageCount.value)
  }

  const firstPage = 1
  const lastPage = pageCount.value
  const middleItemsCount = visibleItemsCount - 2
  const isNearStart = currentPage.value <= siblingCount + 3
  const isNearEnd = currentPage.value >= lastPage - siblingCount - 2

  if (isNearStart) {
    return [
      ...getRange(firstPage, middleItemsCount),
      'ellipsis',
      lastPage,
    ]
  }

  if (isNearEnd) {
    return [
      firstPage,
      'ellipsis',
      ...getRange(lastPage - middleItemsCount + 1, lastPage),
    ]
  }

  return [
    firstPage,
    'ellipsis',
    ...getRange(currentPage.value - siblingCount, currentPage.value + siblingCount),
    'ellipsis',
    lastPage,
  ]
})

const getRange = (start: number, end: number) => {
  if (start > end) {
    return []
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

const isPageNumber = (page: PageItem): page is number => {
  return typeof page === 'number'
}

const setPage = (page: number) => {
  model.value = Math.min(Math.max(page, 1), pageCount.value)
}

const setPreviousPage = () => {
  setPage(model.value - 1)
}

const setNextPage = () => {
  setPage(model.value + 1)
}

watch(pageCount, () => {
  setPage(model.value)
})

export type { Props as PaginationProps, Model as PaginationModel }
</script>

<template>
  <div class="pagination">
    <AppButton
      v-if="showControls"
      color="neutral"
      :disabled="isPreviousDisabled"
      icon="arrow_left"
      size="xs"
      variant="link"
      @click="setPreviousPage"
    />

    <template
      v-for="(page, index) in pages"
      :key="`${page}-${index}`"
    >
      <AppButton
        v-if="isPageNumber(page)"
        class="pagination__button-page"
        color="neutral"
        size="xs"
        :variant="page === currentPage ? 'solid' : 'link'"
        @click="setPage(page)"
      >
        <span class="pagination__button-page-text">
          {{ page }}
        </span>
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
      v-if="showControls"
      color="neutral"
      :disabled="isNextDisabled"
      icon="arrow_right"
      size="xs"
      variant="link"
      @click="setNextPage"
    />
  </div>
</template>

<style lang="scss">
.pagination {
  $this: &;

  display: flex;
  gap: $space-1;
  align-items: center;

  &__button {
    // cомнительно но пох
    &-page {
      justify-content: center;
      min-width: 32px;
      padding-inline: $space-1 !important;
    }
  }

  &__ellipsis {
    user-select: none;
    min-width: 32px;
    text-align: center;
  }
}
</style>
