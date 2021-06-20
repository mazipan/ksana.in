import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

import { IPost } from '../interfaces/IPost'
import { parse } from './markdownParser'

const PER_PAGE = 10
const postsDirectory = join(process.cwd(), '_posts')

export function getAllSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function findPossibileSlug(slug: string) {
  const allSlugs = getAllSlugs()
  return allSlugs.find((item) => item.includes(slug))
}

export const paginate = (items: any[], currentPage: number) => {
  const page = currentPage || 1
  const offset = page === 1 ? 0 : (page - 1) * PER_PAGE

  const tempItems: any[] = [...items]

  const paginatedItems = tempItems.slice(offset).slice(0, PER_PAGE)
  const totalPages = Math.ceil(items.length / PER_PAGE)

  const pages = []
  for (let index = 1; index <= totalPages; index++) {
    pages.push(index)
  }

  return {
    page,
    pages,
    perPage: PER_PAGE,
    prev: page === 1 ? null : page - 1,
    next: page === totalPages ? null : page + 1,
    total: items.length,
    totalPages: totalPages,
    slugs: paginatedItems
  }
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const possiblitySlug = findPossibileSlug(realSlug)

  const fullPath = join(postsDirectory, `${possiblitySlug}`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content }: matter.GrayMatterFile<string> = matter(fileContents)

  const items: IPost = {
    slug: realSlug,
    content: await parse(content),
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    author: data.author,
    tags: data.tags
  }

  return items
}

export async function getAllPosts() {
  const slugs = getAllSlugs()
  const posts = []
  for (const slug of slugs) {
    // eslint-disable-next-line no-unused-vars
    const [_, __, ___, ...slugArr] = slug.split('-')
    const p = await getPostBySlug(slugArr.join('-'))
    posts.push(p)
  }

  return posts.sort((post1: IPost, post2: IPost) =>
    new Date(post1.date) > new Date(post2.date) ? -1 : 1
  )
}

export async function getPagedPost(page = 1) {
  const slugs = getAllSlugs()
  const postPaginate = paginate(slugs.reverse(), page)

  const posts = []
  for (const slug of postPaginate.slugs) {
    // eslint-disable-next-line no-unused-vars
    const [_, __, ___, ...slugArr] = slug.split('-')
    const p = await getPostBySlug(slugArr.join('-'))
    posts.push(p)
  }

  const sortedPost = posts.sort((post1: IPost, post2: IPost) =>
    new Date(post1.date) > new Date(post2.date) ? -1 : 1
  )

  return {
    ...postPaginate,
    data: sortedPost
  }
}
