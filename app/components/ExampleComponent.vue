<!-- Эталонный компонент‑гайд по оформлению компонентов в проекте -->

<!-- Чеклист
  1. Перед началом разработки любого компонента (страница тоже компонент)
     - чекнуть его дизайн на мобилке
     - чекнуть дизайн где он используется или может использоваться
     - чекнуть данные, которые он использует (апи/пропсы)
     - пофантазировать как он может масштабироваться в будущем,
       и если не заложить основу под масштабирование, то хотя бы этому масштабированию не навредить 🤓
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

  Так реально получается делать быстрее процентов на 30% компонент, меньше допускать в процессе логических ошибок, и тратить времени на их исправление

  Если будут какие-то предложения, особенно полученные опытным путем – пишите
-->

<!--
  В примере будем делать диалоговое окно

  Итак, блок <script> с lang="ts" и директивой setup начало любого компонента
-->
<script lang="ts" setup>
// Сначала делаем импорты типов
import type { ModalModel } from '@app/components/app/Modal.vue'
import type { VNodeChild } from 'vue'

// Затем прочие импорты
// ℹ️ Nuxt автоимпортирует многие вещи, в отличие от Vue

// Далее — типы пропсов
interface Props {
  title?: string
  // Используем этот пропс когда компонент значительно видоизменяется
  // Например: кнопка solid    – залитая цветом
  //                  bordered - кнопка с бордером
  // Такой же методики придерживается Nuxt UI, можно посмотреть, чтобы понять
  // Тут например, окна диалога как карточка, или на весь экран
  variant?: 'card' | 'full'
}

// Затем тип эмитов
interface Emits {
  close: [Close]
}

// Затем тип model
// ℹ️ На проекте мы используем model как основное, самое главное, состояние компонента.
//    в этом кейсе это - открыто или закрыто окно
type Model = boolean

// Затем тип слотов
interface Slots {
  default?: (props: { isOpen: ModalModel }) => VNodeChild
  content: (props: { isOpen: ModalModel }) => VNodeChild
}

// Прочие служебные типы
type Close = 'accept' | 'reject'

// Type Guards
const isCloseString = (close: Close): close is Exclude<Close, 'accept'> => {
  return typeof close === 'string' && close !== null
}

// Далее — все composables (включая проектные); исключение — хуки, запускающие побочные эффекты (например, useAsyncData)
const { current: currentBreakpoint } = useBreakpoints()

// Пропсы
// Если не используем их в <script>, объявляем без присваивания переменной
const props = withDefaults(defineProps<Props>(), {
  title: 'Вы уверены?',
})

// Эмиты
// Если не используем их в <script>, объявляем без присваивания переменной
const emits = defineEmits<Emits>()

// Да, порядок почти как в Options API :)

// Независимо от контекста модель называем "model"
const model = defineModel<Model>({ default: false })

defineSlots<Slots>()

// Прочие реактивные переменные

// Нереактивные значения
// ℹ️ Пример, как типизация помогает помимо предотвращения ошибок:
//    поставь курсор в кавычки и нажми Option+Esc (mac) / Ctrl+Space (win);
//    Также если наводить на тип с зажатым command/ctrl - видим подробную типизацию
// @ts-expect-error: example error
const closePayloads: Close[] = ['accept', '']

// Вычисляемые свойства
// Фиксируем классы‑состояния навешиванием их только на корневой элемент шаблона
// ℹ️ Так делаем для особого подходу к стилизации на проекте - о нем будет дальше
const classname = computed(() => [
  'confirm-dialog',
  `confirm-dialog-${props.variant}`,
])

const titleLength = computed(() => props.title.length)

// Сетевые запросы — здесь
// useAsyncData()

// ℹ️ Если в какой‑то момент кажется, что логика перемешалась — раздели компонент на два (это нормально)
//    Например: _ConfirmDialogActions (нижнее подчеркивание обозначает исключительную принадлежность родителю)

// Наблюдатели (watch)
watch(currentBreakpoint, value => console.log(`Breakpoint is ${value}`))

// События жизненного цикла
onMounted(() => {
  console.log(`Title length is ${titleLength.value}`)
  console.log(`Confirm is opened: ${model.value}`)
  console.log(closePayloads)

  if (isCloseString('accept')) {
    console.log()
  }
})

// Методы (обработчики событий)
const onAcceptClick = () => {
  emits('close', 'accept')
}

const onRejectClick = () => {
  emits('close', 'reject')
}
</script>

<template>
  <AppModal
    :class="classname"
  >
    <template #title>
      <div class="confirm-dialog__title">
        {{ title }}
      </div>
    </template>
    <template #content>
      ...
    </template>
    <template #footer>
      <!--
      Всегда выносим обработчики в <script>.
      ⚠️ Здесь — никаких вычислений и условной логики(??, if(), *?*:*)).
      Допустимо только менять значение переменной,
      например, с true на false, с «открыть» на «закрыть» и $emit

      Классы именуем по методологии БЭМ.
    -->
      <AppButton
        color="neutral"
        class="confirm-dialog__reject"
        @click="onRejectClick"
      >
        Нет
      </AppButton>
      <AppButton
        class="confirm-dialog__accept"
        @click="onAcceptClick"
      >
        Да
      </AppButton>
    </template>
  </AppModal>
</template>

<!-- Только SCSS -->
<style lang="scss">
.confirm-dialog {
  $this: &;

  // Состояния компонента, навешанные на корневой элемент
  $variant-card: $this + '-variant-card';
  $variant-full: $this + '-variant-full';

  // Тут стили для .confirm-dialog

  // Потом псевдоклассы
  &:hover {
    pointer-events: all;
  }

  // Потом состояния
  &#{$variant-full} {
    width: 100%;
    height: 200%;
  }

  // Потом элементы компонента
  &__reject {
    // Стили элемента компонента

    // Потом псевдоклассы элемента
    &:hover {
      opacity: 0.5;
    }

    // И потом стили элемента при состоянии компонента
    // ℹ️ Что тут происходит:
    //    кнопка отмены должна быть некликабельной, когда компонент в состоянии variant-full /
    //    кнопка отмены должна быть некликабельной, когда компоненту задан пропс variant как full
    #{$variant-full} & {
      pointer-events: none;
    }
  }

  &__accept {
    pointer-events: none;

    #{$variant-full} & {
      pointer-events: none;
    }
  }

  // ⛔️ Как не надо делать:
  // Вкладывать в состояние элементы
  &#{$variant-full} & {
    &__reject {
      pointer-events: none;
    }

    &__accept {
      pointer-events: none;
    }
  }

  // Объединять состояния
  &#{$variant-full}#{$variant-card} {
    display: none;
  }

  &__title {
    display: block;
    width: 100%;

    // Если есть миксин, который добавляют правила - в порядке правил миксин должны быть там же где и его правила
    @include text(light, 2xs);

    text-align: center;
  }

}
</style>
