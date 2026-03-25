<script lang="ts" setup>
</script>

<template>
  <AppSlideover
    class="offer-filter-slideover"
    description="Чтобы отфильтровать офферы"
    icon="filter"
    title="Фильтры"
  >
    <AppButton
      color="neutral"
      icon="filter"
      variant="lined"
    >
      <AppTag
        color="primary"
        size="sm"
      >
        5
      </AppTag>
    </AppButton>

    <template #content>
      <div class="offer-filter-slideover__content">
        <div class="offer-filter-slideover__switchers">
          <label class="offer-filter-slideover__switchers-row">
            <div class="offer-filter-slideover__switchers-left">
              <NuxtImg
                class="offer-filter-slideover__switchers-row-icon"
                :src="'/images/top-fire.svg'"
              />
              <div class="offer-filter-slideover__switchers-title">
                Действует акция
              </div>
            </div>
            <AppSwitch />
          </label>
          <label class="offer-filter-slideover__switchers-row">
            <div class="offer-filter-slideover__switchers-left">
              <div class="offer-filter-slideover__switchers-title">
                Топ офферы
              </div>
            </div>
            <AppSwitch />
          </label>
          <label class="offer-filter-slideover__switchers-row">
            <div class="offer-filter-slideover__switchers-left">
              <div class="offer-filter-slideover__switchers-title">
                Действует акция
              </div>
            </div>
            <AppSwitch />
          </label>
        </div>
        <div class="offer-filter-slideover__selects">
          <AppSelect
            v-for="i in 20"
            :key="i"
            :items="[]"
            placeholder="Город"
          />
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="offer-filter-slideover__footer">
        <AppButton
          color="neutral"
          variant="nofilled"
        >
          Сбросить все
        </AppButton>
        <AppButton @click="close">
          Применить
        </AppButton>
      </div>
    </template>
  </AppSlideover>
</template>

<style lang="scss">
.offer-filter-slideover {
  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-8;
  }

  &__switchers {
    display: flex;
    flex-direction: column;
    gap: $space-6;

    &-row{
      display: flex;
      gap: $space-4;
      justify-content: space-between;
      width: 100%;

      &-icon {
        width: 24px;
        height: 24px;
      }
    }

    &-left {
      display: flex;
      flex: 1;
      gap: $space-1;
    }
  }

  &__selects {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__footer {
    display: flex;
    gap: $space-6;
    justify-content: flex-end;
  }
}
</style>
