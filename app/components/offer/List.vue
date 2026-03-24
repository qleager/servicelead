<script lang="ts" setup>
</script>

<template>
  <div class="offer-list">
    <OfferEntry
      v-for="i in 4"
      :key="i"
    />
  </div>
</template>

<style lang="scss">
.offer-list {
  $this: &;

  display: flex;
  gap: $space-4;
  justify-content: space-between;
  width: 100%;
}
</style>
