<script lang="ts">
import { ValidationError, type ObjectSchema } from 'yup'
import { formInjectionKey, type FormError, type FormInjection, type FormInputEvent } from '~/composables/useFormField'

interface Props<T extends Record<string, unknown>> {
  /**
    * Schema of Yup to validate the form state
    */
  schema?: ObjectSchema<T>
  /**
   * An object representing the current state of the form
   */
  state: T
  /**
   * The list of input events that trigger the form validation
   * @defaulvalue `"['blur', 'change', 'input']"`
   */
  validateOn?: FormInputEvent[]
}

interface Emits<T extends Record<string, unknown>> {
  error: [event: FormErrorEvent]
  submit: [event: FormSubmitEvent<T>]
}

type FormSubmitEvent<T extends Record<string, unknown>> = SubmitEvent & {
  data: T
}

type FormErrorEvent = SubmitEvent & {
  errors: FormError[]
}

export type { Props as FormProps, Emits as FormEmits, FormSubmitEvent, FormErrorEvent }
</script>

<script lang="ts" setup generic="N extends Record<string, unknown>">
const props = withDefaults(defineProps<Props<N>>(), {
  validateOn: () => ['blur', 'change', 'input'],
})

const emit = defineEmits<Emits<N>>()

const errors = ref<FormError[]>([])

const onSubmit = async (event: SubmitEvent) => {
  try {
    const data = await validate()

    errors.value = []
    const submitEvent = Object.assign(event, { data }) as FormSubmitEvent<N>

    emit('submit', submitEvent)
  }

  catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error
    }

    errors.value = getFieldErrors(error)
    const errorEvent: FormErrorEvent = Object.assign(event, { errors: errors.value })

    emit('error', errorEvent)
  }

  finally {
    //
  }
}

const validate = async () => {
  if (props.schema) {
    return props.schema?.validate(props.state, { abortEarly: false })
  }

  return props.state
}

const handleFieldEvent = async (name: string, event: FormInputEvent) => {
  if (!props.schema || !props.validateOn.includes(event)) {
    return
  }

  await validateField(name)
}

const validateField = async (name: string) => {
  if (!props.schema) {
    return
  }

  try {
    await props.schema.validateAt(name, props.state, { abortEarly: false })
    removeFieldErrors(name)
  }

  catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error
    }

    replaceFieldErrors(name, getFieldErrors(error, name))
  }
}

const removeFieldErrors = (name: string) => {
  errors.value = errors.value.filter(error => error.name !== name)
}

const replaceFieldErrors = (name: string, fieldErrors: FormError[]) => {
  removeFieldErrors(name)
  errors.value = [...errors.value, ...fieldErrors]
}

const getFieldErrors = (validationError: ValidationError, fallbackName?: string): FormError[] => {
  const validationErrors = validationError.inner.length
    ? validationError.inner
    : [validationError]

  return validationErrors.reduce<FormError[]>((errors, error) => {
    const name = error.path || fallbackName

    if (!name) {
      return errors
    }

    const existingError = errors.find(item => item.name === name)

    if (existingError) {
      existingError.message.push(error.message)
      return errors
    }

    errors.push({
      name,
      message: [error.message],
    })

    return errors
  }, [])
}

provide<FormInjection>(formInjectionKey, {
  errors: errors,
  handleFieldEvent,
})
</script>

<template>
  <form
    class="form"
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>
