<script lang="ts" setup>
interface Props {
  mode?: 'page' | 'dropdown' | 'sheet' // при клике вызов дропдауна/шита или переход не страницу // def page
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
    class="notifications-button"
  >
    AppButton
    <template #content>
      тут что-то будет
    </template>
  </Component>
</template>
