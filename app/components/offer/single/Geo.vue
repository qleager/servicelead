<script lang="ts" setup>

</script>

<template>
  <OfferSinglePaneTemplate
    class="offer-single-geo"
  >
    <template #header>
      <div class="offer-single-geo__header">
        <div class="offer-single-geo__header-title">
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
      </div>
    </template>
    <template #content>
      <div class="offer-single-pricelist__table">
        table
      </div>
    </template>
    <template #sidebar>
      <HelpWidget class="offer-single-pricelist__help" />
    </template>
  </OfferSinglePaneTemplate>
</template>

<style lang="scss">
.offer-single-geo {
  $this: &;

  &__header {
    display: flex;
    gap: $space-6;
    align-items: center;
    justify-content: space-between;

    &-title{
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
    width: 100%;
  }
}
</style>
