<script setup lang="ts">
import { ref } from 'vue'
import type { TabsItem } from './components/App/Tabs.vue'

const isShowButtons = ref<boolean>(false)
const error = ref<string>('')

const activeTab = ref('a')

const tabs = ref<TabsItem[]>([
  { label: 'Tab A', value: 'a' },
  { label: 'Tab B', value: 'b', disabled: true },
  { label: 'Tab C', value: 'c', icon: '→' },
  { label: 'Tab D', value: 'd', icon: '🕭', trailingIcon: true },
])
</script>

<template>
  <div class="bg">
    HELLO WORLD!
    <AppTabs
      v-model="activeTab"
      :items="tabs"
      size="sm"
      color="neutral-1-20"
      variant="lined"
    />
    <AppButton
      variant="nofilled"
      @click="error = error ? '' : 'Ошибка'"
    >
      {{ error ? 'Скрыть ошибку' : 'Показать ошибку' }}
    </AppButton>
    <div class="label-wrapper">
      <AppLabel
        title="Лейбл"
        :error="error"
        caption="caption"
        required
      >
        <AppInput
          type="search"
        />
      </AppLabel>
    </div>

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

.buttons {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.label-wrapper {
  padding: $space-8;
  background-color: $color-neutral-light-50;
}
</style>
