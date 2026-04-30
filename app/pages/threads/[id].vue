<script lang="ts" setup>
import type { ThreadParameters } from '~/components/thread/single/Parameters.vue'

const confirmDialog = useConfirmDialog()

const onEdit = async () => {
  const accepted = await confirmDialog({
    title: 'Редактировать поток?',
    description: 'Изменения применятся сразу — поток продолжит принимать лиды.',
    accept: 'Редактировать',
  })

  if (!accepted) {
    return
  }

  console.log('edit')
}

const onCopy = async () => {
  const accepted = await confirmDialog({
    title: 'Создать копию потока?',
    description: 'Поток скопируется с теми же настройками. Потом можно отредактировать.',
    accept: 'Создать',
  })

  if (!accepted) {
    return
  }

  console.log('copy')
}

const onArchive = async () => {
  const accepted = await confirmDialog({
    title: 'Перенести поток в архив?',
    description: 'Вернуть обратно можно в любой момент.',
    accept: 'В архив',
  })

  if (!accepted) {
    return
  }

  console.log('archive')
}

const threadParametersData: ThreadParameters[] = [
  {
    key: 'general',
    items: [
      { key: 'date', label: 'Дата', value: '12.02.2026' },
      { key: 'offer', label: 'Оффер', value: 'Компьютерная помощь' },
      { key: 'id', label: 'ID', value: 51323, isCopyable: true },
      { key: 'tool', label: 'Инструмент', value: 'Лендинг' },
      { key: 'scenario', label: 'Сценарий', value: 'Компания' },
      { key: 'city', label: 'Город', value: ['Абакан', 'Москва', 'Санкт-Петербург', 'Казань'] },
      { key: 'project_type', label: 'Проект', value: 'Универсальный' },
      { key: 'phone', label: 'Телефон', value: ['+7 947 847 83 45'] },
    ],
  },
  {
    key: 'legal_data',
    title: 'Юридические данные',
    items: [
      { key: 'legal_name', label: 'Юридическое наименование', value: 'ООО «Название компании»' },
      { key: 'actual_address', label: 'Фактический адрес', value: 'г. Москва, ул. Примерная, д. 1, оф. 100' },
      { key: 'psrn', label: 'ОГРН', value: 1234567890123 },
      { key: 'tin', label: 'ИНН', value: 1234567890 },
    ],
  },
  {
    key: 'analytics',
    title: 'Аналитика и пиксели',
    items: [
      { key: 'yandex_metrica_id', label: 'Яндекс.Метрика ID', value: 12345678 },
      { key: 'google_analytics_id', label: 'Google Analytics ID', value: 'UA-12345678-9' },
      { key: 'facebook_pixel_id', label: 'Facebook Pixel ID', value: 653298765275437 },
      { key: 'vk_pixel_id_old', label: 'VK.com Pixel ID (старый)', value: 'VK-RTRG-420111-1lune' },
      { key: 'vk_pixel_id', label: 'VK.com Pixel ID (новый)', value: 1234567 },
      { key: 'google_tag_manager', label: 'Google Tag Manager', value: 'GTM-WG1234' },
      { key: 'zadarma_id', label: 'Zadarma ID', value: '240e75faa1ad774fff6d3e26d3912345' },
      { key: 'mango_id', label: 'Mango ID', value: 12345 },
      { key: 'tiktok_id', label: 'Tik-Tok ID', value: 'C0L5ONCP76SVVJ0V5LN0' },
    ],
  },
  {
    key: 'utm_params',
    title: 'Метки потока',
    items: [
      { key: 'subid_1', label: 'Subid 1', value: '6hgh' },
      { key: 'subid_2', label: 'Subid 2', value: 'gt566' },
      { key: 'subid_3', label: 'Subid 3', value: 'gj45' },
      { key: 'card_url', label: 'URL карточки в яндекс картах', value: 127867364738687 },
    ],
  },
  {
    key: 'additional',
    title: 'Дополнительный захват лидов',
    items: [
      { key: 'exit_popup', label: 'Popup при уходе', value: true },
      { key: 'floating_button', label: 'Плавающая кнопка вызова формы обратной связи', value: true },
      { key: 'chat_bot', label: 'Чат-бот', value: false },
    ],
  },
]
</script>

<template>
  <div class="page-thread">
    <div class="page-thread__head">
      <div class="page-thread__title">
        Компьютерная помощь_Avito
      </div>

      <!-- IDEA: можно уменьшить вложенность, если использовать слот AppChip и применить стили к самому AppChip -->
      <div class="page-thread__status">
        <AppChip
          color="green"
          size="sm"
          standalone
        />
        <div class="page-thread__status-text">
          Активный
        </div>
      </div>

      <div class="page-thread__actions">
        <AppButton
          color="neutral"
          icon="edit"
          variant="outline"
          @click="onEdit"
        />
        <AppButton
          color="neutral"
          icon="Copy"
          variant="outline"
          @click="onCopy"
        />
        <AppButton
          color="neutral"
          icon="archive"
          variant="outline"
          @click="onArchive"
        />
      </div>
    </div>

    <StatisticsThread />
    <ThreadSingleParameters :data="threadParametersData" />
    <ThreadSingleDelivery />
  </div>
</template>

<style lang="scss">
.page-thread {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__head {
    display: flex;
    align-items: center;
  }

  &__title {
    @include text(bold, 5xl);
  }

  &__status {
    display: flex;
    gap: $space-1;
    align-items: center;

    margin-left: $space-4;

    @include text(medium, sm);

    color: $color-neutral;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  &__actions {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }
}
</style>
