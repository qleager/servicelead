<script setup lang="ts">
/**
 * Если возникните проблема со smooth-scroll в web-app – рассмотреть position: fixed на #__nuxt
 */
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppOverlayProvider />
</template>
