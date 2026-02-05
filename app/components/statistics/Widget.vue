<script lang="ts" setup>
import Modal from '~/components/app/ConfirmDialog.vue'

const { create } = useOverlay()

const exitModal = create(Modal, {
  props: {
    title: 'Уже уходите?',
    description: 'Вы уверены, что хотите выйти из аккаунта',
    accept: 'Yeh!',
  },
})

const onButtonClick = async () => {
  const result = await exitModal.open()

  alert(result)
}
</script>

<template>
  <AppWidget
    title="Статистика"
    icon="statistic"
    action
  >
    StatisticsWidget.vue
    <AppButton
      size="xs"
      @click="onButtonClick"
    >
      Выйти
    </AppButton>
  </AppWidget>
</template>
