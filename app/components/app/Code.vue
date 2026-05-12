<script lang="ts" setup>
// IDEA: автоматическое определение языка? или просто пропс lang? или оставляем его в title, типа "HTML · Contact Form"?
interface Props {
  title?: string
}

defineProps<Props>()

const codeRef = ref<HTMLElement | null>(null)

const copyCode = (): void => {
  const text = codeRef.value?.textContent

  if (text) {
    copyToClipboard(text)
  }
}

export type { Props as CodeProps }
</script>

<template>
  <div class="code">
    <div
      class="code__head"
    >
      <div
        v-if="title"
        class="code__title"
      >
        {{ title }}
      </div>

      <AppTooltip>
        <AppButton
          color="neutral"
          icon="Copy"
          variant="link"
          @click="copyCode"
        />
        <template #content>
          Скопировать код
        </template>
      </AppTooltip>
    </div>

    <pre class="code__pre"><code
        ref="codeRef"
        class="code__content"
    ><slot /></code></pre>
  </div>
</template>

<style lang="scss">
.code {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: $space-2 $space-2 $space-2 $space-6;
    border: 1px solid $color-neutral-150;
    border-top-left-radius: $space-6;
    border-top-right-radius: $space-6;

    background: $color-neutral-50;
  }

  &__title {
    @include text(regular, sm);

    color: $color-neutral-600;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  &__pre {
    overflow-y: scroll;

    max-height: 274px;
    margin: 0;
    border: 1px solid $color-neutral-150;
    border-top: none;
    border-bottom-right-radius: $space-6;
    border-bottom-left-radius: $space-6;
  }

  &__content {
    display: block;
    padding: $space-4;

    @include text(regular, sm);
  }
}
</style>
