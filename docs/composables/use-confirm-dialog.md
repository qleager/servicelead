# useConfirmDialog composable

useConfirmDialog is a shared composable that opens the ConfirmDialog via the global overlay
and resolves to a boolean based on the user action.

## Location
- Source: app/composables/useConfirmDialog.ts
- Dialog: app/components/app/ConfirmDialog.vue
- Overlay: app/composables/UseOverlay.ts

## API

### useConfirmDialog()
Returns a function:
- (options: ConfirmDialogProps) => Promise<boolean>

### ConfirmDialogProps
- title?: string (default: 'Вы уверены?')
- description?: string
- accept?: string (default: 'Да')
- reject?: string (default: 'Отмена')

## Usage example

```ts
const confirm = useConfirmDialog()

const accepted = await confirm({
  title: 'Удалить оффер?',
  description: 'Действие нельзя отменить.',
  accept: 'Удалить',
  reject: 'Отмена',
})

if (accepted) {
  await $api.offers.remove(id)
}
```

## Notes
- Resolves to true on accept, false on reject or close.
- Each call creates a new overlay entry through useOverlay.
