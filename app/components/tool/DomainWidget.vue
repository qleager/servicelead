<script lang="ts" setup>
</script>

<template>
  <AppWidget
    class="domain-widget"
    icon="domain"
    title="Домены"
    @click:button="undefined"
  >
    <template #content>
      <div class="domain-widget__amount">
        3
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.domain-widget {
  &__amount {
    @include text(medium, 3xl);
  }
}
</style>
