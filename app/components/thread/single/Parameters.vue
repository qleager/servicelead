<script setup lang="ts">
const openedSections = reactive({
  legalData: false,
  analytics: false,
  utmParams: false,
  additional: false,
})
</script>

<template>
  <AppWidget
    class="thread-single-parameters"
    icon="filter"
    title="Параметры потока"
  >
    <template #content>
      <div class="thread-single-parameters__section">
        <div class="thread-single-parameters__section-content">
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              Дата
            </div>
            <div class="thread-single-parameters__param-value">
              12.02.2026
            </div>
          </div>
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              Оффер
            </div>
            <div class="thread-single-parameters__param-value">
              Компьютерная помощь
            </div>
          </div>
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              ID
            </div>
            <div class="thread-single-parameters__param-value">
              51323
              <AppTooltip>
                <AppButton
                  class="thread-single-parameters__copy-btn"
                  color="neutral"
                  icon="Copy"
                  size="xs"
                  variant="link"
                  @click="copyToClipboard('51323')"
                />
                <template #content>
                  Скопировать
                </template>
              </AppTooltip>
            </div>
          </div>
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              Инструмент
            </div>
            <div class="thread-single-parameters__param-value">
              Лендинг
            </div>
          </div>
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              Сценарий
            </div>
            <div class="thread-single-parameters__param-value">
              Компания
            </div>
          </div>
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              Город
            </div>
            <div class="thread-single-parameters__param-value">
              Абакан
              <AppDropdown mode="hover">
                <template #default>
                  <AppTag
                    color="neutral"
                    size="sm"
                    variant="soft"
                  >
                    +3
                  </AppTag>
                </template>
                <template #content>
                  <div class="thread-single-parameters__extra-tooltip">
                    <div class="thread-single-parameters__extra-tooltip-item">
                      Москва
                    </div>
                    <div class="thread-single-parameters__extra-tooltip-item">
                      Санкт-Петербург
                    </div>
                    <div class="thread-single-parameters__extra-tooltip-item">
                      Казань
                    </div>
                  </div>
                </template>
              </AppDropdown>
            </div>
          </div>
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              Проект
            </div>
            <div class="thread-single-parameters__param-value">
              Универсальный
            </div>
          </div>
          <div class="thread-single-parameters__param">
            <div class="thread-single-parameters__param-label">
              Телефон
            </div>
            <div class="thread-single-parameters__param-value">
              +7 947 847 83 45
            </div>
          </div>
        </div>
      </div>

      <AppCollapse
        v-model="openedSections.legalData"
        class="thread-single-parameters__section"
      >
        <div class="thread-single-parameters__section-head">
          Юридические данные
          <AppIcon name="dropdown" />
        </div>
        <template #content>
          <div class="thread-single-parameters__section-content">
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Юридическое наименование
              </div>
              <div class="thread-single-parameters__param-value">
                ООО «Название компании»
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Фактический адрес
              </div>
              <div class="thread-single-parameters__param-value">
                г. Москва, ул. Примерная, д. 1, оф. 100
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                ОГРН
              </div>
              <div class="thread-single-parameters__param-value">
                1234567890123
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                ИНН
              </div>
              <div class="thread-single-parameters__param-value">
                1234567890
              </div>
            </div>
          </div>
        </template>
      </AppCollapse>

      <AppCollapse
        v-model="openedSections.analytics"
        class="thread-single-parameters__section"
      >
        <div class="thread-single-parameters__section-head">
          Аналитика и пиксели
          <AppIcon name="dropdown" />
        </div>
        <template #content>
          <div class="thread-single-parameters__section-content">
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Яндекс.Метрика ID
              </div>
              <div class="thread-single-parameters__param-value">
                12345678
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Google Analytics ID
              </div>
              <div class="thread-single-parameters__param-value">
                UA-12345678-9
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Facebook Pixel ID
              </div>
              <div class="thread-single-parameters__param-value">
                653298765275437
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                VK.com Pixel ID (старый)
              </div>
              <div class="thread-single-parameters__param-value">
                VK-RTRG-420111-1lune
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                VK.com Pixel ID (новый)
              </div>
              <div class="thread-single-parameters__param-value">
                1234567
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Google Tag Manager
              </div>
              <div class="thread-single-parameters__param-value">
                GTM-WG1234
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Zadarma ID
              </div>
              <div class="thread-single-parameters__param-value">
                240e75faa1ad774fff6d3e26d3912345
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Mango ID
              </div>
              <div class="thread-single-parameters__param-value">
                12345
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Tik-Tok ID
              </div>
              <div class="thread-single-parameters__param-value">
                C0L5ONCP76SVVJ0V5LN0
              </div>
            </div>
          </div>
        </template>
      </AppCollapse>

      <AppCollapse
        v-model="openedSections.utmParams"
        class="thread-single-parameters__section"
      >
        <div class="thread-single-parameters__section-head">
          Метки потока
          <AppIcon name="dropdown" />
        </div>
        <template #content>
          <div class="thread-single-parameters__section-content">
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Subid 1
              </div>
              <div class="thread-single-parameters__param-value">
                6hgh
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Subid 2
              </div>
              <div class="thread-single-parameters__param-value">
                gt566
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Subid 3
              </div>
              <div class="thread-single-parameters__param-value">
                gj45
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                URL карточки в яндекс картах
              </div>
              <div class="thread-single-parameters__param-value">
                127867364738687
              </div>
            </div>
          </div>
        </template>
      </AppCollapse>

      <AppCollapse
        v-model="openedSections.additional"
        class="thread-single-parameters__section"
      >
        <div class="thread-single-parameters__section-head">
          Дополнительный захват лидов
          <AppIcon name="dropdown" />
        </div>
        <template #content>
          <div
            class="thread-single-parameters__section-content thread-single-parameters__section-content--single-column"
          >
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Popup при уходе
              </div>
              <div class="thread-single-parameters__param-value">
                <AppTag
                  color="green"
                  size="sm"
                  variant="soft"
                >
                  Включен
                </AppTag>
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Плавающая кнопка вызова формы обратной связи
              </div>
              <div class="thread-single-parameters__param-value">
                <AppTag
                  color="green"
                  size="sm"
                  variant="soft"
                >
                  Включен
                </AppTag>
              </div>
            </div>
            <div class="thread-single-parameters__param">
              <div class="thread-single-parameters__param-label">
                Чат-бот
              </div>
              <div class="thread-single-parameters__param-value">
                <AppTag
                  color="neutral"
                  size="sm"
                  variant="soft"
                >
                  Выключен
                </AppTag>
              </div>
            </div>
          </div>
        </template>
      </AppCollapse>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.thread-single-parameters {
  &__section {
    @include text(medium, md);

    &:not(:first-child) {
      margin-top: $space-4;
      padding-top: $space-4;
      border-top: 1px solid $color-neutral-150;

      .thread-single-parameters__section-content {
        padding-top: $space-6;
      }
    }

    &-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
    }

    &-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $space-4 $space-14;

      &--single-column {
        grid-template-columns: 1fr;
      }
    }
  }

  &__param {
    display: flex;
    justify-content: space-between;

    &-label {
      @include text(regular, sm);

      color: $color-neutral;
    }

    &-value {
      display: flex;
      gap: $space-2;
      align-items: center;
      color: $color-neutral-950;

      @include text(regular, md);
    }
  }

  &__copy-btn {
    margin: -$space-1;
  }

  &__extra-tooltip {
    display: flex;
    flex-direction: column;
    gap: $space-05;

    &-item {
      white-space: nowrap;
    }
  }
}
</style>
