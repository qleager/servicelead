# useHighlighter composable

useHighlighter is a small wrapper around [`prismjs`](https://prismjs.com/) for syntax highlighting code snippets.
It returns highlighted HTML as a Vue `ComputedRef`, so it can be passed directly to `v-safe-html`.

## Location
- Source: [app/composables/useHighlighter.ts](../../app/composables/useHighlighter.ts)
- UI usage: [app/components/app/Code.vue](../../app/components/app/Code.vue)
- Prism styles: [app/assets/scss/plugins/prism.scss](../../app/assets/scss/plugins/prism.scss)

## Supported languages

```ts
type UseHighlighterLang = 'javascript' | 'markup'
```

Current languages:
- `javascript` - JavaScript snippets
- `markup` - HTML/XML-like markup snippets

`javascript` grammar is imported in the composable. `markup` is available from Prism by default.

## API

### useHighlighter()

Returns an object with:
- `highlight(code, options)` - creates highlighted HTML for a code string

### highlight(code, options)

Arguments:
- `code: string` - source code to highlight
- `options.lang: UseHighlighterLang` - Prism language key

Returns:
- `ComputedRef<string>` - highlighted HTML string with Prism token classes

## Usage example

Use the composable directly when a component needs highlighted HTML:

```vue
<script lang="ts" setup>
const code = `
const greeting = 'Hello'
console.log(greeting)
`

const { highlight } = useHighlighter()
const highlightedCode = highlight(code, { lang: 'javascript' })
</script>

<template>
  <pre><code v-safe-html="highlightedCode" /></pre>
</template>
```

In most UI cases, use `AppCode` instead. It already handles highlighting, title rendering, copy action, and Prism styles:

```vue
<template>
  <AppCode
    :code="code"
    lang="markup"
    title="HTML"
  />
</template>
```

## Adding a language

1. Import the Prism language component in [useHighlighter.ts](../../app/composables/useHighlighter.ts):

```ts
import 'prismjs/components/prism-css'
```

2. Add the language key to `Lang`:

```ts
type Lang = 'javascript' | 'markup' | 'css'
```

3. Add token styles if the new grammar uses token classes that are not covered by [prism.scss](../../app/assets/scss/plugins/prism.scss).

## Notes

- `highlight()` does not sanitize the output. Render it only through the existing safe HTML directive used in the project.
- `highlight()` expects a supported `lang`. Passing a language without a registered Prism grammar can fail at runtime.
- The returned computed value is based on the `code` argument passed to `highlight()`. If the code changes reactively, call `highlight()` from a computed getter or update the caller accordingly.
