<script lang="ts" setup>
interface Props {
  mode?: 'page' | 'dropdown' | 'sheet' // при клике вызов дропдауна или переход не страницу // def page
  color?: ButtonProps['color'] // def такой как в самой кнопке
}

const rootElement = computed(() => {
  switch (props.mode) {
    case 'dropdown':
      return 'AppDropdown'
      break

    case 'sheet':
      return 'AppSheet'
      break

    default:
      return 'div'
      break
  }
})
</script>

<template>
  <Component
    :is="rootElement"
    class="tickets-button"
  >
    AppButton
    <template #content>
      тут что-то будет
    </template>
  </Component>
</template>
