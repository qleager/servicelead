<script lang="ts" setup>

</script>

<template>
  <AppCard
    class="offer-single-pricelist"
  >
    <template #top>
      <div class="offer-single-pricelist__top">
        <div class="offer-single-pricelist__top-column">
          <AppTitle
            icon="price"
            title="Прайс - лист"
          />

          <AppButton
            color="neutral"
            icon="arrow_down"
            size="sm"
            trailing-icon
            variant="link"
            @click="console.log('download')"
          >
            Скачать
          </AppButton>
        </div>

        <div class="offer-single-pricelist__top-column">
          <AppInput
            class="offer-single-pricelist__search"
            icon="search"
            placeholder="Начните поиск..."
            reset
            rounded
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="offer-single-pricelist__content">
        <div class="offer-single-pricelist__table">
          table
        </div>
        <HelpWidget class="offer-single-pricelist__help" />
      </div>
    </template>
  </AppCard>
</template>

<style lang="scss">
.offer-single-pricelist {
  $this: &;

  &__top {
    display: flex;
    gap: $space-4;
    justify-content: space-between;
    padding: $space-2 $space-4;

    &-column {
      display: flex;
      gap: $space-6;
      align-items: center;
    }
  }

  &__search {
    min-width: 290px;
  }

  &__content {
    display: flex;
    gap: $space-4;
  }

  &__table {
    flex: 1;
  }

  &__help {
    max-width: 290px;
  }
}
</style>
