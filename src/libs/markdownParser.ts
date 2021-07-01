import MarkdownIt from 'markdown-it'
import { RenderRule } from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import * as shiki from 'shiki'

export async function parse(markdown: string) {
  const highlighter = await shiki.getHighlighter({
    theme: 'material-palenight'
  })

  const md: MarkdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code: string, lang: string) => {
      return highlighter.codeToHtml(code, lang)
    }
  })

  const imageRenderer: RenderRule = (tokens: Token[], idx: number) => {
    const token = tokens[idx]
    // @ts-ignore
    const srcIndex = token.attrIndex('src')
    // @ts-ignore
    const src = token.attrs[srcIndex][1]
    // @ts-ignore
    const alt = token.content

    const nextImage2x = `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`
    const nextImage1x = `/_next/image?url=${encodeURIComponent(src)}&w=768&q=75`

    return `
    <div class="markdown-img-wrapper">
      <figure class="markdown-figure">
        <img loading="lazy" src="${nextImage2x}" alt="${alt}" srcSet="${nextImage1x} 1x, ${nextImage2x} 2x" class="markdown-img" />
        <figcaption class="markdown-figcaption">${alt}</figcaption>
      </figure>
    </div>`
  }

  md.renderer.rules.image = imageRenderer
  md.linkify.set({ fuzzyEmail: false })

  return md.render(markdown)
}
