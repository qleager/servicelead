<script lang="ts" setup>
interface Props {
  filters: {
    region: string[]
    city: string[]
    tools: string[]
    scenarios: string[]
  }
}

interface Emits {
  (e: 'update', filters: typeof props.filters): void
}

const props = defineProps<Props>()

const model = defineModel<boolean>()
const emits = defineEmits<Emits>()

const mockItems = [
  'Вариант 1',
  'Вариант 2',
  'Вариант 3',
  'Вариант 4',
]

const localFilters = reactive({
  region: [...props.filters.region],
  city: [...props.filters.city],
  tools: [...props.filters.tools],
  scenarios: [...props.filters.scenarios],
})

const isChanged = ref(false)

watch(localFilters, () => {
  isChanged.value = true
}, { deep: true })

watch(
  () => props.filters,
  (newFilters) => {
    Object.assign(localFilters, newFilters)
  },
  { deep: true },
)

const resetFilters = () => {
  localFilters.region = []
  localFilters.city = []
  localFilters.tools = []
  localFilters.scenarios = []

  emits('update', { ...localFilters })
  model.value = false
}

const applyFilters = () => {
  if (!isChanged.value) return
  emits('update', { ...localFilters })
  model.value = false
}
</script>

<template>
  <AppSlideover
    v-model="model"
    title="Фильтры"
    icon="filter"
  >
    <AppSelect
      v-model="localFilters.region"
      :items="mockItems"
      multiple
      placeholder="Регион"
      placeholder-mode="float"
      counter="list"
      search
      reset
    />
    <AppSelect
      v-model="localFilters.city"
      :items="mockItems"
      multiple
      placeholder="Город"
      placeholder-mode="float"
      counter="list"
      search
      reset
    />
    <AppSelect
      v-model="localFilters.tools"
      :items="mockItems"
      multiple
      placeholder="Инструменты"
      placeholder-mode="float"
      counter="list"
      search
      reset
    />
    <AppSelect
      v-model="localFilters.scenarios"
      :items="mockItems"
      multiple
      placeholder="Сценарии"
      placeholder-mode="float"
      counter="list"
      search
      reset
    />

    <template #footer>
      <AppButton
        variant="nofilled"
        color="neutral"
        @click="resetFilters"
      >
        Сбросить все
      </AppButton>
      <AppButton
        :disabled="!isChanged"
        @click="applyFilters"
      >
        Применить
      </AppButton>
    </template>
  </AppSlideover>
</template>
