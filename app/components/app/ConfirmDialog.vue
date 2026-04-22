<script lang="ts" setup>
import type { VNodeChild } from 'vue'

interface Props {
  /**
   * Accept button text
   *
   * @defaultvalue `'Да'`
   */
  accept?: string
  description?: string
  /**
   * Reject button text
   *
   * @defaultvalue `'Отмена'`
   */
  reject?: string
  /**
   * Title of dialog
   *
   * @defaultvalue `'Вы уверены?'`
   */
  title?: string
}

interface Emits {
  close: [ 'accept' | 'reject' ]
}

interface Slots {
  default?: () => VNodeChild
}

withDefaults(defineProps<Props>(), {
  title: 'Вы уверены?',
  accept: 'Да',
  reject: 'Отмена',
})

const emits = defineEmits<Emits>()

defineSlots<Slots>()

const onAccept = () => {
  emits('close', 'accept')
}

const onReject = () => {
  emits('close', 'reject')
}

export type { Props as ConfirmDialogProps }
</script>

<template>
  <AppModal
    class="confirm-dialog"
    :title
    @close="$emit('close', 'reject')"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template
      v-if="description"
      #content
    >
      {{ description }}
    </template>
    <template #footer="{ close }">
      <div class="confirm-dialog__footer">
        <AppButton
          color="neutral"
          @click="onReject(); close()"
        >
          {{ reject }}
        </AppButton>
        <AppButton
          color="primary"
          @click="onAccept(); close()"
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
