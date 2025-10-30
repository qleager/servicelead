<script lang="ts" setup>
interface Props {
  mode?: 'dropdown' | 'page' // при клике вызов дропдауна или переход не страницу // def dropdown
  color?: ButtonProps['color'] // def такой как в самой кнопке
}

const rootElement = computed(() => props.mode === 'dropdown' ? 'AppDropdown' : 'div')
</script>

<template>
  <Component
    :is="rootElement"
    class="tickets-button"
  >
    AppButton
    <template #dropdown>
      тут что-то будет
    </template>
  </Component>
</template>
