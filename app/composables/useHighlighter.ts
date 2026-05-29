import Prism, { type Grammar } from 'prismjs'
import 'prismjs/components/prism-javascript'

type Lang = 'javascript' | 'markup'

export const useHighlighter = () => {
  const highlight = (code: string, options: { lang: Lang }) => {
    const grammar = Prism.languages[options.lang] as Grammar

    return computed(() => Prism.highlight(code, grammar, options.lang))
  }

  return {
    highlight,
  }
}

export type { Lang as UseHighlighterLang }
