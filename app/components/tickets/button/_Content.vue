<script lang="ts" setup>
interface Props {
  tickets: unknown[]
}

defineProps<Props>()
</script>

<template>
  <div class="tickets-button__content">
    <div
      v-if="tickets.length"
      class="tickets-button__content-list"
    >
      <TicketsEntry
        v-for="i in 4"
        :key="i"
        minimal
      />
    </div>
    <div
      v-else
      class="tickets-button__content-empty"
    >
      <div class="tickets-button__content__empty-content">
        <NuxtImg
          class="tickets-button__content__empty-icon"
          src="/images/tickets/button__content-empty-icon.svg"
        />
        <div class="tickets-button__content__empty-text">
          <div>У вас еще нет ни одного тикета </div>
          <div>Хотите создать?</div>
        </div>
      </div>
    </div>
    <AppButton
      color="neutral"
      class="tickets-button__content__empty-button"
    >
      Создать тикет
    </AppButton>
  </div>
</template>

<style lang="scss">
.tickets-button {
$this: &;

&__content {
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
}
</style>
