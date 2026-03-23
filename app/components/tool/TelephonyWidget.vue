<script lang="ts" setup>
</script>

<template>
  <AppWidget
    class="telephony-widget"
    icon="phone_24"
    title="Телефония"
    @click:button="navigateTo('/telephony')"
  >
    <template #content>
      <div class="telephony-widget__content">
        31
      </div>
    </template>
  </AppWidget>
</template>

<style lang="scss">
.telephony-widget {
  &__content {
    @include text(medium, 3xl);
  }
}
</style>
