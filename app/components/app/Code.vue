<script lang="ts" setup>
interface Props {
  code: string
  lang: UseHighlighterLang
  title?: string
}

const props = defineProps<Props>()

const { highlight } = useHighlighter()

const highlightedCode = highlight(props.code, { lang: props.lang })

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

      <AppCopyToClipboard :source="code" />
    </div>

    <pre class="code__pre"><code
      v-safe-html="highlightedCode"
      class="code__content"
    /></pre>
  </div>
</template>

<style lang="scss">
.code {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: $space-4 $space-4 $space-4 $space-6;
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
