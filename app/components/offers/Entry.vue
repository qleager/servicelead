<script lang="ts" setup>
// TODO: Добавить тип offerItem
interface Props {
  offer: any
}

defineProps<Props>()
</script>

<template>
  <div class="offers-entry">
    <div class="offers-entry__header">
      <div class="offers-entry__header-media">
        <img
          v-if="offer.image"
          :src="offer.image"
          alt=""
        >
      </div>
      <div class="offers-entry__header-overlay">
        <div class="offers-entry__header-tags">
          <AppTooltip
            v-for="tag in offer.tags"
            :key="tag.value"
            :text="tag.label"
            placement="bottom"
          >
            <AppIcon
              :size="20"
              :name="tag.value"
            />
          </AppTooltip>
        </div>
        <AppButton
          icon="favorites"
          variant="nofilled"
          size="xs"
          :icon-size="32"
          color="white"
        />
      </div>
    </div>
    <div class="offers-entry__body">
      <div class="offers-entry__content">
        <div class="offers-entry__info">
          <div class="offers-entry__info-category">
            <AppTag>
              {{ offer.tag }}
            </AppTag>
          </div>
          <AppDropdown mode="hover">
            <div class="offers-entry__info-location">
              <AppIcon name="geo_16" />
              <div>
                {{ offer.cities.length }}
              </div>
            </div>
            <template #content>
              <div>
                <div
                  v-for="city in offer.cities"
                  :key="city"
                >
                  {{ city }}
                </div>
              </div>
            </template>
          </AppDropdown>
        </div>
        <div class="offers-entry__title">
          <AppIcon
            v-if="offer.isHot"
            class="offers-entry__title-icon"
            name="top_fire"
          />
          <div class="offers-entry__title-text">
            {{ offer.title }}
          </div>
        </div>
      </div>
      <div class="offers-entry__footer">
        <div class="offers-entry__price">
          <div class="offers-entry__price-header">
            Ставка
          </div>
          <div class="offers-entry__price-value">
            До {{ offer.maxPrice }} ₽
          </div>
        </div>
        <div class="offers-entry__actions">
          <AppButton
            icon="lock"
            variant="nofilled"
            color="darker"
            @click="console.log(`lock ${offer.id}`)"
          />
          <AppButton
            icon="arrow_right"
            variant="lined"
            color="darker"
            :to="`/offers/${offer.id}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offers-entry{
  $this: &;

  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: $space-3;

  min-width: 240px;
  padding: $space-2;
  border-radius: $radius-6;

  background: white;

  &__header {
    position: relative;

    overflow: hidden;

    aspect-ratio: 2 / 1;
    width: 100%;
    padding: $space-3 $space-3 0 $space-3;
    border-radius: $radius-3;

    background: $color-blue-350;

    &-media {
      position: absolute;
      inset: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-overlay {
      position: relative;
      z-index: 1;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &-tags {
      display: flex;
      gap: $space-05;
      color: white;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $space-6;
    padding: 0 $space-2 $space-2;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__info {
    display: flex;
    justify-content: space-between;

    &-location {
      display: flex;
      gap: $space-1;
      align-items: center;
    }
  }

  &__title {
    display: flex;
    gap: $space-1;
    align-items: center;

    @include text(semibold, md);
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: $space-05;

    &-header {
      @include text(regular, xs);

      color: $color-neutral-light-400;
    }

    &-value {
      @include text(medium, lg);
    }
  }

  &__actions {
    display: flex;
    gap: $space-3;
    align-items: center;
  }
}
</style>
