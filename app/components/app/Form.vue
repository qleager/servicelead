<script lang="ts">
import { ValidationError, type ObjectSchema } from 'yup'
import { formInjectionKey, type FormError, type FormInjection } from '~/composables/useFormField'

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
  validateOn?: ('input' | 'blur' | 'change' | 'focus')[]
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
const props = defineProps<Props<N>>()
const emit = defineEmits<Emits<N>>()

const errors = ref<FormError[]>([])

const validate = async () => {
  if (props.schema) {
    return props.schema?.validate(props.state, { abortEarly: false })
  }

  return props.state
}

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

provide<FormInjection>(formInjectionKey, {
  errors: errors,
})

const getFieldErrors = (validationError: ValidationError): FormError[] => {
  const validationErrors = validationError.inner

  return validationErrors.reduce<FormError[]>((errors, error) => {
    if (!error.path) {
      return errors
    }

    const existingError = errors.find(item => item.name === error.path)

    if (existingError) {
      existingError.message.push(error.message)
      return errors
    }

    errors.push({
      name: error.path,
      message: [error.message],
    })

    return errors
  }, [])
}
</script>

<template>
  <form
    class="form"
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>
