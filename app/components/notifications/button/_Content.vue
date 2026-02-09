<script lang="ts" setup>
interface Props {
  notifications: unknown[]
}

defineProps<Props>()
</script>

<template>
  <div class="notifications-button__content">
    <div class="notifications-button__content-list">
      <NotificationsEntry
        v-for="i in 4"
        :key="i"
        minimal
      />
    </div>
  </div>
</template>

<style lang="scss">
.notifications-button__content {
  $this: &;

  max-width: 300px;

  &-empty {
    display: flex;
    flex-direction: column;
    gap: $space-10;
    align-items: center;

    width: 100%;

    &-content {
      display: flex;
      flex-direction: column;
      gap: $space-2;
      align-items: center;
    }

    &-icon {
      width: 124px;
      height: 124px;
      color: $color-neutral-400;
    }

    &-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-button {
      justify-content: center;
      width: 100%;
    }
  }
}
</style>
