<script lang="ts" setup>
</script>

<template>
  <AppWidget
    class="domain-widget"
    icon="domain"
    title="Домены"
    @click:button="navigateTo('/domains')"
  >
    <template #content>
      <div class="domain-widget__content">
        3
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.domain-widget {
  &__content {
    @include text(medium, 3xl);
  }
}
</style>
