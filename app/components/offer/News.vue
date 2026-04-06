<script lang="ts" setup>
</script>

<template>
  <AppSection
    class="offer-news"
    title="Новости по офферу"
  >
    <template #trailingHeader>
      <div class="offer-news__buttons">
        <AppButton
          color="neutral"
          icon="arrow_left"
          size="sm"
          variant="outline"
        />

        <AppButton
          color="neutral"
          icon="arrow_right"
          size="sm"
          variant="outline"
        />
      </div>
    </template>

    <template #content>
      <div class="offer-news__list">
        <NewsEntry
          v-for="i in 4"
          :key="i"
          class="offer-news__item"
        />
      </div>
    </template>
  </AppSection>
</template>

<style lang="scss">
.offer-news {
  $this: &;

  &__buttons {
    display: flex;
    gap: $space-3;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-4;
  }

  &__item {
    border-radius: $space-6;
    background: white;
  }
}
</style>
