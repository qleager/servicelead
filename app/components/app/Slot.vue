<!--
  Так как мы используем везде одну и туже конструкцию слота делаем компонент
  Идея такая:
    Передавать слот, на основе его имени делать обертку .modal__slot.modal__slot-{имя слота}
    Нужно сделать ресерч по основным доводам:
      0. целесообразность? == ресерч через джипити поддерживаем в нашей реализации
      1. Так как слоты бывают динамическими используем v-model -> разобраться насколько хорошая идея так делать
        1.1 Если просто name передать - это сработает?

  ++++++++++++++++++++++++++++
  Итого:
  есть такая реализацию через рендер-функцию состоряпанная через codex
  стоит оптимизировать
   1. как то интерфейс пропсов сделать? че там defineComponent дженерик тип
-->
<script lang="ts">
// WARNING: EXPEREMENTAL COMPONENT
import { defineComponent, getCurrentInstance, h } from 'vue'

export default defineComponent({
  name: 'AppSlot',
  props: {
    name: {
      type: String,
      default: 'default',
    },
    class: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance()

    return () => {
      const parentSlots = instance?.parent?.slots
      const namedSlot = slots[props.name] || parentSlots?.[props.name]
      const slotFn
        = namedSlot
          || slots.default
          || (props.name === 'default' ? parentSlots?.default : undefined)
      const content = slotFn ? slotFn() : undefined

      if (!content || content.length === 0) {
        return null
      }

      return h(
        'div',
        {
          class: [
            `${props.class}__slot`,
            props.name && `${props.class}__slot-${props.name}`,
          ],
        },
        content,
      )
    }
  },
})
</script>
