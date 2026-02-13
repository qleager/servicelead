<script lang="ts" setup></script>

<template>
  <div class="ticket-list">
    <template v-if="false">
      <NotificationEntry
        v-for="i in 4"
        :key="i"
        minimal
      />
    </template>

    <div
      v-else
      class="ticket-list__nodata"
    >
      <div class="ticket-list__nodata-content">
        <NuxtImg
          class="ticket-list__nodata-icon"
          src="/images/tickets/ticket-list__nodata.svg"
        />
        <div class="ticket-list__nodata-text">
          <div>У вас еще нет ни одного тикета </div>
          <div>Хотите создать?</div>
        </div>
      </div>
      <AppButton
        class="ticket-list__nodata-button"
        color="neutral"
      >
        Создать тикет
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.ticket-list {
  display: flex;
  flex-direction: column;
  gap: $space-1;

  &__nodata {
    display: flex;
    flex-direction: column;
    gap: $space-10;
    align-items: center;

    width: 100%;
    padding: $space-3;

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
