<script lang="ts" setup>
// нужные доработки
// AppTag:
// 1) нету варианта тега как в макете с backgraund = $color-neutral-light-50 и цветом текста $color-neutral-light-700
// AppButton:
// 1) Нету подходящего сочетания внешнего вида кнопки и ховера. Либо ставим variant="lined" color="neutral" и тогда нет синего ховера,
// либо ставим variant="filled" color="white" и тогда не хватает видимого border , как в макете
// 2) в Макете используется Tabs , но у нас нет вертикального Tabs, и он все равно основан на внешке AppButton, первый пункт остается актуальным
// + это всего лишь ссылки на заголовки, нам не нужно выделять активную кнопку.
//
// Переделать позже:
// 1) Заменить offers-single-information__help на AppHelp, когда будет сделан

const isCardsOpen = ref(false)
</script>

<template>
  <div class="offers-single-information">
    <!-- IDEA: компонент обертка с content и aside слотами?  -->
    <div class="offers-single-information__content">
      <div
        id="descriptionid"
        class="offers-single-information__block offers-single-information__description"
      >
        <div class="offers-single-information__description-header">
          <div class="offers-single-information__title-row">
            <AppIcon
              class="offers-single-information__title-icon"
              name="description"
            />
            <div class="offers-single-information__title-label">
              lorem impsum
            </div>
          </div>

          <div class="offers-single-information__text">
            lorem impsum
          </div>
        </div>
        <div class="offers-single-information__cols">
          <div class="offers-single-information__col">
            <div class="offers-single-information__subtitle">
              lorem impsum
            </div>

            <ul class="offers-single-information__list">
              <li
                v-for="i in 5"
                :key="i"
                class="offers-single-information__list-item"
              >
                lorem impsum
              </li>
            </ul>
          </div>

          <div class="offers-single-information__col">
            <div class="offers-single-information__subtitle">
              lorem impsum
            </div>

            <ul class="offers-single-information__list">
              <li
                v-for="i in 5"
                :key="i"
                class="offers-single-information__list-item"
              >
                lorem impsum
              </li>
            </ul>
          </div>
        </div>

        <div class="offers-single-information__col offers-single-information__col-card offers-single-information__col-neutral">
          <div class="offers-single-information__subtitle">
            lorem impsum
          </div>

          <ul class="offers-single-information__list">
            <li
              v-for="i in 5"
              :key="i"
              class="offers-single-information__list-item"
            >
              lorem impsum
            </li>
          </ul>
        </div>
      </div>

      <div
        id="techid"
        class="offers-single-information__block offers-single-information__block-tech"
      >
        <div class="offers-single-information__title-row">
          <AppIcon
            class="offers-single-information__title-icon"
            name="gear"
          />
          <div class="offers-single-information__title-label">
            lorem impsum
          </div>
        </div>

        <div class="offers-single-information__stack">
          <div class="offers-single-information__subtitle">
            lorem impsum
          </div>

          <div
            class="offers-single-information__tags"
          >
            <AppTag
              v-for="i in 5"
              :key="i"
              variant="filled"
              color="neutral"
              class="offers-single-information__tags-tag offers-single-information__outline"
            >
              lorem impsum
            </AppTag>
          </div>
        </div>

        <div class="offers-single-information__cols offers-single-information__cols-cards">
          <div class="offers-single-information__col offers-single-information__col-card offers-single-information__col-neutral">
            <div class="offers-single-information__subtitle">
              lorem impsum
            </div>

            <ul class="offers-single-information__list">
              <li
                v-for="i in 5"
                :key="i"
                class="offers-single-information__list-item"
              >
                lorem impsum
              </li>
            </ul>
          </div>

          <div class="offers-single-information__col offers-single-information__col-card offers-single-information__col-danger">
            <div class="offers-single-information__subtitle">
              lorem impsum
            </div>

            <ul class="offers-single-information__list">
              <li
                v-for="i in 5"
                :key="i"
                class="offers-single-information__list-item"
              >
                lorem impsum
              </li>
            </ul>
          </div>
        </div>

        <div class="offers-single-information__col">
          <div class="offers-single-information__subtitle">
            lorem impsum
          </div>

          <ul class="offers-single-information__list">
            <li
              v-for="i in 5"
              :key="i"
              class="offers-single-information__list-item"
            >
              lorem impsum
            </li>
          </ul>
        </div>

        <div class="offers-single-information__col">
          <div class="offers-single-information__subtitle">
            lorem impsum
          </div>

          <ul class="offers-single-information__list">
            <li
              v-for="i in 5"
              :key="i"
              class="offers-single-information__list-item"
            >
              lorem impsum
            </li>
          </ul>
        </div>
      </div>

      <div
        id="workTypesid"
        class="offers-single-information__block offers-single-information__block-worktypes"
      >
        <div class="offers-single-information__title-row">
          <AppIcon
            class="offers-single-information__title-icon"
            name="jobs"
          />
          <div class="offers-single-information__title-label">
            lorem impsum
          </div>
        </div>

        <div class="offers-single-information__stack">
          <div class="offers-single-information__cols offers-single-information__cols-cards">
            <div class="offers-single-information__col offers-single-information__col-card offers-single-information__col-neutral">
              <AppCollapse
                v-model="isCardsOpen"
                class="offers-single-information__col-dropdown"
                :init-height="147"
              >
                <div class="offers-single-information__subtitle offers-single-information__subtitle-dropdown">
                  lorem impsum
                  <AppIcon name="dropdown" />
                </div>
                <template #content>
                  <ul class="offers-single-information__list">
                    <li
                      v-for="i in 15"
                      :key="i"
                      class="offers-single-information__list-item"
                    >
                      lorem impsum
                    </li>
                  </ul>
                </template>
              </AppCollapse>
            </div>

            <div class="offers-single-information__col offers-single-information__col-card offers-single-information__col-danger">
              <AppCollapse
                v-model="isCardsOpen"
                class="offers-single-information__col-dropdown"
                :init-height="147"
              >
                <div class="offers-single-information__subtitle offers-single-information__subtitle-dropdown">
                  lorem impsum
                  <AppIcon name="dropdown" />
                </div>
                <template #content>
                  <ul class="offers-single-information__list">
                    <li
                      v-for="i in 15"
                      :key="i"
                      class="offers-single-information__list-item"
                    >
                      lorem impsum
                    </li>
                  </ul>
                </template>
              </AppCollapse>
            </div>
          </div>

          <AppButton
            class="offers-single-information__worktypes-toggle"
            variant="filled"
            color="neutral"
            size="md"
            info__block
            type="button"
            @click="isCardsOpen = !isCardsOpen"
          >
            lorem impsum
          </AppButton>
        </div>
      </div>

      <div
        id="propschangesid"
        class="offers-single-information__block offers-single-information__block-changes"
      >
        <div class="offers-single-information__title-row">
          <AppIcon
            class="offers-single-information__title-icon"
            name="change"
          />
          <div class="offers-single-information__title-label">
            lorem impsum
          </div>
        </div>

        <div class="offers-single-information__changes">
          <div
            v-for="i in 5"
            :key="i"
            class="offers-single-information__change"
          >
            <div class="offers-single-information__change-date">
              с lorem impsum
            </div>

            <div class="offers-single-information__change-text">
              lorem impsum
            </div>
          </div>
        </div>
      </div>
    </div>

    <aside class="offers-single-information__right">
      <nav
        class="offers-single-information__nav"
        aria-label="Навигация по информации"
      >
        <AppButton
          v-for="i in 5"
          :key="i"
          class="offers-single-information__nav-item offers-single-information__outline"
          variant="filled"
          color="white"
          size="md"
          :to="`#`"
        >
          lorem impsum
        </AppButton>
      </nav>

      <!-- TODO: Заменить на AppHelp когда доделают -->
      <div class="offers-single-information__help offers-single-information__outline">
        <div class="offers-single-information__help-title">
          Нужна помощь?
        </div>

        <div class="offers-single-information__help-text">
          Создайте тикет или задайте его напрямую своему менеджеру
        </div>

        <div class="offers-single-information__help-actions">
          <AppButton
            variant="filled"
            color="white"
            size="sm"
            type="button"
            class="offers-single-information__help-action"
          >
            Менеджер
          </AppButton>

          <AppButton
            variant="filled"
            color="white"
            size="sm"
            type="button"
            class="offers-single-information__help-action"
          >
            Тикет
          </AppButton>
        </div>
      </div>
    </aside>
  </div>
</template>

<style lang="scss">
.offers-single-information {
  $this: &;

  display: flex;
  gap: $space-6;
  justify-content: space-between;

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-20;
  }

  &__right {
    display: flex;
    flex: none;
    flex-direction: column;
    gap: $space-10;

    width: 300px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: $space-8;
  }

  &__description {
    &-header {
      display: flex;
      flex-direction: column;
      gap: $space-6;
    }
  }

  &__stack {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__title {
    &-row {
      display: flex;
      gap: $space-3;
      align-items: center;
    }

    &-icon {
      color: $color-neutral-500;
    }

    &-label {
      @include text(semibold, xl);
    }
  }

  &__subtitle {
    @include text(semibold, md);

    &-dropdown {
      display: inline-flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__text {
    @include text(regular, md);

    color: $color-neutral-700;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-2;

    margin: 0;
    padding-left: $space-7;

    @include text(regular, sm);

    color: $color-neutral-700;
  }

  &__cols {
    display: flex;
    gap: $space-10;

    &-cards {
      gap: $space-4;
    }
  }

  &__col {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: $space-4;

    &-card {
      padding: $space-6;
      border-radius: $radius-6;
    }

    &-dropdown {
      display: flex;
      flex-direction: column;
      gap: $space-4;
    }

    &-neutral {
      background: $color-neutral-50;
    }

    &-danger {
      background-color: $color-red-50;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  &__changes {
    display: flex;
    flex-direction: column;
    gap: $space-8;
  }

  &__change {
    display: flex;
    flex-direction: column;
    gap: $space-1;

    &-date {
      @include text(semibold, md);

      color: $color-neutral-700;
    }

    &-text {
      @include text(regular, md);

      color: $color-neutral-700;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-2;

    &-item {
      text-decoration: none;
    }
  }

  &__help {
    display: flex;
    flex-direction: column;
    gap: $space-4;

    padding: $space-6;
    border-radius: $radius-4;

    background: $color-neutral-50;

    &-title {
      @include text(regular, xl);
    }

    &-text {
      @include text(regular, md);

      color: $color-neutral-300;
    }

    &-actions {
      display: flex;
      gap: $space-4;
    }

    &-action {
      justify-content: center;
      width: 100%;
    }
  }

  &__outline {
    outline: 1px dashed $color-primary;
  }
}
</style>
