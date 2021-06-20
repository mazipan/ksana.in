const MarkdownIt = require('markdown-it')
const shiki = require('shiki')

export async function parse(markdown: string) {
  const highlighter = await shiki.getHighlighter({
    theme: 'material-theme-palenight'
  })

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code: string, lang: string) => {
      return highlighter.codeToHtml(code, lang)
    }
  })

  md.renderer.rules.image = function (tokens: string, idx: number) {
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
    <div class="flex justify-center items-center">
      <figure class="relative">
        <img loading="lazy" src="${nextImage2x}" alt="${alt}" srcSet="${nextImage1x} 1x, ${nextImage2x} 2x" class="rounded-lg mx-auto" />
        <figcaption class="text-sm text-center mt-2">${alt}</figcaption>
      </figure>
    </div>`
  }

  const defaultLinkRenderer =
    md.renderer.rules.link_open ||
    function (
      tokens: any,
      idx: any,
      options: any,
      env: any,
      self: { renderToken: (arg0: any, arg1: any, arg2: any) => any }
    ) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = function (
    tokens: { [x: string]: { attrs: { [x: string]: string[] } } },
    idx: string | number,
    options: any,
    env: any,
    self: any
  ) {
    const token = tokens[idx]
    // @ts-ignore
    const targetIndex = token.attrIndex('target')
    // @ts-ignore
    const hrefIndex = token.attrIndex('href')
    const href = token.attrs[hrefIndex][1]

    if (href.indexOf('https://') >= 0) {
      if (targetIndex < 0) {
        // @ts-ignore
        tokens[idx].attrPush(['target', '_blank']) // add new attribute
      } else {
        tokens[idx].attrs[targetIndex][1] = '_blank' // replace value of existing attr
      }
    }

    // pass token to default renderer.
    return defaultLinkRenderer(tokens, idx, options, env, self)
  }

  md.linkify.set({ fuzzyEmail: false })

  return md.render(markdown)
}
