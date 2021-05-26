import { Stack, Button, Image, Heading } from '@chakra-ui/react'

export const ErrorDefault = ({
  title = 'Terjadi kesalahan',
  ctaLink = '/',
  ctaText = 'Ke beranda'
}) => {
  return (
    <Stack
      as="section"
      spacing={8}
      mx={'auto'}
      mt="20"
      maxW={'lg'}
      py={12}
      px={6}
    >
      <Stack align={'center'} spacing={8}>
        <Heading
          fontWeight={700}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          textAlign="center"
        >
          {title}
        </Heading>
        <Image w="100%" src={'/ill_error_by_manypixels.svg'}></Image>
        <Button
          px={6}
          size="lg"
          color={'white'}
          bg="orange.400"
          _hover={{
            bg: 'orange.500'
          }}
          as={'a'}
          href={ctaLink}
        >
          {ctaText}
        </Button>
      </Stack>
    </Stack>
  )
}
