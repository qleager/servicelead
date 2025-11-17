<script lang="ts" setup>
/**
 * @slot content - **обязательный слот** с содержимым всплывашки
 */
// TODO: слоты - обязательные
// Посомтреть, есть ли проверка на это
// должна быть в defineSlots вроде

// Пропсы
interface Props {
  mode?: 'click' | 'hover' // def click
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
})

// Slots
const slots = useSlots()
defineSlots<{
  content: () => any
}>()

// Проверка наличия обязательного слота content в рантайме
onMounted(() => {
  if (!slots.content) {
    console.warn('[Dropdown] Slot "content" is required')
  }
})

// Классы для корневого элемента
const classname = computed(() => [
  'dropdown',
  `dropdown-mode-${props.mode}`,
])
</script>

<template>
  <!-- Подумать как тут правильно все обернуть, какие могут возникнуть ошибки -->
  <div :class="classname">
    <AppFloater
      :mode="mode"
      placement="bottom"
      :dismissible="false"
    >
      <!-- тут слот в слоте будет вот – помешает это или нет, надо понять -->
      <div class="dropdown__slot dropdown__slot-default">
        <slot />
      </div>
      <template #content>
        <div class="dropdown__content">
          <slot name="content" />
        </div>
      </template>
    </AppFloater>
  </div>
</template>

<style lang="scss">
.dropdown {
  $this: &;

  &__content {
    padding: $space-4 $space-2;
    border-radius: $radius-2;
    background: white;
    box-shadow: 0 0 35px 0 #1C265A1A;
  }
}
</style>
