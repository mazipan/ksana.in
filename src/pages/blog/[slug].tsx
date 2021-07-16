import Head from 'next/head'
import {
  Container,
  VStack,
  Heading,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { HiClock } from 'react-icons/hi'

import { Layout } from 'components/Layout/Layout'
import { MetaHead } from 'components/MetaHead/MetaHead'
import { IPost } from 'interfaces/IPost'
import { makeBreadcrumbBlogSchema } from 'components/StructuredData/Breadcrumb'

import { getPostBySlug, getAllSlugs } from 'libs/blog'

interface IBlogDetail {
  post: IPost
}

export default function BlogDetail({ post }: IBlogDetail) {
  return (
    <Layout>
      <MetaHead title={`${post.title} | Ksana.in`} description={post.excerpt} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(makeBreadcrumbBlogSchema({ title: post.title, slug: post.slug }))
          }}
        ></script>
      </Head>

      <VStack spacing={4} textAlign="center" as="section" mt="32">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/blog/${post.slug}`}>{post.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Container maxW={'4xl'} mx="auto" as="section" mt="8">
          <VStack spacing={4} textAlign="center" className="blog-detail">
            <Heading
              as="h1"
              fontWeight={700}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
              color="orange.400"
            >
              {post.title}
            </Heading>
            <Button leftIcon={<HiClock />} colorScheme="gray" variant="solid" size="xs">
              {post.date}
            </Button>
          </VStack>
        </Container>
      </VStack>

      <Container maxW={'4xl'} mx="auto" as="section" mt="8">
        <div className="markdown">
          <div
            dangerouslySetInnerHTML={{
              __html: `${post.content}`
            }}
          ></div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugParams: string = params ? String(params.slug) : ''
  const post: IPost = await getPostBySlug(slugParams)

  return {
    props: { post },
    revalidate: 3
  }
}

export async function getStaticPaths() {
  const slugs = getAllSlugs()

  const paths = slugs.map((slug) => {
    // eslint-disable-next-line no-unused-vars
    const [_, __, ___, ...slugArr] = slug.replace(/\.md$/, '').split('-')

    return {
      params: { slug: slugArr.join('-') }
    }
  })

  return { paths, fallback: false }
}

// export { getServerSideProps } from "../../Chakra"
