import Image from 'next/image'
import { Stack, Button, Heading } from '@chakra-ui/react'

export interface IErrorNotLoginProps {
  title: string
  ctaLink: string
  ctaText: string
}

export function ErrorNotLogin({ title, ctaLink, ctaText }: IErrorNotLoginProps) {
  return (
    <Stack as="section" spacing={8} mx={'auto'} maxW={'lg'}>
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
          src={'/images/illustrations/ill_protection_by_manypixels.svg'}
          alt="Security Shield"
        />

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

ErrorNotLogin.defaultProps = {
  title: 'Kamu mengakses halaman yang butuh login',
  ctaLink: '/auth/sign-in',
  ctaText: 'Masuk ke akun'
}
