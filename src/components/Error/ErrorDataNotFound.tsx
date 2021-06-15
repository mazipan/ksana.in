import Image from 'next/image'
import { MouseEvent } from 'react'
import { Box, Stack, Button, Heading } from '@chakra-ui/react'

export interface IErrorDataNotFoundProps {
  title: string
  useCta: boolean
  ctaAction: (event: MouseEvent<HTMLButtonElement>) => void
  ctaText: string
}

export function ErrorDataNotFound({ title, useCta, ctaAction, ctaText }: IErrorDataNotFoundProps) {
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
          <Image
            width={400}
            height={400}
            src={'/images/illustrations/ill_data_by_manypixels.svg'}
            alt="man with Data"
          />

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

ErrorDataNotFound.defaultProps = {
  title: 'Belum ada data nih, yuk buat baru!',
  useCta: true,
  ctaAction: () => {},
  ctaText: 'Tambah data baru'
}
