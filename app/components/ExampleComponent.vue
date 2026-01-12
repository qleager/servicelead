<!-- Эталонный компонент‑гайд по оформлению компонентов в проекте -->

<!-- Чеклист
  1. Перед началом разработки любого компонента (страница тоже компонент)
     - чекнуть его дизайн на мобилке
     - чекнуть дизайн где он используется или может использоваться
     - чекнуть данные, которые он использует (апи/пропсы)
     - пофантазировать как он может масштабироваться в будущем,
       и если не заложить основу под масштабирование, то хотя бы это масштабированию не навредить 🤓
     ⚠️ После этого уже принять решение по структуре и логике
  2. Создать пропсы
  3. Сетевой запрос, если требуется, или импорт иных данных
  4. Создать эмиты
  5. Верстка темплейта
     - расставляем пропсы
     - асинхронные данные
     - создаем computed'ы
     - вешаем события
  6. Создаем обработчики событий и действия
     - Обрабатываем события (типа клики и т.д.)
     - Описываем побочные actions (например: запросы к апи, при удалении/добавлении чего-либо)
  7. Стилизация
  8. Тыкаем-смотрим, что вышло – вносим правки

  ❇️ Коротко резюмируя: сначала все изучаем, потом все данные собираем, потом их размещаем, потом ими манипулируем, а после стилизуем

  Так реально получается быстрее процентов на 30% делать компонент,
  меньше допускать в процессе логических ошибок, и тратить времени на их исправление

  Если будут какие-то предложения, особенно полученные опытным путем – пишите
-->

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

// Type Guards
const isOptionObject = (option: Option): option is Exclude<Option, Type> => {
  return typeof option === 'object' && option !== null && 'value' in option
}

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
// Подсказка: поставь курсор в кавычки и нажми Option+Esc (mac) / Ctrl+Space (win) — типизация наше всё
// Так же если навоить на тип с зажатым commnad/ctrl - видим подробную типизацию
const option: Option = ['', 200]

// Вычисляемые свойства
// Фиксируем классы‑состояния навешиванием их только на корневой элемент шаблона
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
      ⚠️ Здесь — никаких вычислений и условной логики(??, if(), *?*:*)).
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

<!-- ℹ️ Более подробно о стилизации ⬇️ -->
<style lang="scss">
@use 'sass:color';

// На примере стилей для AppInput
.input {
  // Состояния комопонента
  $this: &;
  $variant-lined: $this + '-variant-lined';
  $variant-filled: $this + '-variant-filled';
  $color-lighter: $this + '-color-lighter';
  $color-darker: $this + '-color-darker';
  $error: $this + '-error';
  $rounded: $this + '-rounded';
  $size-md: $this + '-size-md';
  $size-sm: $this + '-size-sm';
  $icon: $this + '-icon';
  $trailing-icon: $this + '-icon-trailing';

  // Стили блока
  position: relative;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: fit-content;
  min-width: 250px;
  height: 48px;

  /*
   * Состояние компонент – его пропсы и model
   * Блок – главный элемент в верстке (.input)
   * Элемент - элементы верстки внутри блока (.input__field)
   *
   * Все, что состояния компонета хуярим как интерполяцию (#{$icon})
   * Так мы понимаем, где состояние, а где БЭМ (верстка)
   *
   * Коротко: .элемент { #{$состояние-компонента} & { ... } }
   *
   * ⚠️ Модификатор !== состояние компонента
   * ⛔️ Вложеине состояния в состояние запрещено:
   *      #{$trailing-icon} {
   *        &#{$size-sm} {}
   *      }
   */

  // Стили блока при состоянии компонента trailing-icon
  &#{$trailing-icon} {
    justify-content: flex-end;
  }

  // Стили блока при состоянии компонента
  &#{$size-sm} {
    height: 40px;
  }

  // Стили блока при состоянии компонента
  &#{$size-md} {
    height: 48px;
  }

  // Стили элемента блока
  &__icon {
    pointer-events: none;
    margin-inline: $space-4 0;

    // Стиль элемента блока при состоянии компонента $trailing-icon
    #{$trailing-icon} & {
      order: 1;
      margin-inline: 0 $space-3;
    }
  }

  // Стиль элемента блока
  &__field {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 $space-4;
    border: 1px solid transparent;
    border-radius: $radius-2;

    background-color: transparent;

    @include text(regular, sm);

    // Стиль элемента блока при состоянии компонента $variant-lined
    #{$variant-lined} & {
      border: 1px solid $color-neutral-300;
      background: none !important;

      &:focus {
        border-color: $color-neutral-900;
      }
    }

    #{$variant-filled} & {
      border: none;
      background: transparent;

      &:hover::placeholder {
        color: $color-neutral-900;
      }
    }

    #{$rounded} & {
      border-radius: 50px;
    }

    #{$color-darker} & {
      border-color: $color-neutral-300;
      background-color: $color-neutral-300;
    }

    #{$color-lighter} & {
      border-color: $color-neutral-50;
      background-color: $color-neutral-50;
    }

    #{$error} & {
      border: 1px solid $color-error;
      color: $color-error;
      background-color: color.adjust($color-error, $lightness: 48%);

      &:focus {
        border-color: inherit;
      }
    }

    #{$icon} & {
      padding-inline: $space-12 $space-4;
    }

    #{$trailing-icon} & {
      padding-inline: $space-4 $space-12;
    }

    &::placeholder {
      @include text(regular, sm);

      color: $color-neutral-400;

      #{$error} & {
        color: color.adjust($color-error, $lightness: 25%);
      }
    }

    &:disabled {
      pointer-events: none;
      filter: brightness(1.2);
    }
  }

  &__reset {
    margin-right: $space-3;
    margin-left: auto;
  }
}
</style>

