import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppButton from '@components/app/Button.vue'
import AppCheckbox from '@components/app/Checkbox.vue'
import AppForm, { type FormSubmitEvent } from '@components/app/Form.vue'
import AppFormField from '@components/app/FormField.vue'
import AppInput from '@components/app/Input.vue'
import { boolean, object, string, type InferType } from 'yup'
import { reactive } from 'vue'

const schema = object({
  email: string()
    .email('Введите корректный email')
    .required('Обязательное поле'),
  password: string()
    .min(8, 'Минимум 8 символов')
    .required('Обязательное поле'),
  rememberMe: boolean(),
})

type Schema = InferType<typeof schema>

export default {
  title: 'App/Form',
  // @ts-expect-error: похуй + похуй
  component: AppForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    validateOn: {
      control: 'check',
      options: ['blur', 'change', 'input'],
    },
    state: {
      table: { category: 'behavioral props' },
    },
    schema: {
      table: { category: 'behavioral props' },
    },
    // Slots
    default: {
      control: 'boolean',
      table: { category: 'slots' },
    },
  },
  args: {
    validateOn: ['blur', 'change', 'input'],
    default: true,
  },
} satisfies Meta<typeof AppForm>

type Story = StoryObj<typeof AppForm>

export const Playground: Story = {
  render: args => ({
    components: {
      AppButton,
      AppCheckbox,
      AppForm,
      AppFormField,
      AppInput,
    },
    setup() {
      const state = reactive<Schema>({
        email: undefined!,
        password: undefined!,
        rememberMe: true,
      })

      const onSubmit = (event: FormSubmitEvent<Schema>) => {
        alert('Типа отправилась' + event)
      }

      return {
        args,
        onSubmit,
        schema,
        state,
      }
    },
    template: `
      <div style="width: 402px; max-width: calc(100vw - 32px);">
        <AppForm
          :schema="schema"
          :state="state"
          :validate-on="args.validateOn"
          @error="onError"
          @submit="onSubmit"
        >
          <div
            v-if="args.default"
            style="display: flex; flex-direction: column; gap: 16px;"
          >
            <AppFormField
              name="email"
              title="E-mail"
              style="width: 100%"
            >
              <AppInput
                v-model="state.email"
                autocomplete="username"
                placeholder="Введите e-mail"
                style="width: 100%;"
                type="text"
              />
            </AppFormField>

            <AppFormField
              name="password"
              title="Пароль"
              style="width: 100%"
            >
              <AppInput
                v-model="state.password"
                autocomplete="current-password"
                icon="eye"
                placeholder="Введите пароль"
                style="width: 100%;"
                trailing-icon
                type="password"
              />
            </AppFormField>

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
              <AppCheckbox
                v-model="state.rememberMe"
                label="Запомнить"
                name="rememberMe"
              />
            </div>

            <AppButton
              style="justify-content: center; width: 100%;"
              type="submit"
            >
              Войти
            </AppButton>
          </div>
        </AppForm>
      </div>
    `,
  }),
}
