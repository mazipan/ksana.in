import { Box, Stack, Button, Image, Heading } from '@chakra-ui/react'

export function ErrorDataNotFound({
  title = 'Data tidak ditemukan',
  useCta,
  ctaAction = () => {},
  ctaText = 'Tambah data baru'
}: any) {
  return (
    <Box width="100%">
      <Stack as="section" mx={'auto'} maxW={'lg'} align={'center'}>
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
          <Image w="100%" src={'/ill_data_by_manypixels.svg'}></Image>
          {useCta && (
            <Button
              px={6}
              size="lg"
              color={'white'}
              bg="orange.400"
              _hover={{
                bg: 'orange.500'
              }}
              onClick={ctaAction}
            >
              {ctaText}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
