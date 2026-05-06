<script lang="ts" setup>
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
    <ThreadSingleParameters />
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
