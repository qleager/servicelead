import { ValidationError, type ObjectSchema } from 'yup'
import type { MaybeRefOrGetter, Ref } from 'vue'

interface Options<T extends Record<string, unknown>> {
  /**
   * Schema of Yup to validate the state
   */
  schema?: MaybeRefOrGetter<ObjectSchema<T> | undefined>
  /**
   * An object representing the current validation state
   */
  state: MaybeRefOrGetter<T>
}

type ValidationErrorItem = {
  /**
   * Name of validation field
   */
  name: string
  /**
   * Error messages of validation field
   */
  message: string[]
}

type UseValidationReturn<T extends Record<string, unknown>> = {
  clearErrors: () => void
  errors: Ref<ValidationErrorItem[]>
  getFieldError: (name: string) => ValidationErrorItem | undefined
  getFieldErrors: (validationError: ValidationError, fallbackName?: string) => ValidationErrorItem[]
  removeFieldErrors: (name: string) => void
  replaceFieldErrors: (name: string, fieldErrors: ValidationErrorItem[]) => void
  setErrors: (fieldErrors: ValidationErrorItem[]) => void
  validate: () => Promise<T>
  validateField: (name: string) => Promise<void>
}

export const useValidation = <T extends Record<string, unknown>>(options: Options<T>): UseValidationReturn<T> => {
  const errors = ref<ValidationErrorItem[]>([])

  const schema = computed(() => toValue(options.schema))

  const state = computed(() => toValue(options.state))

  const validate = async () => {
    if (!schema.value) {
      clearErrors()
      return state.value
    }

    try {
      const data = await schema.value.validate(state.value, { abortEarly: false })

      clearErrors()
      return data as T
    }

    catch (error) {
      if (!(error instanceof ValidationError)) {
        throw error
      }

      setErrors(getFieldErrors(error))
      throw error
    }
  }

  const validateField = async (name: string) => {
    if (!schema.value) {
      return
    }

    try {
      await schema.value.validateAt(name, state.value, { abortEarly: false })
      removeFieldErrors(name)
    }

    catch (error) {
      if (!(error instanceof ValidationError)) {
        throw error
      }

      replaceFieldErrors(name, getFieldErrors(error, name))
    }
  }

  const clearErrors = () => {
    errors.value = []
  }

  const getFieldError = (name: string) => {
    return errors.value.find(error => error.name === name)
  }

  const removeFieldErrors = (name: string) => {
    errors.value = errors.value.filter(error => error.name !== name)
  }

  const replaceFieldErrors = (name: string, fieldErrors: ValidationErrorItem[]) => {
    removeFieldErrors(name)
    errors.value = [...errors.value, ...fieldErrors]
  }

  const setErrors = (fieldErrors: ValidationErrorItem[]) => {
    errors.value = fieldErrors
  }

  const getFieldErrors = (validationError: ValidationError, fallbackName?: string): ValidationErrorItem[] => {
    const validationErrors = validationError.inner.length
      ? validationError.inner
      : [validationError]

    return validationErrors.reduce<ValidationErrorItem[]>((errors, error) => {
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

  return {
    clearErrors,
    errors,
    getFieldError,
    getFieldErrors,
    removeFieldErrors,
    replaceFieldErrors,
    setErrors,
    validate,
    validateField,
  }
}

export type { Options as UseValidationOptions, UseValidationReturn, ValidationErrorItem }
