<script lang="ts" setup>
const model = defineModel<string | null>({ default: null })

const isVisible = ref(false)

const toggle = () => {
  isVisible.value = !isVisible.value

  if (!isVisible.value) {
    model.value = null
  }
}

const close = () => {
  model.value = null
  isVisible.value = false
}
</script>

<template>
  <div class="offers-filter-search">
    <AppInput
      v-if="isVisible"
      v-model="model"
      reset
      rounded
      placeholder="Начните поиск..."
      @reset="close"
    />
    <AppButton
      v-else
      icon="search"
      variant="lined"
      color="neutral"
      @click="toggle"
    />
  </div>
</template>
