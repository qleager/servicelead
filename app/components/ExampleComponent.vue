<!-- Эталонный компонент‑гайд по оформлению компонентов в проекте -->

<!--
  Сначала — блок <script> с lang="ts" и директивой setup
-->
<script lang="ts" setup>
// Сначала импорты типов
import type { AsyncDataRequestStatus } from '#app'

// Затем прочие импорты
// Помним: в Nuxt многое автоимпортируется
import app from '~/app.vue'

// Далее — типы пропсов
interface Props {
  status: AsyncDataRequestStatus
  type: Type
  // Используем этот пропс когда компyент значительно видоизменяется
  // Например: кнопка solid    – залитая цветом
  //                  bordered - кнопка с бордером
  // Такой же методики придерживается Nuxt UI, можно посмотреть, чтобы понять
  variant: ''
}

// Затем — типы событий (emits)
interface Emits {
  callback: [Option]
}

// Прочие служебные типы
type Option = [Props['status'], Model]
type Model = number
type Type = 'root' | 'instance'

// Далее — все composables (включая проектные); исключение — хуки, запускающие побочные эффекты (например, useAsyncData)
const { versions } = useNuxtApp()

// Пропсы
// Если не используем их в <script>, объявляем без присваивания переменной
const props = defineProps<Props>()

// Эмиты
// Если не используем их в <script>, объявляем без присваивания переменной
defineEmits<Emits>()

// Да, порядок тот же, что и в Options API :)

// Независимо от контекста модель называем "model"
const model = defineModel<Model>({ default: 200 })

// Прочие реактивные переменные

// Нереактивные значения
// Подсказка: поставь курсор в кавычки и нажми Option+Esc (mac) / Alt+Esc (win) — типизация наше всё
// Так же если навоить на тип с зажатым commnad/ctrl - видим подробную типизацию
const option: Option = ['', 200]

// Вычисляемые свойства
// Всегда фиксируем классы‑состояния и навешиваем их на корневой элемент шаблона
const classname = computed(() => [
  'world',
  `world-status-${props.status}`,
  `world-type-${props.type}`,
])
const statusText = computed<string>(() => model.value === 200 ? 'Успех' : 'Не успех')
const startUpText = computed(() => props.status === 'idle' ? 'Не начинали' : 'Уже начали')

// Сетевые запросы — здесь
// useAsyncData()

// ℹ️ Если в какой‑то момент кажется, что логика перемешалась — раздели компонент на два (это нормально)

// Наблюдатели (watch)
watch(model, value => option[1] = value)

// События жизненного цикла
onMounted(() => {
  console.log(versions, ': mounted')
})

// Методы (обработчики событий)
const onClick = () => {
  new app()
}
const deleteWorld = () => {
  // @ts-expect-error: ignore example code
  // eslint-disable-next-line no-delete-var
  delete app
}
</script>

<template>
  <div :class="classname">
    <h1>Hello, World</h1>
    <p>{{ statusText }}</p>
    <p>{{ startUpText }}</p>
    <!--
      Всегда выносим обработчики в <script>.
      ⚠️ Здесь — никаких вычислений и условной логики.
      Допустимо только менять значение переменной,
      например, с true на false, с «открыть» на «закрыть».

      Классы именуем по методологии БЭМ.
    -->
    <button
      class="world__action world__button world__button-hello"
      @click="onClick"
    >
      Привет
    </button>
    <button
      class="world__action world__button world__button-delete"
      @click="deleteWorld"
    >
      Удалить
    </button>
    <!-- Слот всегда оборачиваем -->
    <div class="world__slot">
      <slot />
    </div>
  </div>
</template>

<!-- Только SCSS -->
<style lang="scss">
.world {
  $this: &;

  // Состояния компонента, навешанные на корневой элемент
  $status-idle: $this + '-status-idle';
  $status-pending: $this + '-status-pending';
  $type-root: $this + '-type-root';
  $type-instance: $this + '-type-instance';

  &__button {
    // Используем как модификаторы — почти БЭМ
    // ⬇️ Здесь: Если состояние компонента pending — кнопка недоступна для событий
    #{$status-pending} & {
      pointer-events: none;
    }
  }
}
</style>
