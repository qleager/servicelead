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
<<<<<<< AppTable__dev_dushik
    <div class="div1">
      <AppTable class="table1" />
    </div>
    <!-- StatisticsWidget.vue -->
=======
    StatisticsWidget.vue
    <AppButton
      size="xs"
      @click="onButtonClick"
    >
      Выйти
    </AppButton>
>>>>>>> dev_q
  </AppWidget>
</template>

<style lang="scss">
.div1 {
  overflow: auto;
  height: 376px;
  margin-inline: -#{$space-2};
}
</style>
