import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import { dashboard } from 'constants/paths'
import { useAuthContext } from 'context/Auth'

import { AuthForm } from 'components/AuthForm'
// import { HiUser } from 'components/HiUser'

import { LoadingSpinner } from 'components/Loader/LoadingSpinner'

export function SignIn() {
  const router = useRouter()
  const { isLoading, isLogin } = useAuthContext()

  if (isLoading) {
    return (
      <Box width={{ base: '100%' }}>
        <Flex justifyContent="center" alignItems="center">
          <LoadingSpinner />
        </Flex>
      </Box>
    )
  }

  // show welcome the use when it's login
  // TODO: or just redirect it to the /dashboard
  if (!isLoading && isLogin) {
    router.push(dashboard)
    // return (<HiUser user={user} />)
  }

  return <AuthForm state="login" />
}

export default SignIn
