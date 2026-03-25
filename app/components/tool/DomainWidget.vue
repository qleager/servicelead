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
      <div class="domain-widget__content">
        3
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.domain-widget {
  &__content {
    display: flex;
    align-items: end;
    height: 100%;

    @include text(medium, 3xl);

    line-height: 1;
  }
}
</style>
