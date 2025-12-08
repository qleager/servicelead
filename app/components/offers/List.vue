<script lang="ts" setup>
// Todo: Просто сетка списка офферов

// TODO: Добавить тип item'ов
const model = defineModel<unknown[]>({ required: true })
</script>

<template>
  <div class="offers-list">
    OffersEntry
  </div>
</template>

<style lang="scss">
.offers-list {
  $this: &;
}
</style>