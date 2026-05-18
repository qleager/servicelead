import type { ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'

interface Props {
  error?: boolean
  name?: string
}

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
}

type FormFieldInjection = {
  errorMessage?: ComputedRef<string | undefined>
  name: ComputedRef<string | undefined>
}

export const formInjectionKey = Symbol('form') as InjectionKey<FormInjection>
export const formFieldInjectionKey = Symbol('form-field') as InjectionKey<FormFieldInjection>

export const useFormField = (props?: MaybeRefOrGetter<Props | undefined>) => {
  const field = inject(formFieldInjectionKey, null)

  const name = computed(() => toValue(props)?.name ?? field?.name.value)
  const error = computed(() => toValue(props)?.error || Boolean(errorMessage.value))
  const errorMessage = computed(() => field?.errorMessage?.value)

  return {
    error,
    errorMessage,
    name,
  }
}

export type { FormError, FormFieldInjection, FormInjection, Props as UseFormFieldProps }
