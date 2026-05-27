# useValidation composable

Validation is built with [`yup`](https://github.com/jquense/yup).

Project-wide Yup setup:
- Locale and custom rules: [app/plugins/yup.ts](../../app/plugins/yup.ts)
- Type extensions: [app/types/plugins/yup.d.ts](../../app/types/plugins/yup.d.ts)

## Location
- Source: [app/composables/useValidation.ts](../../app/composables/useValidation.ts)
- Form wrapper: [app/components/app/Form.vue](../../app/components/app/Form.vue)

## API

### useValidation(options)

Options:
- `schema?: ObjectSchema<T>` - Yup schema used to validate the state
- `state: T` - reactive object or getter with validation data

Returns:
- `errors` - `Ref<ValidationErrorItem[]>`
- `validate()` - validates the whole state and returns validated data
- `validateField(name)` - validates one field by path
- `getFieldError(name)` - returns the current error object for a field
- `setErrors(errors)` - replaces all errors
- `clearErrors()` - removes all errors
- `removeFieldErrors(name)` - removes errors for one field
- `replaceFieldErrors(name, errors)` - replaces errors for one field
- `getFieldErrors(validationError, fallbackName?)` - converts Yup `ValidationError` into app errors

Error format:

```ts
type ValidationErrorItem = {
  name: string
  message: string[]
}
```

## With AppForm

Use `AppForm` for regular forms. It accepts `schema` and `state`, validates on submit, and provides field errors to nested form fields.

```vue
<script lang="ts" setup>
import { object, string, type InferType } from 'yup'
import type { FormErrorEvent, FormSubmitEvent } from '~/components/app/Form.vue'

const schema = object({
  email: string().email().required(),
  phone: string().phone().required(),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: '',
  phone: '',
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data)
}

const onError = async (event: FormErrorEvent) => {
  console.log(event.errors)
}
</script>

<template>
  <AppForm
    :schema
    :state
    @error="onError"
    @submit="onSubmit"
  >
    <AppFormField
      name="email"
      title="E-mail"
    >
      <AppInput
        v-model="state.email"
        autocomplete="email"
        type="text"
      />
    </AppFormField>

    <AppFormField
      name="phone"
      title="Phone"
    >
      <AppInput
        v-model="state.phone"
        autocomplete="tel"
        type="text"
      />
    </AppFormField>

    <AppButton type="submit">
      Save
    </AppButton>
  </AppForm>
</template>
```

Events:
- `@submit` - emitted when validation passes; `event.data` contains validated data
- `@error` - emitted when validation fails; `event.errors` contains validation errors

By default, fields are revalidated on `blur`, `change`, and `input`. Change the event list with `validate-on`:

```vue
<AppForm
  :schema
  :state
  :validate-on="['blur', 'change']"
>
  ...
</AppForm>
```

> [!Note]
> Field errors are passed to inputs through Vue injections by `useFormField`. In most cases, set the same `name` on `AppFormField` as in the Yup schema and keep the input inside that field.

## Without AppForm

Use `useValidation` directly when validation is needed outside a form wrapper: filters, dialogs, inline editors, wizard steps, or any component that owns its own validation UI.

```vue
<script lang="ts" setup>
import { ValidationError, object, string, type InferType } from 'yup'

const schema = object({
  email: string().email().required(),
  phone: string().phone().required(),
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
  email: '',
  phone: '',
})

const validation = useValidation({
  schema: () => schema,
  state: () => state,
})

const onSave = async () => {
  try {
    const data = await validation.validate()

    console.log(data)
  }

  catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error
    }
  }
}
</script>
```

Validate one field manually:

```ts
await validation.validateField('email')
```

Read an error manually:

```ts
const emailError = computed(() => validation.getFieldError('email')?.message[0])
```

## Notes

- `validate()` updates `errors`: clears them on success and fills them on Yup validation errors.
- `validateField(name)` updates only errors for the provided field.
- Use Yup `InferType<typeof schema>` for the state and submit event types.
- Keep schema field names and `AppFormField` names aligned.
