import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import { login } from 'constants/paths'
import { useAuthContext } from 'context/Auth'
import { LoadingSpinner } from 'components/Loader/LoadingSpinner'

export function PrivateRoute({ component: Component, redirectPath = login }: any) {
  const router = useRouter()
  const { user, isLoading, isLogin } = useAuthContext()

  if (isLoading) {
    return (
      <Box width={{ base: '100%' }}>
        <Flex justifyContent="center" alignItems="center">
          <LoadingSpinner />
        </Flex>
      </Box>
    )
  }

  if (!isLoading && !isLogin) {
    router.push(redirectPath)
  }

  return <Component user={user} />
}

export default PrivateRoute
