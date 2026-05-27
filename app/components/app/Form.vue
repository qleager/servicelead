<script lang="ts">
import { ValidationError, type ObjectSchema } from 'yup'
import { formInjectionKey, type FormInjection, type FormInputEvent } from '~/composables/useFormField'
import type { ValidationErrorItem } from '~/composables/useValidation'

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
  errors: ValidationErrorItem[]
}

export type { Props as FormProps, Emits as FormEmits, FormSubmitEvent, FormErrorEvent }
</script>

<script lang="ts" setup generic="N extends Record<string, unknown>">
const props = withDefaults(defineProps<Props<N>>(), {
  validateOn: () => ['blur', 'change', 'input'],
})

const emit = defineEmits<Emits<N>>()

const validation = useValidation({
  schema: () => props.schema,
  state: () => props.state,
})

const onSubmit = async (event: SubmitEvent) => {
  try {
    const data = await validation.validate()

    const submitEvent = Object.assign(event, { data }) as FormSubmitEvent<N>

    emit('submit', submitEvent)
  }

  catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error
    }

    const errorEvent: FormErrorEvent = Object.assign(event, { errors: validation.errors.value })

    emit('error', errorEvent)
  }
}

const handleFieldEvent = async (name: string, event: FormInputEvent) => {
  if (!props.schema || !props.validateOn.includes(event)) {
    return
  }

  await validation.validateField(name)
}

provide<FormInjection>(formInjectionKey, {
  errors: validation.errors,
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
