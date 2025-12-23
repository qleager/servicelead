<script lang="ts" setup>
const model = defineModel<Model>({ default: false })

const isDesktop = ref<boolean>(true)
</script>

<template>
  <AppFloater
    v-if="isDesktop"
    v-model="model"
    placement="bottom"
  >
    <AppButton
      icon="plus"
    />
    <template #content>
      <NavigationActionsContent
        :is-desktop="true"
        @close="model = false"
      />
    </template>
  </AppFloater>

  <template v-else>
    <AppButton
      icon="plus"
      @click="model = true"
    />

    <AppOverlay
      v-model="model"
    >
      <NavigationActionsContent
        :is-desktop="false"
        @close="model = false"
      />
    </AppOverlay>
  </template>
</template>
