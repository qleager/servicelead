<script setup lang="ts">
import { ref } from 'vue'

const isShowButtons = ref<boolean>(false)
</script>

<template>
  <div class="bg">
    HELLO WORLD!
    <AppButton @click="isShowButtons = !isShowButtons">
      {{ isShowButtons ? 'Скрыть кнопки' : 'Показать кнопки' }}
    </AppButton>

    <div
      v-if="isShowButtons"
      class="buttons"
    >
      <AppButton disabled>
        Disabled
      </AppButton>
      <AppButton loading>
        Loading
      </AppButton>
      <AppButton
        color="neutral-0"
        size="sm"
      >
        Создать
      </AppButton>
      <AppButton>
        Создать
      </AppButton>
      <AppButton color="neutral-0">
        Создать
      </AppButton>
      <AppButton color="neutral-1">
        Создать
      </AppButton>
      <AppButton
        color="neutral-1-20"
        size="sm"
        icon="→"
        trailing-icon
      >
        Создать
      </AppButton>
      <AppButton
        variant="nofilled"
        size="3xs"
        icon="?"
      />
      <AppButton
        color="neutral-1"
        size="3xs"
        icon="?"
      />
      <AppButton
        variant="lined"
        size="xxs"
        icon="→"
      />
      <AppButton
        variant="nofilled"
        size="xxs"
        icon="♘"
      />
      <AppButton
        variant="lined"
        size="xs"
        icon="→"
      />
      <AppButton
        size="xs"
        icon="+"
      />
      <AppButton
        size="sm"
        icon="X"
      />
      <AppButton
        variant="nofilled"
        size="sm"
        icon="≡"
      />
      <AppButton
        variant="lined"
        icon="🕭"
      />
      <AppButton
        icon="+"
      />
      <AppButton
        color="neutral"
        icon="♘"
      />
      <AppButton
        variant="nofilled"
        icon="←"
      >
        Назад
      </AppButton>
      <AppButton
        variant="nofilled"
        size="sm"
      >
        Сбросить все
      </AppButton>
      <AppButton
        variant="nofilled"
        size="xs"
      >
        Сбросить все
      </AppButton>
    </div>
  </div>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<style lang="scss">
.bg {
  @include text(bold, base);

  display: flex;
  flex-direction: column;
  gap: $space-4;

  padding: $space-10;
  color: $color-yellow-800;
  color: $color-primary;
  background-color: #242424;

}
</style>
