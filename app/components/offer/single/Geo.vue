<script lang="ts" setup>

</script>

<template>
  <div
    class="offer-single-geo"
  >
    <OfferSinglePaneTemplate>
      <template #header>
        <div class="offer-single-geo__header">
          <AppTitle
            icon="geo_24"
            title="Гео"
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
        <AppTabs
          class="offer-single-geo__tabs"
          color="neutral"
          :items="[
            {
              label: 'Все',
            },
            {
              icon: 'triangle-solid',
              label: 'Название',
            },
            {
              icon: 'square-solid',
              label: 'Название',
            },
            {
              icon: 'circle-solid',
              label: 'Название',
            },
          ]"
          size="xs"
        />
        <AppInput
          class="offer-single-geo__search"
          icon="search"
          placeholder="Начните поиск..."
          reset
          rounded
        />
      </template>
      <template #main>
        <div class="offer-single-pricelist__table-wrap">
          table
        </div>
      </template>
      <template #sidebar>
        <HelpWidget class="offer-single-pricelist__help" />
      </template>
    </OfferSinglePaneTemplate>
  </div>
</template>

<style lang="scss">
.offer-single-geo {
  $this: &;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
  }

  &__search {
    min-width: 290px;
  }

  &__content {
    display: flex;
    gap: $space-4;
  }

  &__table {
    &-wrap {
      flex: 1;
    }
  }

  &__help {
    max-width: 290px;
  }
}
</style>
