import { setLocale } from 'yup'

export default defineNuxtPlugin(() => {
  setLocale({
    mixed: {
      required: 'Обязательное поле',
    },
    string: {
      email: 'Введите корректный email',
      min: ({ min }) => `Минимум ${min} символов`,
    },
  })
})
