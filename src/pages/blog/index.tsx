import { Container, SimpleGrid, VStack, Heading } from '@chakra-ui/react'

import { Layout } from 'components/Layout/Layout'
import { MetaHead } from 'components/MetaHead/MetaHead'
import { IPost } from 'interfaces/IPost'

import { getPagedPost } from 'libs/blog'
import { BlogCardPost } from 'components/BlogCardPost'

interface IBlogProps {
  data: IPost[]
  pages: number[]
}

export default function BlogIndex({ data }: IBlogProps) {
  return (
    <Layout>
      <MetaHead
        title="Beranda Blog | Ksana.in"
        description="Ksana.in adalah layanan pemendek tautan / URL yang gratis dan mudah untuk digunakan, buatan asli anak Indonesia"
      />

      <VStack spacing={4} textAlign="center" as="section" mt="32">
        <VStack spacing={4} textAlign="center">
          <Heading
            as="h1"
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            color="orange.400"
          >
            Blog Ksana.in
          </Heading>
        </VStack>
      </VStack>

      <Container maxW={'4xl'} mx="auto" as="section" mt="8">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} py={4}>
          {data &&
            data.length > 0 &&
            data.map((post: IPost) => <BlogCardPost key={post.slug} post={post} />)}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const { data, pages } = await getPagedPost(1)

  return {
    props: { data, pages }
  }
}

// export { getServerSideProps } from "../../Chakra"
