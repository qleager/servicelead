import { setLocale } from 'yup'

export default defineNuxtPlugin(() => {
  setLocale({
    array: {
      length: ({ length }) => `Должно быть ровно ${length} элементов`,
      max: ({ max }) => `Должно быть не больше ${max} элементов`,
      min: ({ min }) => `Должно быть не меньше ${min} элементов`,
    },
    boolean: {
      isValue: 'Значение должно быть подтверждено',
    },
    date: {
      max: ({ max }) => `Дата должна быть не позже ${max}`,
      min: ({ min }) => `Дата должна быть не раньше ${min}`,
    },
    mixed: {
      default: 'Некорректное значение',
      defined: 'Поле должно быть заполнено',
      notNull: 'Поле не может быть пустым',
      notOneOf: ({ values }) => `Значение не должно быть одним из: ${values}`,
      notType: 'Некорректный тип значения',
      oneOf: ({ values }) => `Значение должно быть одним из: ${values}`,
      required: 'Обязательное поле',
    },
    number: {
      integer: 'Введите целое число',
      lessThan: ({ less }) => `Число должно быть меньше ${less}`,
      max: ({ max }) => `Число должно быть не больше ${max}`,
      min: ({ min }) => `Число должно быть не меньше ${min}`,
      moreThan: ({ more }) => `Число должно быть больше ${more}`,
      negative: 'Введите отрицательное число',
      positive: 'Введите положительное число',
    },
    object: {
      exact: ({ properties }) => `Объект содержит неизвестные поля: ${properties.join(', ')}`,
      noUnknown: ({ unknown }) => `Объект содержит неизвестные поля: ${unknown.join(', ')}`,
    },
    string: {
      datetime: 'Введите корректную дату и время в формате ISO',
      datetime_offset: 'Введите дату и время в формате ISO с часовым поясом UTC',
      datetime_precision: ({ precision }) => `Введите дату и время в формате ISO с точностью до ${precision} знаков`,
      email: 'Введите корректный email',
      length: ({ length }) => `Должно быть ровно ${length} символов`,
      lowercase: 'Введите текст в нижнем регистре',
      matches: 'Значение имеет неверный формат',
      max: ({ max }) => `Максимум ${max} символов`,
      min: ({ min }) => `Минимум ${min} символов`,
      trim: 'Уберите пробелы в начале и конце',
      uppercase: 'Введите текст в верхнем регистре',
      url: 'Введите корректный URL',
      uuid: 'Введите корректный UUID',
    },
    tuple: {
      notType: 'Некорректный формат кортежа',
    },
  })
})
