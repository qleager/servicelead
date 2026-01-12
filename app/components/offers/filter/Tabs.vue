<script lang="ts" setup>
import type { TabsItem } from '~/components/App/Tabs.vue'

interface Props {
  items: TabsItem[]
}

defineProps<Props>()

const model = defineModel<number | string>()
</script>

<template>
  <AppTabs
    v-model="model"
    :items="items"
    variant="lined"
    color="neutral"
  />
</template>
