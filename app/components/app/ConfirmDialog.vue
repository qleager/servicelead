<script lang="ts" setup>
// TODO: сделать composable useConfirmDialog 💪
interface Props {
  /**
   * Title of dialog
   *
   * @defaultvalue `'Вы уверены?'`
   */
  title?: string
  description?: string
  /**
   * Accept button text
   *
   * @defaultvalue `'Да'`
   */
  accept?: string
  /**
   * Accept button text
   *
   * @defaultvalue `'Отмена'`
   */
  reject?: string
}

interface Emits {
  close: ['accept' | 'reject' ]
}

withDefaults(defineProps<Props>(), {
  title: 'Вы уверены?',
  accept: 'Да',
  reject: 'Отмена',
})

defineEmits<Emits>()
</script>

<template>
  <AppModal
    :title
    class="confirm-dialog"
    @close="$emit('close', 'reject')"
  >
    <template #content>
      {{ description }}
    </template>
    <template #footer>
      <div class="confirm-dialog">
        <AppButton
          color="neutral"
          @click="$emit('close', 'reject')"
        >
          {{ reject }}
        </AppButton>
        <AppButton
          color="primary"
          @click="$emit('close', 'accept')"
        >
          {{ accept }}
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>

<style lang="scss">
.confirm-dialog {
  &__footer {
    display: flex;
    gap: $space-2;
    justify-content: end;
  }
}
</style>
