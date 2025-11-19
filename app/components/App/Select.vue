<script lang="ts" generic="V" setup>
// TODO: делаем просто самую базу
// селект самый сложный компонент для реализации всегда
interface Props {
  items: (Item | string | number | V)[]
  // Когда multiple мы как "options" используем AppCheckbox
  multiple?: boolean
  // Когда multiple=true показывать выбранные селекты как число или список (props.counter)
  // Когда counter=list placeholder переходит на бордер при focus и заполнено (тут рушиться дс, но похуй)
  // TODO: сделать проверку на multiple (это оставляем на потом)
  counter?: 'number' | 'list' // def number
  search?: boolean
  // в макете lg у нас будет md (Почему?: кнопка-комопнент h48px это md, значит и инпут h48px это md, а не lg)
  size?: 'md' | 'xxs' // def md
  placeholder?: string
  label?: string
  resetAll?: boolean
}

interface Item {
  label: string
  value: V
  // onClick: () => На будущее. Пригодится потом когда надо будет делаеть разные действия при выборе, чтобы не городить емиты (не удалять этот комент)
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  counter: 'number',
  search: false,
  size: 'md',
  placeholder: 'Выберите...',
  label: undefined,
  resetAll: true,
})

const model = defineModel<V | V[]>()

const searchQuery = ref('')

const normalizedItems = computed(() =>
  props.items.map((i) => {
    if (typeof i === 'string' || typeof i === 'number') {
      return { label: String(i), value: i }
    }
    return i
  }),
)

const filteredItems = computed(() =>
  normalizedItems.value.filter(i =>
    i.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const classnameTrigger = computed(() => [
  `select__trigger`,
  `select__trigger-size-${props.size}`,
])

onMounted(() => {
  if (props.multiple) {
    if (!Array.isArray(model.value)) model.value = []
  }
  else {
    if (model.value === undefined) model.value = null
  }
})

const toggle = (v: V) => {
  if (!props.multiple) {
    model.value = v
    return
  }

  const arr = model.value as V[]
  if (arr.includes(v)) {
    model.value = arr.filter(i => i !== v)
  }
  else {
    model.value = [...arr, v]
  }
}

const resetAll = () => {
  if (props.multiple) {
    model.value = []
  }
  else {
    model.value = null
  }
}
</script>

<template>
  <div class="select">
    <select hidden />
    <AppDropdown>
      <div :class="classnameTrigger">
        <span
          v-if="size === 'md' && label"
          class="select__label--floating"
        >
          {{ label }}
        </span>
        <template v-if="model.length">
          <div class="select__trigger-chosen ">
            <AppTag
              v-for="value in model"
              :key="value"
            >
              {{ value }}
            </AppTag>
          </div>
          <!-- TODO: Заменить на AppIcon -->
          ⯆
        </template>
        <span
          v-else
          class="select__placeholder"
        >
          {{ placeholder }}
        </span>
      </div>
      <template #content>
        <AppInput
          v-if="search"
          v-model="searchQuery"
          class="select__search"
          placeholder="Поиск"
          icon="search"
          icon-trailing
          color="lighter"
          variant="filled"
        />
        <div class="select__list">
          <AppCheckbox
            v-for="i in filteredItems"
            :key="i.value"
            :model-value="props.multiple ? model.includes(i.value) : model === i.value"
            :label="i.label"
            @update:model-value="toggle(i.value)"
          />
        </div>
        <div class="select__actions">
          <AppButton
            v-if="multiple && props.resetAll"
            variant="nofilled"
            color="tab-nofilled"
            @click.stop="resetAll"
          >
            Очистить все
          </AppButton>
        </div>
      </template>
    </AppDropdown>
  </div>
</template>

<style lang="scss" scoped>
.select {
  $this: &;
  $size-xxs: $this + '__trigger-size-xxs';
  $size-md: $this + '__trigger-size-md';

  width: fit-content;

  &__trigger {
    cursor: pointer;

    position: relative;

    display: flex;
    gap: $space-1;
    justify-content: space-between;

    min-width: 100px;
    max-width: 100%;
    border: 1px solid $color-neutral-light-200;

    &-chosen {
      display: flex;
      gap: $space-1;
    }
  }

  &__label--floating {
    pointer-events: none;

    position: absolute;
    top: 0;
    left: $space-4;
    transform: translateY(-50%);

    padding: 0 $space-1;

    font-size: 12px;
    color: $color-neutral-dark;

    background-color: white;
  }

  &__list {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: $space-1;

    max-height: 180px;
    padding-right: $space-4;
  }

  &__actions {
    display: flex;
    justify-content: flexз-end;
  }

  #{$size-xxs} {
      height: 24px;
      padding: $space-1 $space-1 $space-1 $space-3;
      border-radius: 24px;
      font-size: 12px;
  }

  #{$size-md} {
      height: 48px;
      padding: $space-3 $space-2 $space-3 $space-4;
      border-radius: $radius-2;
      font-size: 14px;
  }
}
</style>
