# Validation

Validation is built with [`yup`](https://github.com/jquense/yup).

Project-wide rules: [app/plugins/yup.ts](../app/plugins/yup.ts)
Types: [app/types/plugins/yup.d.ts](../app/types/plugins/yup.d.ts)

## With `AppForm`

`AppForm` accepts `schema` and `state`, validates the form on `submit`, and returns the result through events:

- `@submit` — emitted when the schema validation passes. `event.data` contains the validated data.
- `@error` — emitted when validation fails. `event.errors` contains the form errors array.

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

`AppFormField` links a field to its errors by `name`. If it contains a component that uses `useFormField` (for example, `AppInput`), you do not have to pass `name` to that component: it will take the name from the closest `AppFormField`.

By default, each field is revalidated on `blur`, `change`, and `input`. You can change the event list with `validate-on`:

```vue
<AppForm
  :schema
  :state
  :validate-on="['blur', 'change']"
>
  ...
</AppForm>
```

## Without `AppForm`

If a form does not use `AppForm`, you can validate the schema directly. In this case, error rendering and the validation trigger should be handled inside the component.

```ts
import { ValidationError, object, string } from 'yup'

const schema = object({
  email: string().email().required(),
  phone: string().phone().required(),
})

const state = reactive({
  email: '',
  phone: '',
})

const errors = ref<Record<string, string>>({})

const validate = async () => {
  try {
    await schema.validate(state, { abortEarly: false })
    errors.value = {}
  }
  catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error
    }

    errors.value = error.inner.reduce<Record<string, string>>((result, item) => {
      if (item.path && !result[item.path]) {
        result[item.path] = item.message
      }

      return result
    }, {})
  }
}
```

Use `validateAt` to validate a single field:

```ts
await schema.validateAt('email', state, { abortEarly: false })
```
