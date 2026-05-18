import type { ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, toValue } from 'vue'

interface Props {
  error?: boolean
  name?: string
}

type FormInputEvent = 'blur' | 'change' | 'input' | 'focus'

type FormError = {
  /**
   * Name of validation field
   */
  name: string
  /**
   * Error messages of validation field
   */
  message: string[]
}

type FormInjection = {
  errors: Ref<FormError[]>
  validateField: (name: string, event: FormInputEvent) => Promise<void>
}

type FormFieldInjection = {
  errorMessage?: ComputedRef<string | undefined>
  name: ComputedRef<string | undefined>
}

export const formInjectionKey = Symbol('form') as InjectionKey<FormInjection>
export const formFieldInjectionKey = Symbol('form-field') as InjectionKey<FormFieldInjection>

export const useFormField = (props?: MaybeRefOrGetter<Props | undefined>) => {
  const form = inject(formInjectionKey, null)
  const field = inject(formFieldInjectionKey, null)

  const name = computed(() => toValue(props)?.name ?? field?.name.value)
  const errorMessage = computed(() => field?.errorMessage?.value)
  const error = computed(() => toValue(props)?.error || Boolean(errorMessage.value))

  const emitFormBlur = async () => {
    if (name.value) {
      await form?.validateField(name.value, 'blur')
    }
  }

  const emitFormChange = async () => {
    if (name.value) {
      await form?.validateField(name.value, 'change')
    }
  }

  const emitFormFocus = async () => {
    if (name.value) {
      await form?.validateField(name.value, 'change')
    }
  }

  const emitFormInput = async () => {
    if (name.value) {
      await form?.validateField(name.value, 'input')
    }
  }

  return {
    error,
    errorMessage,
    name,
    emitFormBlur,
    emitFormChange,
    emitFormFocus,
    emitFormInput,
  }
}

export type { FormError, FormFieldInjection, FormInjection, FormInputEvent, Props as UseFormFieldProps }
