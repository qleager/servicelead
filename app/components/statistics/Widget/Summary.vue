<script lang="ts" setup>
interface Props {
  isFilterVisible?: boolean
}

defineProps<Props>()

const filterPeriod = ref('День')
</script>

<template>
  <AppWidget
    color="neutral"
    icon="statistic"
    title="Сводка"
  >
    <template #trailingHeader>
      <AppSelect
        v-if="isFilterVisible"
        v-model="filterPeriod"
        class="statistics-widget-summary__select"
        :items="['День', 'Неделя', 'Месяц']"
        rounded
        size="xs"
      />

      <AppButton
        color="neutral"
        size="sm"
        variant="link"
        @click="navigateTo('/summary')"
      >
        Подробнее
      </AppButton>
    </template>
    <template #content>
      table
    </template>
  </AppWidget>
</template>

<style lang="scss">
.statistics-widget-summary {
  $this: &;

  &__select {
    align-self: center;
    width: fit-content;
    margin-right: auto;
  }
}
</style>
