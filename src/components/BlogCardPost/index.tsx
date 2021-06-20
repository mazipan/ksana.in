import { Box, Text, Heading, Button } from '@chakra-ui/react'

import { HiClock } from 'react-icons/hi'

import { IPost } from 'interfaces/IPost'

interface IBlogCardProps {
  post: IPost
}

export function BlogCardPost({ post }: IBlogCardProps) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="4" as="a" display="block" href={`/blog/${post.slug}`}>
        <Heading as="h4" mb="2" size="md">
          {post.title}
        </Heading>
        <Button leftIcon={<HiClock />} colorScheme="gray" variant="solid" size="xs">
          {post.date}
        </Button>
        <Text mt="4">{post.excerpt}</Text>
      </Box>
    </Box>
  )
}
