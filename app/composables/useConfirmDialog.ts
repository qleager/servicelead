import type { ConfirmDialogProps } from '~/components/app/ConfirmDialog.vue'
import ConfirmDialog from '~/components/app/ConfirmDialog.vue'
// Docs: docs/composables/use-confirm-dialog.md

export const useConfirmDialog = () => {
  const overlay = useOverlay()

  return (options: ConfirmDialogProps): Promise<boolean> => {
    const modal = overlay.create(ConfirmDialog, {
      props: options,
    })

    return modal.open().then((result: 'accept' | 'reject') => result === 'accept')
  }
}
