<script lang="ts" setup>
</script>

<template>
  <div class="offer-list">
    <OfferEntry
      v-for="i in 11"
      :key="i"
    />
  </div>
</template>

<style lang="scss">
.offer-list {
  $this: &;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-8 $space-4;
}
</style>
