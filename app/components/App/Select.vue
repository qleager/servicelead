<script lang="ts" generic="V" setup>
// TODO: делаем просто самую базу
// селект самый сложный компонент для реализации всегда
interface Props {
  items: (Item | string | number | V)[]
  // Когда multiple мы как "options" используем AppCheckbox
  multiple?: boolean
  // Когда multiple=true показывать выбранные селекты как число или список (props.counter)
  // Когда counter=list placeholder переходит на бордер при focus и заполнено (тут рушиться дс, но похуй)
  // TODO: сделать проверку на multiple (это оставляем на потом)
  counter?: 'number' | 'list' // def number
  size?: 'md' | 'xs' // в макете lg у нас будет md (Почему?: кнопка-комопнент h48px это md, значит и инпут h48px это md, а не lg) // def md
}

interface Item {
  label: string
  value: V
  // onClick: () => На будущее. Пригодится потом когда надо будет делаеть разные действия при выборе, чтобы не городить емиты (не удалять этот комент)
}

const model = defineModel<V>()
</script>

<template>
  <div :class="classname">
    <select
      id=""
      name=""
      hidden
    />
    <AppDropdown />
  </div>
</template>

<style lang="scss">
.select {
  $this: &;
}
</style>
