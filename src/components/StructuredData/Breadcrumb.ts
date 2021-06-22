import { HOME } from 'constants/paths'

interface BlogBreadcrumbSchema {
  title: string
  slug: string
}

export function makeBreadcrumbBlogSchema({ title, slug }: BlogBreadcrumbSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${HOME}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${HOME}blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${title}`,
        item: `${HOME}blog/${slug}`
      }
    ]
  }
}
