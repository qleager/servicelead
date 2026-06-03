import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppCode from '@components/app/Code.vue'

const javascriptExample = `<form class="sltop__form"
  action="https://newapi.ru/ct/addorders?idg">

  <h2>Заказ звонка</h2>

  <p>
    <input name="fullname"
      type="text"
      placeholder="Как к вам обращаться">
  </p>

  <p>
    <input name="phone"
      type="tel"
      placeholder="+7 999 123-45-67">
  </p>

  <p>
    <textarea name="work"
      placeholder="Опишите задачу"></textarea>
  </p>

  <!-- Скрытые поля -->
  <input type="hidden" name="sub_id" value="">
  <input type="hidden" name="input" value="1">

  <button type="submit">Отправить заявку</button>

</form>`

export default {
  title: 'App/Code',
  component: AppCode,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props
    code: {
      control: 'text',
    },
    lang: {
      control: 'select',
      options: ['javascript', 'markup'],
    },
    title: {
      control: 'text',
    },
  },
  args: {
    code: javascriptExample,
    lang: 'javascript',
    title: 'example.js',
  },
} satisfies Meta<typeof AppCode>

type Story = StoryObj<typeof AppCode>

export const Playground: Story = {
  render: args => ({
    components: { AppCode },
    setup: () => ({ args }),
    template: `
      <div style="width: min(720px, calc(100vw - 48px));">
        <AppCode
          :code="args.code"
          :lang="args.lang"
          :title="args.title"
        />
      </div>
    `,
  }),
}
