import { Stack, Button, Image, Heading } from '@chakra-ui/react'

export function ErrorDefault({
  title = 'Terjadi kesalahan pada sistem',
  ctaLink = '/',
  ctaText = 'Ke beranda'
}: any) {
  return (
    <Stack as="section" spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
      <Stack align={'center'} spacing={8}>
        <Heading
          fontWeight={700}
          fontSize={{ base: 'xl', md: '2xl' }}
          lineHeight={'110%'}
          textAlign="center"
          as="h3"
        >
          {title}
        </Heading>
        <Image w="100%" src={'/images/illustrations/ill_error_by_manypixels.svg'}></Image>
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
