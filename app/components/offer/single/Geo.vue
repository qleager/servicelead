<script lang="ts" setup>

</script>

<template>
  <AppCard
    class="offer-single-geo"
  >
    <template #top>
      <div class="offer-single-geo__top">
        <div class="offer-single-geo__top-column">
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
        <div class="offer-single-geo__top-column">
          <AppTabs
            class="offer-single-geo__tabs"
            color="primary"
            :items="[
              {
                label: 'Все',
              },
              {
                icon: 'city_triangle',
                label: 'Название',
                trailingIcon: true,
              },
              {
                icon: 'city_square',
                label: 'Название',
                trailingIcon: true,
              },
              {
                icon: 'city_circle',
                label: 'Название',
                trailingIcon: true,
              },
            ]"
          />
        </div>
        <div class="offer-single-geo__top-column">
          <AppInput
            class="offer-single-geo__search"
            icon="search"
            placeholder="Начните поиск..."
            reset
            rounded
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="offer-single-geo__content">
        <div class="offer-single-geo__table">
          table
        </div>
        <AppCard
          class="offer-single-geo__help"
          color="neutral"
          description="Создайте тикет или задайте его напрямую своему менеджеру"
          title="Нужна помощь?"
        >
          <template #footer>
            <div class="offer-single-geo__help-footer">
              <AppButton color="white">
                Менеджер
              </AppButton>
              <AppButton color="white">
                Тикет
              </AppButton>
            </div>
          </template>
        </AppCard>
      </div>
    </template>
  </AppCard>
</template>

<style lang="scss">
.offer-single-geo {
  $this: &;

  &__top {
    display: flex;
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

    &-footer {
      display: flex;
      gap: $space-5;
    }
  }
}
</style>
