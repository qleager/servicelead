<script lang="ts" setup>
</script>

<template>
  <AppWidget
    class="telephony-widget"
    icon="phone_24"
    title="Телефония"
  >
    <template #trailingHeader>
      <AppButton
        class="widget__button"
        color="neutral"
        icon="arrow_right"
        size="xs"
        variant="lined"
        @click="navigateTo('/telephony')"
      />
    </template>
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
    display: flex;
    align-items: end;
    height: 100%;

    @include text(medium, 3xl);

    line-height: 1;
  }
}
</style>
